import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import {
  UsuarioAdapter,
  UsuarioBackendResponse,
} from '@app/core/adapters/usuario';
import { Usuario } from '@app/core/models/usuario';
import { environment } from '@env';
import { PaginatedResponse } from '@models/common';

@Injectable({
  providedIn: 'root',
})
export class AdminUsuarios {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private usuariosUrl = `${this.apiUrl}/admin_users/users`;

  /**
   * Obtiene todos los usuarios con paginación
   */
  getAllUsers(
    page: number = 1,
    size: number = 10
  ): Observable<PaginatedResponse<Usuario>> {
    const validPage = Number.isFinite(page) && page > 0 ? page : 1;
    const validSize = Number.isFinite(size) && size > 0 ? size : 10;

    const params = new HttpParams()
      .set('page', validPage.toString())
      .set('size', validSize.toString());

    return this.http
      .get<PaginatedResponse<UsuarioBackendResponse>>(this.usuariosUrl, {
        params,
      })
      .pipe(
        map((response) => ({
          ...response,
          items: response.items.map((user) => UsuarioAdapter.toFrontend(user)),
        })),
        catchError((error) => {
          console.error('Error fetching users:', error);
          throw error;
        })
      );
  }

  /**
   * Obtiene un usuario por su ID
   */
  getUserById(id: number): Observable<Usuario> {
    return this.http
      .get<UsuarioBackendResponse>(`${this.usuariosUrl}/${id}`)
      .pipe(
        map((response) => UsuarioAdapter.toFrontend(response)),
        catchError((error) => {
          return throwError(() => new Error('Error al obtener el usuario'));
        })
      );
  }

  /**
   * Crea un nuevo usuario
   */
  createUser(
    userData: Omit<Usuario, 'id' | 'creadoEn' | 'activo'> & { password: string }
  ): Observable<Usuario> {
    try {
      const backendRequest = UsuarioAdapter.toCreateRequest(userData);

      return this.http
        .post<UsuarioBackendResponse>(this.usuariosUrl, backendRequest)
        .pipe(
          map((response) => UsuarioAdapter.toFrontend(response)),
          catchError((error) => {
            let errorMessage = 'Error al crear el usuario';
            if (error.status === 400) {
              errorMessage = 'El email ya está registrado';
            } else if (error.status === 422) {
              errorMessage = 'Los datos enviados no son válidos';
            }

            return throwError(() => new Error(errorMessage));
          })
        );
    } catch (validationError: any) {
      return throwError(() => new Error(validationError.message));
    }
  }

  /**
   * Actualiza un usuario existente
   */
  updateUser(
    id: number,
    userData: Partial<Omit<Usuario, 'id' | 'creadoEn'>> & { password?: string }
  ): Observable<Usuario> {
    try {
      const backendRequest = UsuarioAdapter.toUpdateRequest(userData);

      return this.http
        .put<UsuarioBackendResponse>(
          `${this.usuariosUrl}/${id}`,
          backendRequest
        )
        .pipe(
          map((response) => UsuarioAdapter.toFrontend(response)),
          catchError((error) => {
            let errorMessage = 'Error al actualizar el usuario';
            if (error.status === 404) {
              errorMessage = 'Usuario no encontrado';
            } else if (error.status === 400) {
              errorMessage = 'El email ya está registrado por otro usuario';
            }

            return throwError(() => new Error(errorMessage));
          })
        );
    } catch (validationError: any) {
      return throwError(() => new Error(validationError.message));
    }
  }

  /**
   * Elimina un usuario
   */
  deleteUser(id: number): Observable<Usuario> {
    return this.http
      .delete<UsuarioBackendResponse>(`${this.usuariosUrl}/${id}`)
      .pipe(
        map((response) => UsuarioAdapter.toFrontend(response)),
        catchError((error) => {
          let errorMessage = 'Error al eliminar el usuario';
          if (error.status === 404) {
            errorMessage = 'Usuario no encontrado';
          }

          return throwError(() => new Error(errorMessage));
        })
      );
  }

  /**
   * Activa o desactiva un usuario
   */
  toggleUserStatus(id: number, activo: boolean): Observable<Usuario> {
    return this.updateUser(id, { activo });
  }

  /**
   * Cambia el rol de un usuario
   */
  changeUserRole(id: number, rol: Usuario['rol']): Observable<Usuario> {
    return this.updateUser(id, { rol });
  }

  /**
   * Busca usuarios por email o username
   */
  searchUsers(
    searchTerm: string,
    page: number = 1,
    size: number = 10
  ): Observable<PaginatedResponse<Usuario>> {
    return this.http
      .get<PaginatedResponse<UsuarioBackendResponse>>(this.usuariosUrl, {
        params: {
          page: page.toString(),
          size: size.toString(),
          search: searchTerm,
        },
      })
      .pipe(
        map((response) => ({
          ...response,
          items: response.items.map((user) => UsuarioAdapter.toFrontend(user)),
        }))
      );
  }

  /**
   * Obtiene usuarios por rol
   */
  getUsersByRole(
    roleId: number,
    page: number = 1,
    size: number = 10
  ): Observable<PaginatedResponse<Usuario>> {
    return this.http
      .get<PaginatedResponse<UsuarioBackendResponse>>(this.usuariosUrl, {
        params: {
          page: page.toString(),
          size: size.toString(),
          roleId: roleId.toString(),
        },
      })
      .pipe(
        map((response) => ({
          ...response,
          items: response.items.map((user) => UsuarioAdapter.toFrontend(user)),
        }))
      );
  }

  /**
   * Obtiene solo usuarios activos
   */
  getActiveUsers(
    page: number = 1,
    size: number = 10
  ): Observable<PaginatedResponse<Usuario>> {
    return this.http
      .get<PaginatedResponse<UsuarioBackendResponse>>(this.usuariosUrl, {
        params: {
          page: page.toString(),
          size: size.toString(),
          active: 'true',
        },
      })
      .pipe(
        map((response) => ({
          ...response,
          items: response.items.map((user) => UsuarioAdapter.toFrontend(user)),
        }))
      );
  }

  /**
   * Obtiene solo usuarios inactivos
   */
  getInactiveUsers(
    page: number = 1,
    size: number = 10
  ): Observable<PaginatedResponse<Usuario>> {
    return this.http
      .get<PaginatedResponse<UsuarioBackendResponse>>(this.usuariosUrl, {
        params: {
          page: page.toString(),
          size: size.toString(),
          active: 'false',
        },
      })
      .pipe(
        map((response) => ({
          ...response,
          items: response.items.map((user) => UsuarioAdapter.toFrontend(user)),
        }))
      );
  }

  /**
   * Valida si los datos del usuario son correctos antes de enviar
   */
  validateUserData(
    userData: Partial<Usuario & { password?: string }>
  ): boolean {
    if (userData.email && userData.email.trim().length < 3) {
      throw new Error('El email debe tener al menos 3 caracteres');
    }

    if (userData.username && userData.username.trim().length < 2) {
      throw new Error('El nombre de usuario debe tener al menos 2 caracteres');
    }

    if (userData.password && userData.password.trim().length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    return true;
  }
}
