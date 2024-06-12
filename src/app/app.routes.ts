import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.routes').then((m) => m.loginRoutes),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.routes').then((m) => m.registerRoutes),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/app-layout/app-layout.component').then(
        (m) => m.AppLayoutComponent
      ),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/app-layout/app-layout.routes').then(
            (m) => m.appLayoutRoutes
          ),
      },
    ],
  },
];
