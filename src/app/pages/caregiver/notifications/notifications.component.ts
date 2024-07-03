import { Component } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { patientEventDescriptionMap } from 'src/app/maps/patient-event-description.map';
import { patientEventIconMap } from 'src/app/maps/patient-event-icon.map';
import { patientEventTitleMap } from 'src/app/maps/patient-event-title.map';
import { PatientEventsEnum } from 'src/app/models/patient-events.enum';
import { ReversePipe } from 'src/app/pipes/reverse.pipe';
import { CaregiverNotificationsService } from 'src/app/services/caregiver-notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [IonIcon, ReversePipe],
})
export class NotificationsComponent {
  notifications = this.caregiverNotificationsService.notifications;
  PatientEventsEnum = PatientEventsEnum;
  patientEventIconMap = patientEventIconMap;
  patientEventTitleMap = patientEventTitleMap;
  patientEventDescriptionMap = patientEventDescriptionMap;

  constructor(
    private caregiverNotificationsService: CaregiverNotificationsService
  ) {}
}
