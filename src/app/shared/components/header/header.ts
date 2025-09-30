import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@app/core/store/auth.store';
import { ProfileButton } from './components/profile-button';

@Component({
  selector: 'zoo-header',
  imports: [MatButtonModule, MatIconModule, RouterLink, ProfileButton, MatTooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private authStore = inject(AuthStore);
  readonly autenticado = signal(this.authStore.isAuthenticated());
  readonly isAdmin = signal(this.authStore.isAdmin());

  protected logout(): void {
    this.authStore.logout();
  }
}
