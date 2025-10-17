import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthStore } from '../store/auth.store';
import { inject } from '@angular/core';
import {
  Observable,
  throwError,
  BehaviorSubject,
  filter,
  take,
  switchMap,
  catchError,
  from,
} from 'rxjs';

// ✅ Variables globales para manejar el refresh de tokens
let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

// ✅ Resetear el estado del refresh
function resetRefreshState(): void {
  isRefreshing = false;
  refreshTokenSubject.next(null);
}

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authStore = inject(AuthStore);

  if (isAuthRoute(req.url)) {
    return next(req.clone({
      setHeaders: { 'Content-Type': 'application/json' }
    }));
  }

  const token = authStore.accessToken();
  
  if (!token) {
    authStore.logout();
    return throwError(() => new Error('No authentication token'));
  }

  if (authStore.isTokenExpired()) {
    return handle401Error(req, next, authStore);
  }

  const reqWithAuth = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return next(reqWithAuth).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handle401Error(req, next, authStore);
      }
      
      if (error.status === 403) {
        return throwError(() => new Error('Permisos insuficientes para esta operación'));
      }

      return throwError(() => error);
    })
  );
};

function isAuthRoute(url: string): boolean {
  const authPaths = [
    '/auth/login',
    '/auth/register', 
    '/auth/refresh',
  ];
  
  return authPaths.some(path => url.includes(path));
}

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authStore: any
): Observable<HttpEvent<any>> {
  if (isRefreshing) {
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => {
        if (token) {
          const reqWithToken = request.clone({
            setHeaders: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          return next(reqWithToken);
        } else {
          return throwError(() => new Error('Token refresh failed'));
        }
      })
    );
  }

  isRefreshing = true;
  refreshTokenSubject.next(null);

  const refreshToken = authStore.refreshToken();

  if (!refreshToken) {
    resetRefreshState();
    authStore.logout();
    return throwError(() => new Error('No refresh token available'));
  }

  return from(authStore.refreshTokens()).pipe(
    switchMap((response: any) => {
      const newAccessToken = response.access_token;
      
      refreshTokenSubject.next(newAccessToken);
      resetRefreshState();

      const reqWithNewToken = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
      
      return next(reqWithNewToken);
    }),
    catchError((error: any) => {
      resetRefreshState();
      
      if (error.status === 401 || error.status === 403) {
        authStore.logout();
      }
      
      return throwError(() => error);
    })
  );
}
