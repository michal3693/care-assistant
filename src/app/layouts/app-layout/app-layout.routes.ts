import { Routes } from '@angular/router';

export const appLayoutRoutes: Routes = [
  {
    path: 'patient',
    loadChildren: () =>
      import('../../pages/patient/patient.routes').then((m) => m.patientRoutes),
  },
  {
    path: 'caregiver',
    loadChildren: () =>
      import('../../pages/caregiver/caregiver.routes').then(
        (m) => m.caregiverRoutes
      ),
  },
];
