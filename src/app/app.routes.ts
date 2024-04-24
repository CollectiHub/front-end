import { Routes } from '@angular/router';
import { authGuard } from '@features/auth/guards/auth.guard';

export default [
  {
    path: '',
    loadChildren: () => import('./pages/public/public.routes'),
  },
  {
    path: '',
    canMatch: [authGuard],
    loadChildren: () => import('./pages/private/private.routes'),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
  },
] satisfies Routes;
