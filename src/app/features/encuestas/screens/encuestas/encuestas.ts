import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EncuestaService } from '../../services/encuestas';
import { AsyncPipe } from '@angular/common';
import { Loader } from '@app/shared/components';

@Component({
  selector: 'app-encuestas',
  imports: [AsyncPipe, Loader],
  templateUrl: './encuestas.html',
  styleUrl: './encuestas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Encuestas {
  private surveyService = inject(EncuestaService);
  protected surveys$ = this.surveyService.getSurveys();
}
