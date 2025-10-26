import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  computed,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '@app/core/store/auth.store';
import { ProfileButton } from './components/profile-button';
import { LogoImage } from '../logo-image';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { NotificationButton } from './components/notification-button/notification-button';
import { DrawerModule } from 'primeng/drawer';

export interface NavButton {
  readonly label: string;
  readonly route: string;
  readonly icon?: string;
  readonly disabled?: boolean;
  readonly comingSoon?: boolean;
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
    ButtonModule,
    OverlayBadgeModule,
    NotificationButton,
    DrawerModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private authStore = inject(AuthStore);
  readonly autenticado = computed(() => this.authStore.isAuthenticated());
  readonly isAdmin = computed(() => this.authStore.isAdmin());
  
  protected menuVisible = signal(false);
  
  protected showMenu(show: boolean) {
    this.menuVisible.set(show);
  }

  protected readonly navigationButtons = signal<NavButton[]>([
    {
      label: 'Inicio',
      route: '/',
      icon: 'home',
    },
    {
      label: 'Animales',
      route: '/animales',
      icon: 'pets'
    },
    {
      label: 'Encuestas',
      route: '/encuestas',
      icon: 'poll',
    },
    {
      label: 'Acerca de nosotros',
      route: '/acerca-de',
      icon: 'info',
      disabled: true,
      comingSoon: true
    },
  ]);

  protected logout(): void {
    this.authStore.logout();
  }
}
