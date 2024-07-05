import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class CaregiverWebRtcService {
  constructor(private socketService: SocketService) {}

  listenForSignals(callback: (patientId: string, signal: any) => void) {
    this.socketService
      .getSocketInstance()
      ?.on('caregiverWebRTCSignal', (patientId: string, signal: any) =>
        callback(patientId, signal)
      );
  }

  setupConnectionOnPatient(patientId: string) {
    this.socketService
      .getSocketInstance()
      ?.emit('setupWebRTCConnection', patientId);
  }

  closeConnectionOnPatient(patientId: string) {
    this.socketService
      .getSocketInstance()
      ?.emit('closeWebRTCConnection', patientId);
  }

  sendSignalToPatient(patientId: string, signal: any) {
    this.socketService
      .getSocketInstance()
      ?.emit('patientWebRTCSignal', patientId, signal);
  }

  async createOffer(patientId: string, peerConnection: RTCPeerConnection) {
    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await peerConnection.setLocalDescription(offer);
    this.sendSignalToPatient(patientId, { type: 'offer', sdp: offer.sdp });
  }
}
