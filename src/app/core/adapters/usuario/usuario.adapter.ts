import { Usuario, Rol, RolId } from '../../models/usuario/usuario.model';

/**
 * Estructura de datos del usuario tal como viene del backend
 */
export interface UsuarioBackendResponse {
  id: number;
  email: string;
  username: string;
  photo_url: string | null;
  is_active: boolean;
  role_id: number;
  created_at: string;
}

/**
 * Estructura para crear un usuario (envío al backend)
 */
export interface CreateUsuarioRequest {
  email: string;
  username: string;
  password: string;
  role_id: number;
  is_active: boolean;
}

/**
 * Estructura para actualizar un usuario (envío al backend)
 */
export interface UpdateUsuarioRequest {
  email?: string;
  username?: string;
  password?: string;
  role_id?: number;
  is_active?: boolean;
}

/**
 * Adapter para transformar los datos de usuario entre backend y frontend
 */
export class UsuarioAdapter {
  
  /**
   * Mapea los IDs de rol a nombres
   */
  private static getRoleNameById(roleId: number): string {
    const roleNames: { [key: number]: string } = {
      1: 'Administrador',
      2: 'Visitante', 
      3: 'Cuidador',
      4: 'Veterinario'
    };
    return roleNames[roleId] || 'Desconocido';
  }

  /**
   * Convierte la respuesta del backend al modelo del frontend
   */
  static toFrontend(backendUser: UsuarioBackendResponse): Usuario {
    return {
      id: backendUser.id.toString(),
      email: backendUser.email,
      username: backendUser.username,
      fotoUrl: backendUser.photo_url || '',
      activo: backendUser.is_active,
      rol: {
        id: backendUser.role_id as RolId,
        nombre: this.getRoleNameById(backendUser.role_id)
      },
      creadoEn: backendUser.created_at
    };
  }

  /**
   * Convierte una lista de usuarios del backend al frontend
   */
  static toFrontendList(backendUsers: UsuarioBackendResponse[]): Usuario[] {
    return backendUsers.map(user => this.toFrontend(user));
  }

  /**
   * Convierte los datos del frontend para crear un nuevo usuario
   */
  static toCreateRequest(frontendUser: Omit<Usuario, 'id' | 'creadoEn'> & { password: string }): CreateUsuarioRequest {
    if (!frontendUser.email || frontendUser.email.trim().length < 3) {
      throw new Error('El email es requerido y debe tener al menos 3 caracteres');
    }
    
    if (!frontendUser.username || frontendUser.username.trim().length < 2) {
      throw new Error('El nombre de usuario es requerido y debe tener al menos 2 caracteres');
    }
    
    if (!frontendUser.password || frontendUser.password.trim().length < 6) {
      throw new Error('La contraseña es requerida y debe tener al menos 6 caracteres');
    }

    return {
      email: frontendUser.email.trim(),
      username: frontendUser.username.trim(),
      password: frontendUser.password.trim(),
      role_id: frontendUser.rol.id,
      is_active: frontendUser.activo
    };
  }

  /**
   * Convierte los datos del frontend para actualizar un usuario
   */
  static toUpdateRequest(frontendUser: Partial<Omit<Usuario, 'id' | 'creadoEn'>> & { password?: string }): UpdateUsuarioRequest {
    const request: UpdateUsuarioRequest = {};
    
    if (frontendUser.email !== undefined) {
      if (frontendUser.email.trim().length < 3) {
        throw new Error('El email debe tener al menos 3 caracteres');
      }
      request.email = frontendUser.email.trim();
    }
    
    if (frontendUser.username !== undefined) {
      if (frontendUser.username.trim().length < 2) {
        throw new Error('El nombre de usuario debe tener al menos 2 caracteres');
      }
      request.username = frontendUser.username.trim();
    }
    
    if (frontendUser.password !== undefined && frontendUser.password.trim().length > 0) {
      if (frontendUser.password.trim().length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      request.password = frontendUser.password.trim();
    }
    
    if (frontendUser.rol !== undefined) {
      request.role_id = frontendUser.rol.id;
    }
    
    if (frontendUser.activo !== undefined) {
      request.is_active = frontendUser.activo;
    }
    
    return request;
  }

  /**
   * Valida si un objeto tiene la estructura correcta del backend
   */
  static isValidBackendResponse(obj: any): obj is UsuarioBackendResponse {
    return (
      obj &&
      typeof obj.id === 'number' &&
      typeof obj.email === 'string' &&
      typeof obj.username === 'string' &&
      (obj.photo_url === null || typeof obj.photo_url === 'string') &&
      typeof obj.is_active === 'boolean' &&
      typeof obj.role_id === 'number' &&
      typeof obj.created_at === 'string'
    );
  }

  /**
   * Valida si un objeto tiene la estructura correcta del frontend
   */
  static isValidFrontendModel(obj: any): obj is Usuario {
    return (
      obj &&
      typeof obj.id === 'string' &&
      typeof obj.email === 'string' &&
      typeof obj.username === 'string' &&
      typeof obj.fotoUrl === 'string' &&
      typeof obj.activo === 'boolean' &&
      obj.rol &&
      typeof obj.rol.id === 'number' &&
      typeof obj.rol.nombre === 'string' &&
      typeof obj.creadoEn === 'string'
    );
  }
}