import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { ConnectRequestsService } from 'src/app/services/connect-requests.service';
import { PatientSocketsService } from 'src/app/services/patient-sockets.service';
import { PatientWebRTCService } from 'src/app/services/patient-web-rtc.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-layout',
  templateUrl: './patient-layout.component.html',
  styleUrls: ['./patient-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonRouterOutlet],
})
export class PatientLayoutComponent {
  userId?: string;

  constructor(
    private userService: UserService,
    private connectRequestsService: ConnectRequestsService,
    private socketService: SocketService,
    private patientSocketsService: PatientSocketsService,
    private webrtcServcice: PatientWebRTCService
  ) {}

  ionViewWillEnter() {
    console.log('Patient layout init');
    this.userService.getUserProfile().subscribe((user) => {
      this.userId = user?.id;
      this.connectToSocketServer();
      this.connectRequestsService.loadConnectRequestsGlobally();
    });
  }

  private connectToSocketServer() {
    this.socketService.connectToSocketServer().subscribe(() => {
      this.patientSocketsService.init(this.userId!);
      this.webrtcServcice.startLiveStream(this.userId!);
    });
  }
}
