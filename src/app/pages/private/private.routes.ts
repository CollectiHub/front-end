import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./private.page'),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'collection',
      },
      {
        path: 'collection',
        children: [
          {
            path: '',
            loadComponent: () => import('./collection/collection.page'),
          },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('./profile/profile.routes'),
          },
        ],
      },
    ],
  },
] satisfies Routes;
