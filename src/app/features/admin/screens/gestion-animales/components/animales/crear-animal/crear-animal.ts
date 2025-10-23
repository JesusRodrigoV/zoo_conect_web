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
  ReactiveFormsModule,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { ShowToast } from '@app/shared/services';
import { Router } from '@angular/router';
import { AdminAnimales } from '@app/features/admin/services/admin-animales';
import { CreateAnimalRequest } from '@adapters/animales';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'zoo-crear-animal',
  imports: [
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
    FloatLabel,
    TextareaModule,
    ButtonModule,
    CardModule,
    SelectModule,
    CheckboxModule,
  ],
  templateUrl: './crear-animal.html',
  styleUrl: './crear-animal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CrearAnimal {
  private readonly fb = inject(FormBuilder);
  private readonly animalService = inject(AdminAnimales);
  private readonly showToast = inject(ShowToast);
  private readonly router = inject(Router);

  protected readonly isLoading = signal(false);

  protected readonly estadosOperativos = [
    { label: 'Saludable', value: 'Saludable' },
    { label: 'En tratamiento', value: 'En tratamiento' },
    { label: 'En cuarentena', value: 'En cuarentena' },
    { label: 'Trasladado', value: 'Trasladado' },
    { label: 'Fallecido', value: 'Fallecido' },
  ];

  protected readonly animalForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    genero: [true, [Validators.required]], // true = macho, false = hembra
    fecha_nacimiento: ['', [Validators.required]],
    fecha_ingreso: ['', [Validators.required]],
    procedencia: ['', [Validators.required]],
    estado_operativo: ['Saludable', [Validators.required]],
    es_publico: [true],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    especie_id: [null as number | null, [Validators.required]],
    habitat_id: [null as number | null, [Validators.required]],
  });

  protected readonly canSubmit = computed(() => 
    this.animalForm.valid && !this.isLoading()
  );

  protected onSubmit(): void {
    if (!this.canSubmit()) return;

    const formValue = this.animalForm.value;
    const animalData: CreateAnimalRequest = {
      nombre: formValue.nombre!,
      genero: formValue.genero!,
      fecha_nacimiento: formValue.fecha_nacimiento!,
      fecha_ingreso: formValue.fecha_ingreso!,
      procedencia: formValue.procedencia!,
      estado_operativo: formValue.estado_operativo as any,
      es_publico: formValue.es_publico!,
      descripcion: formValue.descripcion!,
      especie_id: formValue.especie_id!,
      habitat_id: formValue.habitat_id!,
    };

    this.isLoading.set(true);

    this.animalService
      .createAnimal(animalData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (animal) => {
          this.showToast.showSuccess('Éxito', 'Animal creado exitosamente');
          this.router.navigate(['/admin/animales/lista']);
        },
        error: (error) => {
          console.error('Error al crear animal:', error);
          this.showToast.showError('Error', 'Error al crear el animal');
        },
      });
  }

  protected onCancel(): void {
    this.router.navigate(['/admin/animales']);
  }
}
