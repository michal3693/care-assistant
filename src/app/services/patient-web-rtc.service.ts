import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class PatientWebRTCService {
  private localStream?: MediaStream;
  private caregiverSocketIdToPeerConnectionMap = new Map<
    string,
    RTCPeerConnection
  >();

  constructor(private socketsService: SocketService) {}

  async startLiveStream(patientId: string) {
    console.log('Starting live stream...');
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    this.listenForConnetions(patientId);
    this.listedForSignals(patientId);
  }

  private listenForConnetions(patientId: string) {
    this.socketsService
      .getSocketInstance()
      ?.on('setupWebRTCConnection', (caregiverSocketId: string) => {
        this.setupConnection(caregiverSocketId, patientId);
      });

    this.socketsService
      .getSocketInstance()
      ?.on('closeWebRTCConnection', (caregiverSocketId: string) => {
        console.log('Closing connection with caregiver:', caregiverSocketId);
        const peerConnection =
          this.caregiverSocketIdToPeerConnectionMap.get(caregiverSocketId);
        if (!peerConnection) return;

        peerConnection.close();
        this.caregiverSocketIdToPeerConnectionMap.delete(caregiverSocketId);
      });
  }

  private listedForSignals(patientId: string) {
    this.socketsService
      .getSocketInstance()
      ?.on('patientWebRTCSignal', (caregiverSocketId: string, signal: any) => {
        this.handleSignal(caregiverSocketId, patientId, signal);
      });
  }

  private setupConnection(caregiverSocketId: string, patientId: string) {
    if (!this.localStream) return;

    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
      ],
    });

    this.localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, this.localStream!);
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendSignalToCaregiver(caregiverSocketId, patientId, {
          type: 'candidate',
          candidate: event.candidate,
        });
      }
    };

    peerConnection.onicecandidateerror = (event) => {
      console.error('ICE Candidate Error:', event);
    };

    this.caregiverSocketIdToPeerConnectionMap.set(
      caregiverSocketId,
      peerConnection
    );
  }

  private handleSignal(
    caregiverSocketId: string,
    patientId: string,
    signal: any
  ) {
    const peerConnection =
      this.caregiverSocketIdToPeerConnectionMap.get(caregiverSocketId);

    if (!peerConnection) return;

    if (signal.type === 'offer') {
      peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
      peerConnection.createAnswer().then((answer) => {
        peerConnection.setLocalDescription(answer);
        this.sendSignalToCaregiver(caregiverSocketId, patientId, {
          type: 'answer',
          sdp: answer.sdp,
        });
      });
    } else if (signal.type === 'answer') {
      peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
    } else if (signal.type === 'candidate') {
      peerConnection.addIceCandidate(new RTCIceCandidate(signal.candidate));
    }
  }

  private sendSignalToCaregiver(
    caregiverSocketId: string,
    patientId: string,
    signal: any
  ) {
    this.socketsService
      .getSocketInstance()
      ?.emit('caregiverWebRTCSignal', caregiverSocketId, patientId, signal);
  }
}
