import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./private.page'),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadComponent: () => import('./home/home.page'),
          },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadComponent: () => import('./profile/profile.page'),
          },
        ],
      },
    ],
  },
] satisfies Routes;
