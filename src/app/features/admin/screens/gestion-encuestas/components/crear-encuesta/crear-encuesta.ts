import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { NgTemplateOutlet } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ShowToast } from '@app/shared/services';
import { Router } from '@angular/router';
import { AgregarPregunta, PreguntaDialogResult } from '../agregar-pregunta';
import { AdminEncuestas } from '@app/features/admin/services/admin-encuestas';
import { finalize } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CardModule } from 'primeng/card';
import { MainContainer } from '@app/shared/components/main-container';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';

interface OpcionPregunta {
  texto_opcion: string;
  orden: number;
}

interface Pregunta {
  texto_pregunta: string;
  es_opcion_unica: boolean;
  orden: number;
  opciones: OpcionPregunta[];
}

interface CreateEncuestaRequest {
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  is_active: boolean;
  preguntas: Pregunta[];
}

@Component({
  selector: 'app-crear-encuesta',
  imports: [
    NgTemplateOutlet,
    DialogModule,
    ReactiveFormsModule,
    DatePickerModule,
    MessageModule,
    InputTextModule,
    TextareaModule,
    FloatLabel,
    AgregarPregunta,
    ConfirmPopupModule,
    CardModule,
    MainContainer,
    ButtonModule,
    AccordionModule,
    TooltipModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './crear-encuesta.html',
  styleUrl: './crear-encuesta.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CrearEncuesta {
  private readonly zooToast = inject(ShowToast);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly adminEncuestas = inject(AdminEncuestas);
  private confirmationService = inject(ConfirmationService);

  protected readonly formSubmitted = signal(false);
  protected readonly isCreating = signal(false);
  protected readonly minDateInicio = signal(new Date());
  protected readonly fechaInicioValue = signal<Date | null>(null);
  protected readonly preguntas = signal<Pregunta[]>([]);
  protected readonly showDialog = signal(false);

  protected readonly minDateFin = computed(() => {
    return this.fechaInicioValue() || new Date();
  });

  private readonly basicValidator: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(5),
  ];

  protected readonly encuestaForm = this.fb.group({
    titulo: ['', this.basicValidator],
    descripcion: ['', this.basicValidator],
    fechaInicio: new FormControl<Date | null>(null, [Validators.required]),
    fechaFin: new FormControl<Date | null>(null, [Validators.required]),
  });

  constructor() {
    this.encuestaForm.get('fechaInicio')?.valueChanges.subscribe((value) => {
      this.fechaInicioValue.set(value);
    });
  }

  addPregunta(): void {
    if (this.isCreating()) {
      return;
    }

    this.showDialog.set(true);
  }

  onDialogResult(result: PreguntaDialogResult | null): void {
    this.showDialog.set(false);

    if (result) {
      const nuevaPregunta: Pregunta = {
        texto_pregunta: result.texto_pregunta,
        es_opcion_unica: result.es_opcion_unica,
        orden: this.preguntas().length + 1,
        opciones: result.opciones,
      };

      this.preguntas.update((preguntas) => [...preguntas, nuevaPregunta]);
      this.zooToast.showSuccess(
        'Éxito',
        `Pregunta ${nuevaPregunta.orden} agregada correctamente`
      );
    }
  }

  removePregunta(index: number, event: Event): void {
    if (this.isCreating()) {
      return;
    }

    const pregunta = this.preguntas()[index];

    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de que deseas eliminar esta opción?',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger',
      },
      accept: () => {
        const preguntas = this.preguntas();
        preguntas.splice(index, 1);

        preguntas.forEach((pregunta, i) => {
          pregunta.orden = i + 1;
        });

        this.preguntas.set([...preguntas]);
        this.zooToast.showInfo(
          'Información',
          'Pregunta eliminada correctamente'
        );
      },
    });
  }

  onSubmit() {
    this.formSubmitted.set(true);

    if (!this.encuestaForm.valid) {
      this.zooToast.showError(
        'Error',
        'Por favor, corrige los errores en el formulario'
      );
      return;
    }

    if (this.preguntas().length === 0) {
      this.zooToast.showError(
        'Error',
        'Por favor agrega al menos una pregunta'
      );
      return;
    }

    if (this.isCreating()) {
      return;
    }

    const formValue = this.encuestaForm.getRawValue();

    const createEncuestaRequest: CreateEncuestaRequest = {
      titulo: formValue.titulo!,
      descripcion: formValue.descripcion!,
      fecha_inicio: formValue.fechaInicio!.toISOString(),
      fecha_fin: formValue.fechaFin!.toISOString(),
      is_active: true,
      preguntas: this.preguntas(),
    };

    console.log('🚀 Request para el API:', createEncuestaRequest);

    this.isCreating.set(true);

    this.adminEncuestas
      .createSurvey(createEncuestaRequest)
      .pipe(finalize(() => this.isCreating.set(false)))
      .subscribe({
        next: (response) => {
          console.log('Encuesta creada exitosamente:', response);
          this.zooToast.showSuccess(
            'Éxito',
            `Encuesta "${formValue.titulo}" creada correctamente`
          );

          this.encuestaForm.reset();
          this.preguntas.set([]);
          this.formSubmitted.set(false);
          this.fechaInicioValue.set(null);

          this.router.navigate(['/admin/gestion-encuestas']);
        },
        error: (error) => {
          console.error('Error al crear encuesta:', error);

          let errorMessage = 'Error inesperado al crear la encuesta';

          if (error.status === 400) {
            errorMessage =
              'Datos inválidos. Verifica la información ingresada.';
          } else if (error.status === 401) {
            errorMessage = 'No tienes permisos para crear encuestas.';
          } else if (error.status === 422) {
            errorMessage = 'Los datos enviados no son válidos.';
          } else if (error.status >= 500) {
            errorMessage = 'Error del servidor. Intenta más tarde.';
          }

          this.zooToast.showError('Error al crear encuesta', errorMessage);
        },
      });
  }

  isInvalid(controlName: string) {
    const control = this.encuestaForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted());
  }

  getErrorMessage(controlName: string): string {
    const control = this.encuestaForm.get(controlName);
    if (!control || !control.errors) return '';

    const errors = control.errors;

    if (errors['required']) {
      return `${this.getFieldDisplayName(controlName)} es requerido`;
    }
    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `${this.getFieldDisplayName(
        controlName
      )} debe tener al menos ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

  private getFieldDisplayName(controlName: string): string {
    const displayNames: Record<string, string> = {
      titulo: 'Título',
      descripcion: 'Descripción',
      fechaInicio: 'Fecha de inicio',
      fechaFin: 'Fecha de fin',
      preguntas: 'Preguntas',
    };
    return displayNames[controlName];
  }
}
