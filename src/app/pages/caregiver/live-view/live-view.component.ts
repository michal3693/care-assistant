import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import { Connection } from 'src/app/models/connection.model';
import { CaregiverWebRtcService } from 'src/app/services/caregiver-web-rtc.service';
import { ConnectionsService } from 'src/app/services/connections.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss'],
  standalone: true,
})
export class LiveViewComponent implements OnInit, OnDestroy {
  @ViewChildren('patientVideo') patientVideos!: QueryList<ElementRef>;

  connections: Connection[] = [];
  patientIdToPeerConnectionMap = new Map<string, RTCPeerConnection>();

  constructor(
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
    private loginService: LoginService,
    private connectionsService: ConnectionsService,
    private caregiverWebRtcService: CaregiverWebRtcService
  ) {}

  ngOnInit() {
    console.log('Live view init');
    setTimeout(() => {
      console.log('Setting up connections');
      this.listenForSignals();
      this.listenForConnections();
    }, 5000);
  }

  ngOnDestroy() {
    Array.from(this.patientIdToPeerConnectionMap.entries()).forEach(
      ([patientId, peerConnection]) => {
        peerConnection.close();
        this.caregiverWebRtcService.closeConnectionOnPatient(patientId);
      }
    );

    this.patientIdToPeerConnectionMap.clear();
    this.connections = [];
  }

  private listenForSignals() {
    this.caregiverWebRtcService.listenForSignals((patientId, signal) => {
      const peerConnection = this.patientIdToPeerConnectionMap.get(patientId);
      if (!peerConnection) return;

      if (signal.type === 'answer') {
        peerConnection.setRemoteDescription(signal);
      } else if (signal.type === 'candidate') {
        peerConnection.addIceCandidate(signal.candidate);
      }
    });
  }

  private listenForConnections() {
    const connectionsSub = this.connectionsService
      .getConnections()
      .pipe(takeUntil(this.loginService.getLogoutObservable()))
      .subscribe((connections) => {
        this.connections = connections;
        connections
          .filter(
            (connection) =>
              !Array.from(this.patientIdToPeerConnectionMap.keys()).includes(
                connection.patientId
              )
          )
          .forEach((connection) => {
            this.setupConnection(connection.patientId);
          });
      });
    this.destroyRef.onDestroy(() => connectionsSub.unsubscribe());
  }

  private setupConnection(patientId: string) {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
      ],
    });
    this.patientIdToPeerConnectionMap.set(patientId, peerConnection);
    this.caregiverWebRtcService.setupConnectionOnPatient(patientId);
    this.cdr.detectChanges();

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.caregiverWebRtcService.sendSignalToPatient(patientId, {
          type: 'candidate',
          candidate: event.candidate,
        });
      }
    };

    peerConnection.onicecandidateerror = (event) => {
      console.error('ICE Candidate Error:', event);
    };

    peerConnection.ontrack = (event) => {
      const videoElement = this.patientVideos.find(
        (_, index) => this.connections[index].patientId === patientId
      );
      if (videoElement) {
        videoElement.nativeElement.srcObject = event.streams[0];
      }
    };
    peerConnection.createDataChannel('dataChannel');
    this.caregiverWebRtcService.createOffer(patientId, peerConnection);
  }
}
