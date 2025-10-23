import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { 
  UsuarioAdapter, 
  UsuarioBackendResponse, 
} from '@app/core/adapters/usuario';
import { Usuario } from '@app/core/models/usuario';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class AdminUsuarios {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private usuariosUrl = `${this.apiUrl}/admin_users/users`;

  /**
   * Obtiene todos los usuarios con paginación
   */
  getAllUsers(skip: number = 0, limit: number = 100): Observable<Usuario[]> {
    return this.http.get<UsuarioBackendResponse[]>(this.usuariosUrl, { 
      params: { skip: skip.toString(), limit: limit.toString() } 
    }).pipe(
      map(response => UsuarioAdapter.toFrontendList(response)),
      catchError(error => {
        console.error('Error al obtener usuarios:', error);
        return throwError(() => new Error('Error al obtener los usuarios'));
      })
    );
  }

  /**
   * Obtiene un usuario por su ID
   */
  getUserById(id: number): Observable<Usuario> {
    return this.http.get<UsuarioBackendResponse>(`${this.usuariosUrl}/${id}`).pipe(
      map(response => UsuarioAdapter.toFrontend(response)),
      catchError(error => {
        return throwError(() => new Error('Error al obtener el usuario'));
      })
    );
  }

  /**
   * Crea un nuevo usuario
   */
  createUser(userData: Omit<Usuario, 'id' | 'creadoEn'> & { password: string }): Observable<Usuario> {
    try {
      const backendRequest = UsuarioAdapter.toCreateRequest(userData);
      
      return this.http.post<UsuarioBackendResponse>(this.usuariosUrl, backendRequest).pipe(
        map(response => UsuarioAdapter.toFrontend(response)),
        catchError(error => {
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
  updateUser(id: number, userData: Partial<Omit<Usuario, 'id' | 'creadoEn'>> & { password?: string }): Observable<Usuario> {
    try {
      const backendRequest = UsuarioAdapter.toUpdateRequest(userData);
      
      return this.http.put<UsuarioBackendResponse>(`${this.usuariosUrl}/${id}`, backendRequest).pipe(
        map(response => UsuarioAdapter.toFrontend(response)),
        catchError(error => {
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
    return this.http.delete<UsuarioBackendResponse>(`${this.usuariosUrl}/${id}`).pipe(
      map(response => UsuarioAdapter.toFrontend(response)),
      catchError(error => {
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
   * Busca usuarios por email o username (filtro en frontend)
   */
  searchUsers(searchTerm: string): Observable<Usuario[]> {
    return this.getAllUsers(0, 100).pipe(
      map(usuarios => usuarios.filter(usuario => 
        usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.username.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  }

  /**
   * Obtiene usuarios por rol
   */
  getUsersByRole(roleId: number): Observable<Usuario[]> {
    return this.getAllUsers(0, 100).pipe(
      map(usuarios => usuarios.filter(usuario => usuario.rol.id === roleId))
    );
  }

  /**
   * Obtiene solo usuarios activos
   */
  getActiveUsers(): Observable<Usuario[]> {
    return this.getAllUsers(0, 100).pipe(
      map(usuarios => usuarios.filter(usuario => usuario.activo))
    );
  }

  /**
   * Obtiene solo usuarios inactivos
   */
  getInactiveUsers(): Observable<Usuario[]> {
    return this.getAllUsers(0, 100).pipe(
      map(usuarios => usuarios.filter(usuario => !usuario.activo))
    );
  }

  /**
   * Valida si los datos del usuario son correctos antes de enviar
   */
  validateUserData(userData: Partial<Usuario & { password?: string }>): boolean {
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
