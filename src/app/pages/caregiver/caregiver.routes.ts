import { Routes } from '@angular/router';

export const caregiverRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./live-view/live-view.component').then(
        (m) => m.LiveViewComponent
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./caregiver-settings/caregiver-settings.component').then(
        (m) => m.CaregiverSettingsComponent
      ),
  },
];
