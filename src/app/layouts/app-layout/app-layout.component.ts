import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
  ],
})
export class AppLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
