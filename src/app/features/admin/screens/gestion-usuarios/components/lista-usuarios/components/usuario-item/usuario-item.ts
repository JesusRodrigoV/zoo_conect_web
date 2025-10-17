import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Usuario } from '@app/core/models/usuario';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'zoo-usuario-item',
  imports: [
    DatePipe,
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
  
  readonly onEdit = output<Usuario>();
  readonly onDelete = output<Usuario>();
  readonly onToggleStatus = output<Usuario>();

  protected editUser(): void {
    this.onEdit.emit(this.usuario());
  }

  protected deleteUser(): void {
    this.onDelete.emit(this.usuario());
  }

  protected toggleUserStatus(): void {
    this.onToggleStatus.emit(this.usuario());
  }

  protected getSeverityForRole(roleId: number): 'success' | 'info' | 'warn' | 'danger' {
    switch (roleId) {
      case 1: return 'danger';   
      case 2: return 'warn';     
      case 3: return 'success';  
      case 4: return 'info';     
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
