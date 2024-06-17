import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabsMenuService {
  constructor(private userService: UserService) {}

  private patientMenuItems = [
    {
      label: 'Panel',
      route: 'patient',
      icon: 'apps-outline',
    },
    {
      label: 'Prośby połączeń',
      route: 'patient/requests',
      icon: 'person-add-outline',
    },
    {
      label: 'Kalendarz',
      route: 'patient/calendar',
      icon: 'calendar-outline',
    },
    {
      label: 'Ustawienia',
      route: 'patient/settings',
      icon: 'settings-outline',
    },
  ];

  private caregiverMenuItems = [
    {
      label: 'Kamera',
      route: 'caregiver',
      icon: 'videocam-outline',
    },
    {
      label: 'Powiadomienia',
      route: 'caregiver/notifications',
      icon: 'notifications-outline',
    },
    {
      label: 'Kalendarz',
      route: 'caregiver/calendar',
      icon: 'calendar-outline',
    },
    {
      label: 'Ustawienia',
      route: 'caregiver/settings',
      icon: 'settings-outline',
    },
  ];

  async getMenuItems() {
    const user = await firstValueFrom(this.userService.getUserProfile());
    if (!user) return [];

    switch (user.role) {
      case 'patient':
        return this.patientMenuItems;
      case 'caregiver':
        return this.caregiverMenuItems;
      default:
        return [];
    }
  }
}
