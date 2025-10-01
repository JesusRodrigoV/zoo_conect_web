import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavigationItem {
  readonly text: string;
  readonly icon: string;
  readonly route: string;
  readonly disabled?: boolean;
  readonly badge?: string | number;
}

@Component({
  selector: 'zoo-sidebar-admin-menu',
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-admin-menu.html',
  styleUrl: './sidebar-admin-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarAdminMenu {
  protected readonly navigationItems = signal<NavigationItem[]>([
    {
      text: 'Dashboard',
      icon: 'dashboard',
      route: '/admin/dashboard',
    },
    {
      text: 'Gestión de Usuarios',
      icon: 'group',
      route: '/admin/usuarios',
      badge: '12',
    },
    {
      text: 'Gestión de Animales',
      icon: 'pets',
      route: '/admin/animales',
    },
    {
      text: 'Encuestas',
      icon: 'poll',
      route: '/admin/encuestas',
    },

    {
      text: 'Quizzes',
      icon: 'quiz',
      route: '/admin/quizzes',
    },
    {
      text: 'Reportes',
      icon: 'assessment',
      route: '/admin/reportes',
    },
    /*
    {
      text: 'Configuración',
      icon: 'settings',
      route: '/admin/configuracion'
    }
    */
  ]);
}
