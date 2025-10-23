import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { NgTemplateOutlet } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { ShowToast } from '@app/shared/services';
import { Router } from '@angular/router';
import { AdminEspecies } from '@app/features/admin/services/admin-especies';
import { finalize } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CreateEspecie } from '@app/core/models/animales/especie.model';
import { Loader } from '@app/shared/components';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crear-especie',
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    MessageModule,
    InputTextModule,
    TextareaModule,
    FloatLabel,
    CheckboxModule,
    ConfirmPopupModule,
    Loader,
    MatButtonModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './crear-especie.html',
  styleUrl: './crear-especie.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CrearEspecie {
  private readonly zooToast = inject(ShowToast);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly adminEspecies = inject(AdminEspecies);
  private confirmationService = inject(ConfirmationService);

  protected readonly formSubmitted = signal(false);
  protected readonly isCreating = signal(false);

  protected readonly especieForm = this.fb.group({
    nombreCientifico: ['', [Validators.required, Validators.minLength(3)]],
    nombreComun: ['', [Validators.required, Validators.minLength(2)]],
    filo: ['', [Validators.required, Validators.minLength(2)]],
    clase: ['', [Validators.required, Validators.minLength(2)]],
    orden: ['', [Validators.required, Validators.minLength(2)]],
    familia: ['', [Validators.required, Validators.minLength(2)]],
    genero: ['', [Validators.required, Validators.minLength(2)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected readonly isFormValid = computed(() => this.especieForm.valid);

  protected isInvalid(fieldName: string): boolean {
    const field = this.especieForm.get(fieldName);
    return !!(
      field &&
      field.invalid &&
      (field.dirty || field.touched || this.formSubmitted())
    );
  }

  protected onSubmit(): void {
    this.formSubmitted.set(true);

    if (!this.especieForm.valid) {
      this.zooToast.showError(
        'Formulario inválido',
        'Por favor complete todos los campos requeridos'
      );
      return;
    }

    this.createEspecie();
  }

  private createEspecie(): void {
    if (this.isCreating()) return;

    this.isCreating.set(true);
    const formData = this.especieForm.value as CreateEspecie;

    this.adminEspecies
      .createSpecies(formData)
      .pipe(finalize(() => this.isCreating.set(false)))
      .subscribe({
        next: (especie) => {
          this.zooToast.showSuccess(
            'Éxito',
            `Especie "${especie.nombreComun}" creada exitosamente`
          );
          this.router.navigate(['/admin/animales/especies']);
        },
        error: (error) => {
          console.error('Error creando especie:', error);
          let errorMessage = 'Error al crear la especie';

          if (error.status === 400) {
            errorMessage =
              'Datos inválidos. Verifique la información ingresada';
          } else if (error.status === 409) {
            errorMessage = 'Ya existe una especie con este nombre científico';
          } else if (error.status === 422) {
            errorMessage = 'Formato de datos incorrecto';
          }

          this.zooToast.showError('Error', errorMessage);
        },
      });
  }

  protected cancelar(): void {
    this.router.navigate(['/admin/animales/especies']);
  }

  protected limpiarFormulario(): void {
    this.especieForm.reset();
    this.formSubmitted.set(false);
  }

  protected getErrorMessage(fieldName: string): string {
    const control = this.especieForm.get(fieldName);
    if (!control || !control.errors) return '';

    const errors = control.errors;

    if (errors['required']) {
      const fieldLabels: { [key: string]: string } = {
        nombreCientifico: 'El nombre científico',
        nombreComun: 'El nombre común',
        filo: 'El filo',
        clase: 'La clase',
        orden: 'El orden',
        familia: 'La familia',
        genero: 'El género',
        descripcion: 'La descripción',
      };
      return `${fieldLabels[fieldName] || 'Este campo'} es requerido`;
    }

    if (errors['minlength']) {
      const minLength = errors['minlength'].requiredLength;
      return `Debe tener al menos ${minLength} caracteres`;
    }

    return 'Campo inválido';
  }
}
