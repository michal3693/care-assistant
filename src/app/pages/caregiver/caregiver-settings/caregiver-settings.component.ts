import { Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { PatientConnectComponent } from './components/patient-connect/patient-connect.component';

@Component({
  selector: 'app-caregiver-settings',
  templateUrl: './caregiver-settings.component.html',
  styleUrls: ['./caregiver-settings.component.scss'],
  standalone: true,
  imports: [IonIcon, PatientConnectComponent],
})
export class CaregiverSettingsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
