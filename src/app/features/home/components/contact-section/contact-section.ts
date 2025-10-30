import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-contact-section',
  imports: [
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
  ],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSection {
  readonly submitContact = output<void>();

  protected onSubmitContact(): void {
    this.submitContact.emit();
  }
}
