import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { NgTemplateOutlet } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';
import { ShowToast } from '@app/shared/services';
import { Router } from '@angular/router';
import { AdminUsuarios } from '@app/features/admin/services/admin-usuarios';
import { finalize } from 'rxjs/operators';
import { Usuario, RolId } from '@app/core/models/usuario';

interface RoleOption {
  label: string;
  value: RolId;
}

@Component({
  selector: 'app-crear-usuario',
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    MessageModule,
    InputTextModule,
    FloatLabel,
    ButtonModule,
    CardModule,
    SelectModule,
    PasswordModule,
  ],
  templateUrl: './crear-usuario.html',
  styleUrl: './crear-usuario.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CrearUsuario {
  private readonly zooToast = inject(ShowToast);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly adminUsuarios = inject(AdminUsuarios);

  protected readonly formSubmitted = signal(false);
  protected readonly isCreating = signal(false);

  protected readonly roleOptions: RoleOption[] = [
    { label: 'Administrador', value: RolId.ADMIN },
    { label: 'Veterinario', value: RolId.VETERINARIO },
    { label: 'Cuidador', value: RolId.CUIDADOR },
    { label: 'Visitante', value: RolId.VISITANTE },
  ];

  protected readonly usuarioForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rol: [null as RolId | null, [Validators.required]],
  });

  protected isInvalid(fieldName: string): boolean {
    const field = this.usuarioForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched || this.formSubmitted()));
  }

  protected getErrorMessage(fieldName: string): string {
    const field = this.usuarioForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} es requerido`;
      }
      if (field.errors['email']) {
        return 'El formato del email no es válido';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} debe tener al menos ${requiredLength} caracteres`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const fieldNames: { [key: string]: string } = {
      email: 'El email',
      username: 'El nombre de usuario',
      password: 'La contraseña',
      rol: 'El rol',
    };
    return fieldNames[fieldName] || fieldName;
  }

  protected onSubmit(): void {
    this.formSubmitted.set(true);
    
    if (this.usuarioForm.valid) {
      this.isCreating.set(true);
      
      const usuarioData: Omit<Usuario, 'id' | 'creadoEn'> & { password: string } = {
        email: this.usuarioForm.value.email!,
        username: this.usuarioForm.value.username!,
        password: this.usuarioForm.value.password!,
        fotoUrl: '',
        activo: true, // Los usuarios se crean activos por defecto
        rol: {
          id: this.usuarioForm.value.rol!,
          nombre: this.getRoleName(this.usuarioForm.value.rol!)
        }
      };

      this.adminUsuarios.createUser(usuarioData)
        .pipe(
          finalize(() => this.isCreating.set(false))
        )
        .subscribe({
          next: (usuario) => {
            this.zooToast.showSuccess('Éxito', 'Usuario creado exitosamente');
            this.router.navigate(['/admin/usuarios/lista']);
          },
          error: (error) => {
            this.zooToast.showError('Error', error.message);
          }
        });
    } else {
      this.zooToast.showError('Error', 'Por favor, completa todos los campos requeridos');
    }
  }

  protected onCancel(): void {
    this.router.navigate(['/admin/usuarios/lista']);
  }

  private getRoleName(roleId: RolId): string {
    const role = this.roleOptions.find(r => r.value === roleId);
    return role?.label || '';
  }
}
