import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { PatientEventsEnum } from 'src/app/models/patient-events.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonIcon],
})
export class DashboardComponent implements OnInit {
  PatientEventsEnum = PatientEventsEnum;

  constructor() {}

  ngOnInit() {}

  emitPatientEvent(event: PatientEventsEnum) {
    console.log('emitPatientEvent', event);
  }
}
