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

  private activeConnections: string[] = [];

  init() {
    this.connectionsService.getConnections().subscribe((connections) => {
      connections
        .filter((connection) => !this.activeConnections.includes(connection.id))
        .forEach((connection) => {
          this.socketService.joinToRoom(connection.id);
          this.activeConnections.push(connection.id);
        });
    });
  }
}
