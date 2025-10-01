import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'zoo-form-field',
  imports: [ReactiveFormsModule],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField {
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly type = input<'text' | 'email' | 'password'>('text');
  readonly control = input.required<FormControl>();
  readonly errorMessage = input<string | null>(null);
  readonly showPasswordToggle = input<boolean>(false);

  readonly passwordVisible = signal(false);
  readonly togglePassword = output<void>();

  protected togglePasswordVisibility(): void {
    this.passwordVisible.update(visible => !visible);
    this.togglePassword.emit();
  }

  protected getInputType(): string {
    if (this.type() === 'password' && this.showPasswordToggle()) {
      return this.passwordVisible() ? 'text' : 'password';
    }
    return this.type();
  }
}