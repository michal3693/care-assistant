import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { PatientEventsEnum } from 'src/app/models/patient-events.enum';
import { PatientSocketsService } from 'src/app/services/patient-sockets.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonIcon],
})
export class DashboardComponent {
  PatientEventsEnum = PatientEventsEnum;

  constructor(private patientSocketsService: PatientSocketsService) {}

  emitPatientEvent(event: PatientEventsEnum) {
    this.patientSocketsService.emitEvent(event);
  }
}
