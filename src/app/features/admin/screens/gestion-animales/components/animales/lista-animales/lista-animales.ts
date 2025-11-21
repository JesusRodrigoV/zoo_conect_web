import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminAnimales } from '@app/features/admin/services/admin-animales';
import { Loader } from '@app/shared/components';
import { DataView } from 'primeng/dataview';
import { AnimalItem } from '../animal-item';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'zoo-lista-animales',
  imports: [
    AsyncPipe,
    Loader,
    DataView,
    ButtonModule,
    AnimalItem,
    RouterLink
],
  templateUrl: './lista-animales.html',
  styleUrl: './lista-animales.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListaAnimales {
  private animalService = inject(AdminAnimales);
  protected animals$ = this.animalService.getAllAnimals();
}
