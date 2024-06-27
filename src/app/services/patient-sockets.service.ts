import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class PatientSocketsService {
  constructor(private socketService: SocketService) {}

  init(roomId: string) {
    this.socketService.joinToRoom(roomId);
  }
}
