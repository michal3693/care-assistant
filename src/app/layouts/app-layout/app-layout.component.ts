import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonContent, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  standalone: true,
  imports: [IonContent, IonRouterOutlet, RouterOutlet],
})
export class AppLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
