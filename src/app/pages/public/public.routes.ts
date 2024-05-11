import { Routes } from '@angular/router';

export default [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page'),
  },
  {
    path: 'registration',
    loadComponent: () => import('./registration/registration.page'),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page'),
  },
  {
    path: 'reset-password/:code',
    loadComponent: () => import('./reset-password/reset-password.page'),
  },
] satisfies Routes;
