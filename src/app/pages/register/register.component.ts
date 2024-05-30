import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonIcon,
  IonButton,
  IonContent,
  IonInput,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonContent,
    IonInput,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    RouterLink,
  ],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
