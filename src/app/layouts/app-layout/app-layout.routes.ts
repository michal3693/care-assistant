import { Routes } from '@angular/router';
import { isNotEmptyPathGuard } from './guards/is-not-empty-path.guard';
import { isCaregiverGuard, isPatientGuard } from './guards/role.guard';

export const appLayoutRoutes: Routes = [
  {
    path: '',
    canActivate: [isNotEmptyPathGuard],
    children: [
      {
        path: 'patient',
        canActivate: [isPatientGuard],
        loadChildren: () =>
          import('../../pages/patient/patient.routes').then(
            (m) => m.patientRoutes
          ),
      },
      {
        path: 'caregiver',
        canActivate: [isCaregiverGuard],
        loadChildren: () =>
          import('../../pages/caregiver/caregiver.routes').then(
            (m) => m.caregiverRoutes
          ),
      },
    ],
  },
];
