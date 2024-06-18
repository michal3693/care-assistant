import { Component, OnInit } from '@angular/core';
import { IonIcon, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-patient-connect',
  templateUrl: './patient-connect.component.html',
  styleUrls: ['./patient-connect.component.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonButton],
})
export class PatientConnectComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
