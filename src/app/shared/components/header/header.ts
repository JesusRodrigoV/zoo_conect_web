import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '@app/core/store/auth.store';
import { ProfileButton } from './components/profile-button';
import { LogoImage } from '../logo-image';

export interface NavButton {
  readonly label: string;
  readonly route: string;
  readonly icon?: string;
}

@Component({
  selector: 'zoo-header',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    ProfileButton,
    MatTooltipModule,
    LogoImage,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private authStore = inject(AuthStore);
  readonly autenticado = signal(this.authStore.isAuthenticated());
  readonly isAdmin = signal(this.authStore.isAdmin());

  protected readonly navigationButtons = signal<NavButton[]>([
    {
      label: 'Inicio',
      route: '/',
      icon: 'home'
    },
    {
      label: 'Animales',
      route: '/animales',
      icon: 'pets'
    },
    {
      label: 'Encuestas',
      route: '/encuestas',
      icon: 'poll'
    },
    {
      label: 'Acerca de nosotros',
      route: '/acerca-de',
      icon: 'info'
    }
  ]);

  protected logout(): void {
    this.authStore.logout();
  }
}
