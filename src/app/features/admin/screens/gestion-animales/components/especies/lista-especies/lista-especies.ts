import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminEspecies } from '@app/features/admin/services/admin-especies';
import { Loader } from '@app/shared/components';
import { DataView } from 'primeng/dataview';
import { EspecieItem } from './components/especie-item';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-lista-especies',
  imports: [Loader, AsyncPipe, DataView, EspecieItem, ButtonModule, RouterLink],
  templateUrl: './lista-especies.html',
  styleUrl: './lista-especies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListaEspecies {
  private especiesService = inject(AdminEspecies);
  protected especies$ = this.especiesService.getAllSpecies();
}
