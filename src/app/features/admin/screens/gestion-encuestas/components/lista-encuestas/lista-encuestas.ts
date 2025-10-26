import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminEncuestas } from '@app/features/admin/services/admin-encuestas';
import { Loader } from '@app/shared/components';
import { DataView } from 'primeng/dataview';
import { EncuestaItem } from '../encuesta-item';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'zoo-lista-encuestas',
  imports: [
    AsyncPipe,
    Loader,
    DataView,
    ButtonModule,
    EncuestaItem,
    RouterLink
],
  templateUrl: './lista-encuestas.html',
  styleUrl: './lista-encuestas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListaEncuestas {
  private surveyService = inject(AdminEncuestas);
  protected surveys$ = this.surveyService.getAllSurveys();
}
