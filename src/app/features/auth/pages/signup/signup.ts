import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@app/core/store/auth.store';
import { Loader } from '@app/shared/components/loader';
import { FormField } from '@app/shared/components/form-field';

@Component({
  selector: 'app-signup',
  imports: [MatButtonModule, ReactiveFormsModule, RouterLink, Loader, FormField],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Signup {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);

  protected readonly isLoading = this.authStore.loading;
  protected readonly error = this.authStore.error;

  protected readonly signupForm: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator }
  );

  protected readonly showPassword = signal(false);
  protected readonly showConfirmPassword = signal(false);

  protected onSubmit(): void {
    if (this.signupForm.valid) {
      const { email, username, password } = this.signupForm.value;
      this.authStore.register(email, username, password);
    } else {
      this.markFormGroupTouched();
    }
  }

  // Los toggles ahora se manejan dentro del FormField component
  protected togglePasswordVisibility(): void {
    // No necesitamos hacer nada aquí, el FormField maneja su propio state
  }

  protected toggleConfirmPasswordVisibility(): void {
    // No necesitamos hacer nada aquí, el FormField maneja su propio state
  }

  protected getFieldError(fieldName: string): string | null {
    const field = this.signupForm.get(fieldName);

    if (field?.touched && field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} es requerido`;
      }
      if (field.errors['email']) {
        return 'Ingrese un email válido';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(
          fieldName
        )} debe tener al menos ${requiredLength} caracteres`;
      }
    }

    if (
      fieldName === 'confirmPassword' &&
      this.signupForm.errors?.['passwordMismatch'] &&
      field?.touched
    ) {
      return 'Las contraseñas no coinciden';
    }

    return null;
  }

  private getFieldDisplayName(fieldName: string): string {
    const fieldNames: { [key: string]: string } = {
      email: 'Email',
      username: 'Usuario',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
    };
    return fieldNames[fieldName] || fieldName;
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.signupForm.controls).forEach((key) => {
      const control = this.signupForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getters para los controles
  get email() { return this.signupForm.get('email') as FormControl; }
  get username() { return this.signupForm.get('username') as FormControl; }
  get password() { return this.signupForm.get('password') as FormControl; }
  get confirmPassword() { return this.signupForm.get('confirmPassword') as FormControl; }

  // Métodos para obtener errores específicos
  getEmailError(): string | null {
    const control = this.email;
    if (control?.errors && control?.touched) {
      if (control.errors['required']) return 'El email es requerido';
      if (control.errors['email']) return 'Ingresa un email válido';
    }
    return null;
  }

  getUsernameError(): string | null {
    const control = this.username;
    if (control?.errors && control?.touched) {
      if (control.errors['required']) return 'El usuario es requerido';
      if (control.errors['minlength']) return 'El usuario debe tener al menos 3 caracteres';
    }
    return null;
  }

  getPasswordError(): string | null {
    const control = this.password;
    if (control?.errors && control?.touched) {
      if (control.errors['required']) return 'La contraseña es requerida';
      if (control.errors['minlength']) return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
  }

  getConfirmPasswordError(): string | null {
    const control = this.confirmPassword;
    if (control?.errors && control?.touched) {
      if (control.errors['required']) return 'Confirmar contraseña es requerido';
    }
    // Error de contraseñas que no coinciden
    if (this.signupForm.errors?.['passwordMismatch'] && control?.touched) {
      return 'Las contraseñas no coinciden';
    }
    return null;
  }
}
