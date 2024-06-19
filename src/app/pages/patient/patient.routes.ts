import { Routes } from '@angular/router';

export const patientRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'connect-requests',
    loadComponent: () =>
      import('./connect-requests/connect-requests.component').then(
        (m) => m.ConnectRequestsComponent
      ),
  },
];
