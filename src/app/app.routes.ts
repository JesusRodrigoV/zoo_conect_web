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
];
