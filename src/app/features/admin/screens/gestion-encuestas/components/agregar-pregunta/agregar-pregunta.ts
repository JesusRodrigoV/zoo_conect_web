import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormArray,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ShowToast } from '@app/shared/services';
import { MessageModule } from 'primeng/message';
import { FloatLabel } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

export interface PreguntaDialogResult {
  texto_pregunta: string;
  es_opcion_unica: boolean;
  opciones: { texto_opcion: string; orden: number }[];
}

@Component({
  selector: 'zoo-agregar-pregunta',
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MessageModule,
    FloatLabel,
    InputTextModule,
    TextareaModule,
    SelectModule,
    ConfirmPopupModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './agregar-pregunta.html',
  styleUrl: './agregar-pregunta.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgregarPregunta {
  private readonly fb = inject(FormBuilder);
  private readonly zooToast = inject(ShowToast);
  private confirmationService = inject(ConfirmationService);
  
  protected readonly formSubmitted = signal(false);
  tipoOpciones: any[] | undefined;
  
  readonly dialogResult = output<PreguntaDialogResult | null>();

  constructor() {
    this.tipoOpciones = [
      { nombre: 'Opción única', value: 'opcion_unica' },
      { nombre: 'Texto', value: 'texto' },
    ];
  }

  protected readonly tipoSeleccionado = signal<'opcion_unica' | 'texto'>(
    'opcion_unica'
  );

  private readonly basicValidator: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(500),
  ];

  protected readonly questionForm = this.fb.group({
    textoPregunta: ['', this.basicValidator],
    tipoPregunta: ['opcion_unica', Validators.required],
    opciones: this.fb.array([
      this.createOpcionControl(),
      this.createOpcionControl(),
    ]),
  });

  get opciones(): FormArray {
    return this.questionForm.get('opciones') as FormArray;
  }

  private createOpcionControl() {
    return this.fb.group({
      texto_opcion: ['', this.basicValidator],
    });
  }

  onTipoChange(): void {
    const tipo = this.questionForm.get('tipoPregunta')?.value;
    if (tipo === 'opcion_unica' || tipo === 'texto') {
      this.tipoSeleccionado.set(tipo);
    }

    if (tipo === 'texto') {
      this.opciones.clear();
    } else if (tipo === 'opcion_unica' && this.opciones.length === 0) {
      this.opciones.push(this.createOpcionControl());
      this.opciones.push(this.createOpcionControl());
    }
  }

  addOpcion(): void {
    if (this.opciones.length < 10) {
      this.opciones.push(this.createOpcionControl());
    }
  }

  removeOpcion(index: number, event: Event): void {
    if (this.opciones.length > 1) {
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
          this.opciones.removeAt(index);
        },
      });
    }
  }

  isFormValid(): boolean {
    const formValid = this.questionForm.valid;
    const tipoValido =
      this.tipoSeleccionado() === 'texto' ||
      (this.tipoSeleccionado() === 'opcion_unica' && this.opciones.length >= 2);

    return formValid && tipoValido;
  }

  save(): void {
    if (!this.isFormValid()) {
      this.zooToast.showError(
        'Error',
        'Por favor corrige los errores del formulario'
      );
      return;
    }

    const formValue = this.questionForm.getRawValue();

    if (
      this.tipoSeleccionado() === 'opcion_unica' &&
      formValue.opciones!.length < 2
    ) {
      this.zooToast.showError(
        'Error',
        'Las preguntas de opción única necesitan al menos 2 opciones'
      );
      return;
    }

    const result: PreguntaDialogResult = {
      texto_pregunta: formValue.textoPregunta!,
      es_opcion_unica: this.tipoSeleccionado() === 'opcion_unica',
      opciones:
        this.tipoSeleccionado() === 'opcion_unica'
          ? formValue.opciones!.map((opcion, index) => ({
              texto_opcion: opcion.texto_opcion!,
              orden: index + 1,
            }))
          : [],
    };
    this.formSubmitted.set(true);
    this.dialogResult.emit(result);
  }

  cancel(): void {
    this.dialogResult.emit(null);
  }

  isInvalid(controlName: string) {
    const control = this.questionForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted());
  }

  getErrorMessage(controlName: string): string {
    const control = this.questionForm.get(controlName);
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
      textoPregunta: 'Texto de pregunta',
      tipoPregunta: 'Tipo de pregunta',
      titulo: 'Título',
      descripcion: 'Descripción',
      fechaInicio: 'Fecha de inicio',
      fechaFin: 'Fecha de fin',
      preguntas: 'Preguntas',
    };
    return displayNames[controlName] || 'Campo';
  }
}
