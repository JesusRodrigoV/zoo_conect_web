import { Rol, RolId, Usuario } from "../models/usuario.model";

export class UsuarioAdapter {
  private static mapRoleIdToRol(idRol: number): Rol {
    const roleMap: { [key: number]: string } = {
      [RolId.ADMIN]: 'Administrador',
      [RolId.VISITANTE]: 'Visitante',
      [RolId.CUIDADOR]: 'Cuidador',
      [RolId.VETERINARIO]: 'Veterinario'
    };

    return {
      id: idRol as RolId,
      nombre: roleMap[idRol] || 'Desconocido'
    };
  }

  static fromBackend(backendUser: BackendUserResponse): Usuario {
    return {
      id: backendUser.id.toString(),
      email: backendUser.email,
      username: backendUser.username,
      fotoUrl: backendUser.photo_url || '',
      activo: backendUser.is_active,
      rol: this.mapRoleIdToRol(backendUser.role_id),
      creadoEn: backendUser.created_at
    };
  }

  static toBackend(user: Usuario): Partial<BackendUserResponse> {
    return {
      email: user.email,
      username: user.username,
      is_active: user.activo,
      role_id: user.rol.id,
      photo_url: user.fotoUrl || null
    };
  }
}

export interface BackendUserResponse {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  role_id: number;
  photo_url: string | null;
  created_at: string;
}