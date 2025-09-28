import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthStore } from '@app/core/store/auth.store';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Login {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  loading = this.authStore.loading;
  error = this.authStore.error;

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      await this.authStore.login(email, password);
    } else {
      this.markFormGroupTouched();
    }
  }

  clearError() {
    this.authStore.clearError();
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  // Getters para validación
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
