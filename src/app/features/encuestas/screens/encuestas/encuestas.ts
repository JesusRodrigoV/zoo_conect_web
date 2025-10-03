import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EncuestaService } from '../../services/encuestas';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-encuestas',
  imports: [AsyncPipe],
  templateUrl: './encuestas.html',
  styleUrl: './encuestas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Encuestas {
  private surveyService = inject(EncuestaService);
  protected surveys$ = this.surveyService.getSurveys();
}
