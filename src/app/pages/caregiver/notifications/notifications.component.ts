import { Component } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { CaregiverNotificationsService } from 'src/app/services/caregiver-notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [IonIcon],
})
export class NotificationsComponent {
  constructor(
    private caregiverNotificationsService: CaregiverNotificationsService
  ) {}
}
