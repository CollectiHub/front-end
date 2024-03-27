import { Routes } from '@angular/router';

export default [
  {
    path: 'registration',
    loadComponent: () => import('./registration/registration.page'),
  },
] satisfies Routes;
