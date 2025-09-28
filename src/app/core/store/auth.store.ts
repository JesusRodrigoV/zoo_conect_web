import { computed, inject } from '@angular/core';
import {
  signalStore,
  withComputed,
  withMethods,
  withState,
  patchState,
} from '@ngrx/signals';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '@app/features/auth/models/usuario.model';
import { Auth } from '@app/features/auth/services';
import { LoginResponse } from '@app/features/auth/models/request_response.model';

interface AuthState {
  usuario: Usuario | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

function getInitialState(): AuthState {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  
  return {
    usuario: null,
    accessToken,
    refreshToken,
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
    router = inject(Router)
  ) => ({
    
    async login(email: string, password: string) {
      patchState(store, { 
        loading: true, 
        error: null 
      });

      try {
        const loginResponse: LoginResponse = await firstValueFrom(
          authService.login(email, password)
        );

        localStorage.setItem('access_token', loginResponse.access_token);
        localStorage.setItem('refresh_token', loginResponse.refresh_token);

        const usuario = await firstValueFrom(authService.getProfile());

        patchState(store, {
          usuario,
          accessToken: loginResponse.access_token,
          refreshToken: loginResponse.refresh_token,
          loading: false,
          error: null,
        });

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

        this.clearTokens();
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
      } finally {
        this.clearTokens();
        patchState(store, {
          usuario: null,
          accessToken: null,
          refreshToken: null,
          loading: false,
          error: null,
        });
        await router.navigate(['/login']);
      }
    },

    async loadUserProfile() {
      if (!store.accessToken()) return;

      try {
        patchState(store, { loading: true });
        const usuario = await firstValueFrom(authService.getProfile());
        patchState(store, { 
          usuario,
          loading: false,
          error: null 
        });
      } catch (error: any) {
        console.error('Error al cargar perfil de usuario:', error);
        patchState(store, { loading: false });
        await this.logout();
      }
    },

    async refreshTokens() {
      const refreshToken = store.refreshToken();
      if (!refreshToken) {
        await this.logout();
        return;
      }

      try {
        const response: LoginResponse = await firstValueFrom(
          authService.refreshToken(refreshToken)
        );

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        patchState(store, {
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
        });

        return response;
      } catch (error: any) {
        console.error('Error al renovar token de acceso:', error);
        await this.logout();
        throw error;
      }
    },

    clearError() {
      patchState(store, { error: null });
    },

    clearTokens() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },

    async initializeAuth() {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (accessToken && refreshToken) {
        patchState(store, { 
          accessToken, 
          refreshToken 
        });
        await this.loadUserProfile();
      }
    },
  }))
);