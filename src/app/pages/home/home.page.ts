import { Component } from '@angular/core';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { fadeInOut } from '../../animations/fadeInOut.animation';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    RouterLink,
  ],
  animations: [fadeInOut(500, 300), fadeInOut(500, 0, 'fadeInOutDelayed')],
})
export class HomePage {
  constructor() {}
}
