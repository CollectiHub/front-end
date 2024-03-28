import { Routes } from '@angular/router';

export default [
  {
    path: 'registration',
    loadComponent: () => import('./registration/registration.page'),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page'),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password.page'),
  },
] satisfies Routes;
