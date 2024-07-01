import { Routes } from '@angular/router';

export const patientRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./patient-layout.component').then(
        (m) => m.PatientLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../pages/patient/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'connect-requests',
        loadComponent: () =>
          import(
            '../../pages/patient/connect-requests/connect-requests.component'
          ).then((m) => m.ConnectRequestsComponent),
      },
    ],
  },
];
