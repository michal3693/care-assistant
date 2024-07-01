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
          import('../patient-layout/patient.routes').then(
            (m) => m.patientRoutes
          ),
      },
      {
        path: 'caregiver',
        canActivate: [isCaregiverGuard],
        loadChildren: () =>
          import('../caregiver-layout/caregiver.routes').then(
            (m) => m.caregiverRoutes
          ),
      },
    ],
  },
];
