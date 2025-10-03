import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/layout/layout'),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home'),
      },
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
      {
        path: 'encuestas',
        loadComponent: () =>
          import('./features/encuestas/screens/encuestas/encuestas'),
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
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/layout/admin-layout/admin-layout'),
    canActivate: [authGuard],
    children: [
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/admin/screens/gestion-usuarios/gestion-usuarios'),
      },
      {
        path: 'animales',
        loadComponent: () =>
          import('./features/admin/screens/gestion-animales/gestion-animales'),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/screens/dashboard/dashboard'),
      },
      {
        path: 'encuestas',
        loadComponent: () =>
          import(
            './features/admin/screens/gestion-encuestas/gestion-encuestas'
          ),
      },
      {
        path: 'quizzes',
        loadComponent: () =>
          import('./features/admin/screens/gestion-quizzes/gestion-quizzes'),
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('./features/admin/screens/gestion-reportes/gestion-reportes'),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },

  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found'),
  },
];
