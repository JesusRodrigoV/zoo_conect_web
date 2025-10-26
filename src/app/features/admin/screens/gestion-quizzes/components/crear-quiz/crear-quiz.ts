import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgTemplateOutlet } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ShowToast } from '@app/shared/services';
import { Router } from '@angular/router';
import { AdminQuizzes } from '@app/features/admin/services/admin-quizzes';
import { finalize } from 'rxjs/operators';
import { CardModule } from 'primeng/card';
import { MainContainer } from '@app/shared/components/main-container';

interface CreateQuizRequest {
  fechaTrivia: string;
  cantidadPreguntas: number;
  dificultad: string;
}

@Component({
  selector: 'zoo-crear-quiz',
  imports: [
    ReactiveFormsModule,
    DatePickerModule,
    MessageModule,
    InputTextModule,
    FloatLabel,
    SelectModule,
    InputNumberModule,
    NgTemplateOutlet,
    ButtonModule,
    CardModule,
    MainContainer,
  ],
  templateUrl: './crear-quiz.html',
  styleUrl: './crear-quiz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CrearQuiz {
  private fb = inject(FormBuilder);
  private showToast = inject(ShowToast);
  private router = inject(Router);
  private quizService = inject(AdminQuizzes);

  protected readonly loading = signal(false);

  protected readonly dificultades = [
    { label: 'Fácil', value: 'Fácil' },
    { label: 'Medio', value: 'Medio' },
    { label: 'Difícil', value: 'Difícil' },
  ];

  protected readonly minDate = computed(() => new Date());

  protected readonly quizForm = this.fb.group({
    fechaTrivia: ['', [Validators.required]],
    cantidadPreguntas: [
      10,
      [Validators.required, Validators.min(1), Validators.max(50)],
    ],
    dificultad: ['', [Validators.required]],
  });

  protected isInvalid(field: string): boolean {
    const control = this.quizForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  protected getErrorMessage(field: string): string {
    const control = this.quizForm.get(field);
    if (!control) return '';

    if (control.hasError('required')) {
      return `${this.getFieldDisplayName(field)} es requerido`;
    }
    if (control.hasError('min')) {
      return `${this.getFieldDisplayName(field)} debe ser mayor a 0`;
    }
    if (control.hasError('max')) {
      return `${this.getFieldDisplayName(field)} no puede ser mayor a 50`;
    }
    return '';
  }

  private getFieldDisplayName(field: string): string {
    const displayNames: Record<string, string> = {
      fechaTrivia: 'Fecha de la trivia',
      cantidadPreguntas: 'Cantidad de preguntas',
      dificultad: 'Dificultad',
    };
    return displayNames[field] || field;
  }

  protected onSubmit(): void {
    if (this.quizForm.valid) {
      this.loading.set(true);

      const formValue = this.quizForm.value;
      const fechaTrivia = formValue.fechaTrivia as unknown as Date;
      const quizData: CreateQuizRequest = {
        fechaTrivia: fechaTrivia.toISOString(),
        cantidadPreguntas: formValue.cantidadPreguntas!,
        dificultad: formValue.dificultad!,
      };

      this.quizService
        .createQuiz(quizData)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: () => {
            this.showToast.showSuccess('Éxito', 'Quiz creado exitosamente');
            this.router.navigate(['/admin/quizzes']);
          },
          error: (error) => {
            console.error('Error al crear quiz:', error);
            this.showToast.showError('Error', 'Error al crear el quiz');
          },
        });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.quizForm.controls).forEach((key) => {
      const control = this.quizForm.get(key);
      control?.markAsTouched();
    });
  }
}
