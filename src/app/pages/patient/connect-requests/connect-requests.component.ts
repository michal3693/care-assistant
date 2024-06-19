import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-connect-requests',
  templateUrl: './connect-requests.component.html',
  styleUrls: ['./connect-requests.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton],
})
export class ConnectRequestsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
