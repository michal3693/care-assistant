import { Injectable } from '@angular/core';
import { PatientEventsEnum } from '../models/patient-events.enum';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class PatientSocketsService {
  constructor(private socketService: SocketService) {}

  init(roomId: string) {
    this.socketService.joinToRoom(roomId);
  }

  emitEvent(event: PatientEventsEnum) {
    this.socketService.getSocketInstance()?.emit('patientEvent', event);
  }
}
