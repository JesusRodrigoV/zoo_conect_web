import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EncuestaService } from '../../services/encuestas';
import { AsyncPipe } from '@angular/common';
import { Loader } from '@app/shared/components';
import { MainContainer } from '@app/shared/components/main-container';

@Component({
  selector: 'app-encuestas',
  imports: [AsyncPipe, Loader, MainContainer],
  templateUrl: './encuestas.html',
  styleUrl: './encuestas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Encuestas {
  private surveyService = inject(EncuestaService);
  protected surveys$ = this.surveyService.getSurveys();
}
