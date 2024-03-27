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
] satisfies Routes;
