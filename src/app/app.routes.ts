import { Routes } from '@angular/router';
import { loginGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    canActivate: [loginGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/components/login/login'),
      },
      {
        path: 'signup',
        loadComponent: () => import('./features/auth/components/signup/signup'),
      },
    ],
  },
];
