import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadChildren: () => import('./pages/public/public.routes'),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
  },
] satisfies Routes;
