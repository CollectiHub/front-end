import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadChildren: () => import('./pages/public/public.routes'),
  },
] satisfies Routes;
