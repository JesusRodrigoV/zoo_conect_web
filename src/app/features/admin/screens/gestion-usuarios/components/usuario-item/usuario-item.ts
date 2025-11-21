import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '@app/core/models/usuario';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { AdminUsuarios } from '@app/features/admin/services/admin-usuarios';
import { ShowToast } from '@app/shared/services';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'zoo-usuario-item',
  imports: [
    ButtonModule, 
    CardModule, 
    TagModule,
    TooltipModule
  ],
  templateUrl: './usuario-item.html',
  styleUrl: './usuario-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioItem {
  readonly usuario = input.required<Usuario>();
  private readonly router = inject(Router);
  private readonly usuariosService = inject(AdminUsuarios);
  private readonly showToast = inject(ShowToast);

  protected editUser(): void {
    const userId = Number(this.usuario().id);
    this.router.navigate(['/admin/usuarios/editar', userId]);
  }

  protected async deleteUser(): Promise<void> {
    try {
      const usuario = this.usuario();
      const userId = Number(usuario.id);
      await firstValueFrom(this.usuariosService.deleteUser(userId));
      this.showToast.showSuccess(
        'Usuario eliminado',
        'El usuario ha sido eliminado correctamente'
      );
    } catch (error) {
      this.showToast.showError(
        'Error',
        'No se pudo eliminar el usuario'
      );
    }
  }

  protected async toggleUserStatus(): Promise<void> {
    try {
      const usuario = this.usuario();
      const userId = Number(usuario.id);
      const updatedUser = { ...usuario, activo: !usuario.activo };
      await firstValueFrom(this.usuariosService.updateUser(userId, updatedUser));
      this.showToast.showSuccess(
        'Estado actualizado',
        'El estado del usuario ha sido actualizado correctamente'
      );
    } catch (error) {
      this.showToast.showError(
        'Error',
        'No se pudo actualizar el estado del usuario'
      );
    }
  }

  protected getSeverityForRole(roleId: number): 'success' | 'info' | 'warn' | 'danger' {
    switch (roleId) {
      case 1: return 'danger';   // Admin
      case 2: return 'warn';     // Staff
      case 3: return 'success';  // Usuario
      case 4: return 'info';     // Invitado
      default: return 'info';
    }
  }

  protected getSeverityForStatus(activo: boolean): 'success' | 'danger' {
    return activo ? 'success' : 'danger';
  }

  protected getButtonSeverity(activo: boolean): 'warn' | 'success' {
    return activo ? 'warn' : 'success';
  }
}
