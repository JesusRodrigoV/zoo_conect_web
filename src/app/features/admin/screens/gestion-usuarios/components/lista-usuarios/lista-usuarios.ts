import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminUsuarios } from '@app/features/admin/services/admin-usuarios';
import { Loader } from '@app/shared/components';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { UsuarioItem } from '../usuario-item';

@Component({
  selector: 'zoo-lista-usuarios',
  imports: [
    AsyncPipe, 
    Loader, 
    DataView, 
    ButtonModule, 
    UsuarioItem
  ],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListaUsuarios {
  private usuariosService = inject(AdminUsuarios);
  private router = inject(Router);
  
  protected usuarios$ = this.usuariosService.getAllUsers();

  protected navigateToCreate(): void {
    this.router.navigate(['/admin/usuarios/crear']);
  }
}
