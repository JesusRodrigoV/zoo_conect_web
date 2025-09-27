import { computed } from '@angular/core';
import {
  signalStore,
  withComputed,
  withMethods,
  withState,
  patchState,
} from '@ngrx/signals';
import { AuthService } from './features/auth/services/auth';
import {
  LoginCredentials,
  AuthState,
  User,
} from '@app/features/auth/models/user.model';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserService } from './pages/profile/services/user.service';

function getInitialState(): AuthState {
  const accessToken = localStorage.getItem('accessToken');
  let user: User | null = null;

  if (accessToken) {
    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      if (
        typeof payload.id_usuario === 'number' &&
        typeof payload.email === 'string' &&
        typeof payload.id_rol === 'number' &&
        typeof payload.nombre === 'string'
      ) {
        user = {
          id_usuario: payload.id_usuario,
          email: payload.email,
          role: payload.id_rol,
          id_rol: payload.id_rol,
          nombre: payload.nombre,
          biografia: payload.biografia || '',
          two_factor_enabled: payload.two_factor_enabled ?? false,
          profile_image: payload.profile_image || null,
        };
      } else {
        throw new Error('Payload de token incompleto');
      }
    } catch (e) {
      console.warn('Error decoding token:', e);
      localStorage.removeItem('accessToken');
    }
  }

  return {
    user,
    accessToken,
    loading: false,
    error: null,
    requires2FA: false,
    requiresSetup: false,
    tempToken: null,
    setupData: null,
  };
}

const initialState: AuthState = getInitialState();

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ user }) => ({
    isAuthenticated: computed(() => !!user()),
    userRole: computed(() => user()?.role),
    user: computed(() => user()),
  })),
  withMethods(
    (
      { ...store },
      authService = inject(AuthService),
      userService = inject(UserService),
      router = inject(Router),
    ) => {
      return {
        async loadUserProfile() {
          if (!store.accessToken()) return;

          try {
            const response = await firstValueFrom(authService.getUserProfile());
            patchState(store, { user: response });
          } catch (error: any) {
            console.error('Error loading user profile:', error);
            await this.logout();
          }
        },

        async login(credentials: LoginCredentials) {
          patchState(store, {
            loading: true,
            error: null,
            accessToken: null,
            user: null,
            requires2FA: false,
            requiresSetup: false,
            tempToken: null,
            setupData: null,
          });

          try {
            const response = await firstValueFrom(
              authService.login(credentials),
            );

            if ('requires2FA' in response) {
              if (!response.tempToken) {
                throw new Error('No se recibió el token temporal para 2FA');
              }
              patchState(store, {
                requires2FA: true,
                tempToken: response.tempToken,
                loading: false,
              });
              await router.navigate(['/2fa-verify']);
              return;
            }

            if ('requiresSetup' in response) {
              if (!response.tempToken || !response.setupData) {
                throw new Error('Datos incompletos para configuración 2FA');
              }
              patchState(store, {
                requiresSetup: true,
                tempToken: response.tempToken,
                setupData: response.setupData,
                loading: false,
              });
              await router.navigate(['/2fa-setup']);
              return;
            }

            if ('accessToken' in response) {
              localStorage.setItem('accessToken', response.accessToken);
              patchState(store, {
                user: response.user,
                accessToken: response.accessToken,
                loading: false,
              });
              await router.navigate(['/home']);
            }
          } catch (error: any) {
            console.error('Login error:', error);
            let errorMessage = 'Error en el inicio de sesión';
            if (error.message.includes('NetworkError')) {
              errorMessage =
                'No se pudo conectar con el servidor. Verifica tu conexión o la disponibilidad del servidor.';
            } else if (error.message === 'Credenciales inválidas') {
              errorMessage = 'Correo o contraseña incorrectos.';
            }
            patchState(store, {
              error: errorMessage,
              loading: false,
              accessToken: null,
              user: null,
              requires2FA: false,
              requiresSetup: false,
              tempToken: null,
              setupData: null,
            });
            localStorage.removeItem('accessToken');
          }
        },

        async verify2FA(token: string) {
          const currentTempToken = store.tempToken();
          if (!currentTempToken) {
            patchState(store, {
              error:
                'No hay token temporal disponible para la verificación 2FA',
              loading: false,
            });
            return;
          }

          patchState(store, { loading: true, error: null });

          try {
            const response = await firstValueFrom(
              authService.verify2FA(token, currentTempToken),
            );

            localStorage.setItem('accessToken', response.accessToken);
            patchState(store, {
              user: response.user,
              accessToken: response.accessToken,
              requires2FA: false,
              tempToken: null,
              loading: false,
            });
            await router.navigate(['/home']);
          } catch (error: any) {
            console.error('Error en verificación 2FA:', error);
            patchState(store, {
              error: error.message || 'Error en verificación 2FA',
              loading: false,
            });
          }
        },

        async setup2FA(token: string) {
          const currentTempToken = store.tempToken();
          console.log('Using tempToken in setup2FA:', currentTempToken);
          if (!currentTempToken) {
            patchState(store, {
              error:
                'No hay token temporal disponible para la configuración 2FA',
              loading: false,
            });
            return;
          }

          patchState(store, { loading: true, error: null });

          try {
            const response = await firstValueFrom(
              authService.verify2FA(token, currentTempToken),
            );

            localStorage.setItem('accessToken', response.accessToken);
            patchState(store, {
              user: response.user,
              accessToken: response.accessToken,
              requiresSetup: false,
              tempToken: null,
              setupData: null,
              loading: false,
            });
            await router.navigate(['/home']);
          } catch (error: any) {
            console.error('Error en configuración 2FA:', error);
            patchState(store, {
              error: error.message || 'Error en configuración 2FA',
              loading: false,
            });
          }
        },

        async initiate2FASetup() {
          patchState(store, { loading: true, error: null });

          try {
            const response = await firstValueFrom(userService.setup2FA());
            console.log('Initiate2FASetup response:', response);
            patchState(store, {
              requiresSetup: true,
              tempToken: response.tempToken,
              setupData: response.setupData,
              loading: false,
            });
            await router.navigate(['/2fa-setup']);
          } catch (error: any) {
            console.error('Error iniciando configuración 2FA:', error);
            patchState(store, {
              error: error.message || 'Error al iniciar configuración 2FA',
              loading: false,
            });
            throw error;
          }
        },

        async logout() {
          patchState(store, { loading: true, error: null });

          try {
            await firstValueFrom(authService.logout());
          } catch (error: any) {
            console.warn('Error en logout del servidor:', error);
          } finally {
            localStorage.removeItem('accessToken');
            patchState(store, {
              user: null,
              accessToken: null,
              loading: false,
              error: null,
              requires2FA: false,
              requiresSetup: false,
              tempToken: null,
              setupData: null,
            });
            await router.navigate(['/login']);
          }
        },

        async refreshToken() {
          try {
            const response = await firstValueFrom(authService.refreshToken());
            localStorage.setItem('accessToken', response.accessToken);
            patchState(store, {
              accessToken: response.accessToken,
            });
            return response;
          } catch (error: any) {
            console.error('Error refreshing token:', error);
            await this.logout();
            throw error;
          }
        },
      };
    },
  ),
);
