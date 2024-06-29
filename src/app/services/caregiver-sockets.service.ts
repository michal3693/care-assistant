import { Injectable } from '@angular/core';
import { ConnectionsService } from './connections.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class CaregiverSocketsService {
  constructor(
    private socketService: SocketService,
    private connectionsService: ConnectionsService
  ) {}

  init() {
    this.connectionsService.getConnections().subscribe((connections) => {
      this.socketService.getUserRooms((rooms) => {
        connections
          .filter((connection) => !rooms.includes(connection.patientId))
          .forEach((connection) => {
            console.log('Joining to room', connection.patientId);
            this.socketService.joinToRoom(connection.patientId);
          });
      });
    });

    this.createListenerForPatientEvents();
  }

  private createListenerForPatientEvents() {
    this.socketService
      .getSocketInstance()
      ?.on('patientEvent', (event: string, patientId: string) => {
        console.log('Received patient event', event, 'from', patientId);
      });
  }
}
