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

let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authStore = inject(AuthStore);
  

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  const token = authStore.accessToken();
  if (!isAuthRoute(req.url) && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const reqWithHeaders = req.clone({
    setHeaders: headers,
  });

  return next(reqWithHeaders).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handle401Error(req, next, authStore);
      }

      return throwError(() => error);
    })
  );
};

function isAuthRoute(url: string): boolean {
  return (
    url.includes('/auth/login') ||
    url.includes('/auth/register') ||
    url.includes('/auth/refresh')
  );
}

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authStore: any
): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    const refreshToken = authStore.refreshToken();

    if (!refreshToken) {
      isRefreshing = false;
      authStore.logout();
      return throwError(
        () => new Error('No hay token de actualización disponible')
      );
    }

    return from(authStore.refreshTokens()).pipe(
      switchMap((response: any) => {
        isRefreshing = false;
        refreshTokenSubject.next(response.access_token);

        const reqWithNewToken = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        return next(reqWithNewToken);
      }),
      catchError((error: any) => {
        isRefreshing = false;
        refreshTokenSubject.next(null);

        authStore.logout();
        return throwError(() => error);
      })
    );
  } else {
    // Ya se está renovando el token, esperar a que termine
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => {
        const reqWithToken = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        return next(reqWithToken);
      })
    );
  }
}
