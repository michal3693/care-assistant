import { Injectable } from '@angular/core';
import { PatientEventsEnum } from '../models/patient-events.enum';
import { SocketService } from './socket.service';
import { UserService } from './user.service';
import { PatientEvent } from '../models/patient.event';

@Injectable({
  providedIn: 'root',
})
export class PatientSocketsService {
  constructor(
    private socketService: SocketService,
    private userService: UserService
  ) {}

  init(roomId: string) {
    this.socketService.joinToRoom(roomId);
  }

  emitEvent(event: PatientEventsEnum) {
    this.userService.getUserProfile().subscribe((user) => {
      this.socketService
        .getSocketInstance()
        ?.emit('patientEvent', {
          event,
          patientId: user!.id,
          patientName: user!.name,
        } as PatientEvent);
    });
  }
}
