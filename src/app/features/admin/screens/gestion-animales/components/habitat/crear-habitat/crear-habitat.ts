import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { NgTemplateOutlet } from '@angular/common';
import { ShowToast } from '@app/shared/services';
import { Router } from '@angular/router';
import { AdminHabitat } from '@app/features/admin/services/admin-habitat';
import { finalize } from 'rxjs/operators';
import { Habitat } from '@app/core/models/habitat';
import { CardModule } from 'primeng/card';
import { MainContainer } from '@app/shared/components/main-container';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-crear-habitat',
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    MessageModule,
    InputTextModule,
    TextareaModule,
    FloatLabel,
    CardModule,
    MainContainer,
    ButtonModule
  ],
  templateUrl: './crear-habitat.html',
  styleUrl: './crear-habitat.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CrearHabitat {
  private readonly zooToast = inject(ShowToast);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly adminHabitat = inject(AdminHabitat);

  protected readonly formSubmitted = signal(false);
  protected readonly isCreating = signal(false);

  protected readonly habitatForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    tipo: ['', [Validators.required, Validators.minLength(2)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    condicionesClimaticas: ['', [Validators.required, Validators.minLength(5)]],
  });

  protected isInvalid(fieldName: string): boolean {
    const field = this.habitatForm.get(fieldName);
    return !!(
      field?.invalid &&
      (field?.dirty || field?.touched || this.formSubmitted())
    );
  }

  protected getErrorMessage(fieldName: string): string {
    const field = this.habitatForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} es requerido`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(
          fieldName
        )} debe tener al menos ${requiredLength} caracteres`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const fieldNames: { [key: string]: string } = {
      nombre: 'El nombre',
      tipo: 'El tipo',
      descripcion: 'La descripción',
      condicionesClimaticas: 'Las condiciones climáticas',
    };
    return fieldNames[fieldName] || fieldName;
  }

  protected onSubmit(): void {
    this.formSubmitted.set(true);

    if (this.habitatForm.valid) {
      this.isCreating.set(true);

      const habitatData: Omit<Habitat, 'id' | 'isActive'> = {
        nombre: this.habitatForm.value.nombre!,
        tipo: this.habitatForm.value.tipo!,
        descripcion: this.habitatForm.value.descripcion!,
        condicionesClimaticas: this.habitatForm.value.condicionesClimaticas!,
      };

      this.adminHabitat
        .createHabitat(habitatData)
        .pipe(finalize(() => this.isCreating.set(false)))
        .subscribe({
          next: () => {
            this.zooToast.showSuccess('Éxito', 'Hábitat creado exitosamente');
            this.router.navigate(['/admin/animales/habitat/lista']);
          },
          error: (error) => {
            this.zooToast.showError(
              'Error',
              'Error al crear el hábitat: ' + error.message
            );
          },
        });
    } else {
      this.zooToast.showError(
        'Error',
        'Por favor, completa todos los campos requeridos'
      );
    }
  }

  protected onCancel(): void {
    this.router.navigate(['/admin/animales/habitat/lista']);
  }
}
