import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminHabitat } from '@app/features/admin/services/admin-habitat';
import { Loader } from '@app/shared/components';
import { DataView } from 'primeng/dataview';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'zoo-lista-habitats',
  imports: [
    AsyncPipe, 
    Loader, 
    DataView, 
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ButtonModule
  ],
  templateUrl: './lista-habitats.html',
  styleUrl: './lista-habitats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListaHabitats {
  private habitatService = inject(AdminHabitat);
  private router = inject(Router);
  
  protected habitats$ = this.habitatService.getAllHabitats(0, 100);

  protected navigateToCreate(): void {
    this.router.navigate(['/admin/gestion-animales/habitat/crear']);
  }

  protected editHabitat(id: number): void {
    // TODO: Implementar edición cuando se cree el componente
    console.log('Editar hábitat:', id);
  }

  protected deleteHabitat(id: number): void {
    // TODO: Implementar eliminación con confirmación
    console.log('Eliminar hábitat:', id);
  }
}
