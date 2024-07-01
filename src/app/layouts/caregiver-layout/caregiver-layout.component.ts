import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { CaregiverNotificationsService } from 'src/app/services/caregiver-notifications.service';
import { CaregiverSocketsService } from 'src/app/services/caregiver-sockets.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-caregiver-layout',
  templateUrl: './caregiver-layout.component.html',
  styleUrls: ['./caregiver-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonRouterOutlet],
})
export class CaregiverLayoutComponent {
  constructor(
    private socketService: SocketService,
    private caregiverSocketsService: CaregiverSocketsService,
    private caregiverNotificationsService: CaregiverNotificationsService
  ) {}

  ionViewWillEnter() {
    console.log('Caregiver layout init');
    this.connectToSocketServer();
  }

  private connectToSocketServer() {
    this.socketService.connectToSocketServer().subscribe(() => {
      this.caregiverSocketsService.init();
    });
  }
}
