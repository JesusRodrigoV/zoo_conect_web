import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Zoo3DCard } from '@app/shared/components';
import { AuthStore } from '@app/core/store/auth.store';

@Component({
  selector: 'app-hero-section',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSection {
  private readonly authStore = inject(AuthStore);
  protected readonly autenticado = computed(() => !!this.authStore.usuario());
}
