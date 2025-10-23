import { computed, inject, PLATFORM_ID } from '@angular/core';
import {
  signalStore,
  withComputed,
  withMethods,
  withState,
  patchState,
} from '@ngrx/signals';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '@models/usuario/usuario.model';
import { Auth } from '@app/features/auth/services';
import { LoginResponse } from '@models/usuario/request_response.model';
import { isPlatformBrowser } from '@angular/common';
import { ShowToast } from '@app/shared/services';

interface AuthState {
  usuario: Usuario | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

function getInitialState(): AuthState {
  return {
    usuario: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  };
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(getInitialState()),
  withComputed(({ usuario, accessToken }) => ({
    isAuthenticated: computed(() => !!usuario() && !!accessToken()),
    userRole: computed(() => usuario()?.rol),
    isAdmin: computed(() => usuario()?.rol.nombre === 'Administrador'),
    isVeterinario: computed(() => usuario()?.rol.nombre === 'Veterinario'),
    isCuidador: computed(() => usuario()?.rol.nombre === 'Cuidador'),
    isVisitante: computed(() => usuario()?.rol.nombre === 'Visitante'), 
  })),
  withMethods((
    store,
    authService = inject(Auth),
    router = inject(Router),
    platformId = inject(PLATFORM_ID),
    toastService = inject(ShowToast)
  ) => {
    
    const setTokenInStorage = (key: string, value: string): void => {
      if (isPlatformBrowser(platformId)) {
        localStorage.setItem(key, value);
      }
    };

    const getTokenFromStorage = (key: string): string | null => {
      if (isPlatformBrowser(platformId)) {
        return localStorage.getItem(key);
      }
      return null;
    };

    const removeTokenFromStorage = (key: string): void => {
      if (isPlatformBrowser(platformId)) {
        localStorage.removeItem(key);
      }
    };

    const clearTokens = () => {
      removeTokenFromStorage('access_token');
      removeTokenFromStorage('refresh_token');
    };

    const isTokenValid = (token: string): boolean => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        const now = Date.now();
        const buffer = 5 * 60 * 1000;
        return exp > (now + buffer);
      } catch (error) {
        return false;
      }
    };

    const methods = {
    
    async login(email: string, password: string) {
      patchState(store, { 
        loading: true, 
        error: null 
      });

      try {
        const loginResponse: LoginResponse = await firstValueFrom(
          authService.login(email, password)
        );

        setTokenInStorage('access_token', loginResponse.access_token);
        setTokenInStorage('refresh_token', loginResponse.refresh_token);

        patchState(store, {
          accessToken: loginResponse.access_token,
          refreshToken: loginResponse.refresh_token,
          loading: false,
          error: null,
        });

        const usuario = await firstValueFrom(authService.getProfile());

        patchState(store, {
          usuario,
        });

        toastService.showSuccess("Inicio de sesión exitoso", "Éxito");
        await router.navigate(['/inicio']);
        
      } catch (error: any) {
        console.error('Error de inicio de sesión:', error);
        let errorMessage = 'Error en el inicio de sesión';
        
        if (error.status === 401) {
          errorMessage = 'Email o contraseña incorrectos';
        } else if (error.status === 400) {
          errorMessage = 'Usuario inactivo. Contacte al administrador';
        } else if (error.message?.includes('NetworkError')) {
          errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión a internet';
        } else if (error.status === 0) {
          errorMessage = 'No se puede conectar al servidor. Intente más tarde';
        }

        patchState(store, {
          error: errorMessage,
          loading: false,
          usuario: null,
          accessToken: null,
          refreshToken: null,
        });

        toastService.showError("Error", errorMessage);

        clearTokens();
      }
    },

    async register(email: string, username: string, password: string) {
      patchState(store, { 
        loading: true, 
        error: null 
      });

      try {
        const usuario = await firstValueFrom(
          authService.register(email, username, password)
        );

        patchState(store, {
          loading: false,
          error: null,
        });
        toastService.showSuccess("Registro exitoso. Por favor, inicie sesión.", "Éxito");
        await router.navigate(['/login']);
        
        return usuario;
        
      } catch (error: any) {
        console.error('Error de registro:', error);
        let errorMessage = 'Error en el registro de usuario';
        
        if (error.status === 400) {
          if (error.error?.message?.includes('email')) {
            errorMessage = 'Este email ya está registrado. Intente con otro email';
          } else {
            errorMessage = 'Datos de registro inválidos. Verifique la información ingresada';
          }
        } else if (error.status === 422) {
          errorMessage = 'Formato de email inválido o contraseña muy débil';
        } else if (error.status === 0) {
          errorMessage = 'No se puede conectar al servidor. Intente más tarde';
        }

        patchState(store, {
          error: errorMessage,
          loading: false,
        });

        toastService.showError("Error", errorMessage);

        throw error;
      }
    },

    async logout() {
      patchState(store, { loading: true, error: null });

      try {
        const refreshToken = store.refreshToken();
        if (refreshToken) {
          await firstValueFrom(authService.logout(refreshToken));
        }
      } catch (error: any) {
        console.warn('Error al cerrar sesión en el servidor:', error);
        toastService.showError("Error al cerrar sesión en el servidor", "Error");
      } finally {
        clearTokens();
        patchState(store, {
          usuario: null,
          accessToken: null,
          refreshToken: null,
          loading: false,
          error: null,
        });
        toastService.showSuccess("Sesión cerrada exitosamente", "Éxito");
        await router.navigate(['/login']);
      }
    },

    async loadUserProfile() {
      const currentToken = store.accessToken();
      if (!currentToken) {
        return;
      }

      try {
        patchState(store, { loading: true, error: null });
        const usuario = await firstValueFrom(authService.getProfile());
        patchState(store, { 
          usuario,
          loading: false,
          error: null 
        });
      } catch (error: any) {
        patchState(store, { loading: false });
        
        if (error.status === 401 || error.status === 403) {
          await methods.logout();
        } else {
          patchState(store, { error: 'Error al cargar perfil' });
        }
      }
    },

    async refreshTokens() {
      const currentRefreshToken = store.refreshToken();
      if (!currentRefreshToken) {
        await methods.logout();
        throw new Error('No refresh token available');
      }

      try {
        const response: LoginResponse = await firstValueFrom(
          authService.refreshToken(currentRefreshToken)
        );

        setTokenInStorage('access_token', response.access_token);
        setTokenInStorage('refresh_token', response.refresh_token);

        patchState(store, {
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          error: null
        });

        return response;
      } catch (error: any) {
        if (error.status === 401 || error.status === 403) {
          await methods.logout();
        }
        
        throw error;
      }
    },

    clearError() {
      patchState(store, { error: null });
    },

    async initializeAuth() {
      try {
        const accessToken = getTokenFromStorage('access_token');
        const refreshToken = getTokenFromStorage('refresh_token');
        
        if (accessToken && refreshToken) {
          patchState(store, { 
            accessToken, 
            refreshToken 
          });
          
          if (isTokenValid(accessToken)) {
            await methods.loadUserProfile();
          } else {
            try {
              await methods.refreshTokens();
              await methods.loadUserProfile();
            } catch (refreshError) {
              clearTokens();
              patchState(store, getInitialState());
            }
          }
        } else {
          patchState(store, getInitialState());
        }
      } catch (error) {
        clearTokens();
        patchState(store, getInitialState());
      }
    },

    isTokenExpired(): boolean {
      const token = store.accessToken();
      if (!token) {
        return true;
      }
      
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        const now = Date.now();
        const buffer = 2 * 60 * 1000;
        
        return exp <= (now + buffer);
      } catch (error) {
        return true;
      }
    },
    };

    return methods;
  }),
);