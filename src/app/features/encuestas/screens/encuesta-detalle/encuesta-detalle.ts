import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncuestaService } from '../../services/encuestas';
import { AsyncPipe } from '@angular/common';
import { MainContainer } from '@app/shared/components/main-container';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-encuesta-detalle',
  imports: [
    MainContainer,
    AsyncPipe,
    ReactiveFormsModule,
    CardModule,
    RadioButtonModule,
    CheckboxModule,
    TextareaModule,
    ButtonModule,
  ],
  templateUrl: './encuesta-detalle.html',
  styleUrl: './encuesta-detalle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EncuestaDetalle {
  private route = inject(ActivatedRoute);
  private encuestaService = inject(EncuestaService);
  private fb = inject(FormBuilder);
  readonly encuestaId;
  protected encuesta$;

  constructor() {
    this.encuestaId = this.route.snapshot.paramMap.get('id') || '';
    this.encuesta$ = this.encuestaService.getSurveyById(this.encuestaId);
  }
  protected isSubmitting = signal(false);
  protected form = computed(() => this.createForm());

  private createForm(): FormGroup {
    const group: Record<string, any> = {};
    return this.fb.group(group);
  }
}
