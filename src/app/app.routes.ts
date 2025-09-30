import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/layout/layout'),
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      {
        path: 'inicio',
        loadComponent: () => import('./features/home/home'),
      },
      {
        path: 'perfil',
        loadComponent: () => import('./features/profile/profile'),
        canActivate: [authGuard],
      },
      {
        path: 'ajustes',
        loadComponent: () => import('./features/settings/settings'),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '',
    canActivate: [loginGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login'),
      },
      {
        path: 'signup',
        loadComponent: () => import('./features/auth/pages/signup/signup'),
      },
    ],
  },
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found'),
  },
];
