import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.routes').then((m) => m.registerRoutes),
  },
];
