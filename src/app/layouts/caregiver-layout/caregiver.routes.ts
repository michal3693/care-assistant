import { Routes } from '@angular/router';

export const caregiverRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./caregiver-layout.component').then(
        (m) => m.CaregiverLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../pages/caregiver/live-view/live-view.component').then(
            (m) => m.LiveViewComponent
          ),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import(
            '../../pages/caregiver/notifications/notifications.component'
          ).then((m) => m.NotificationsComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import(
            '../../pages/caregiver/caregiver-settings/caregiver-settings.component'
          ).then((m) => m.CaregiverSettingsComponent),
      },
    ],
  },
];
