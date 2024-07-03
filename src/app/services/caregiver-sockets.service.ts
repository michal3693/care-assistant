import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PatientEventsEnum } from '../models/patient-events.enum';
import { PatientEvent } from '../models/patient.event';
import { ConnectionsService } from './connections.service';
import { LoginService } from './login.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class CaregiverSocketsService {
  private init$ = new Subject<void>();
  private patientEvent$ = new Subject<PatientEvent>();

  constructor(
    private loginService: LoginService,
    private socketService: SocketService,
    private connectionsService: ConnectionsService
  ) {}

  init() {
    this.connectionsService
      .getConnections()
      .pipe(takeUntil(this.loginService.getLogoutObservable()))
      .subscribe((connections) => {
        this.socketService.getUserRooms((rooms) => {
          connections
            .filter((connection) => !rooms.includes(connection.patientId))
            .forEach((connection) => {
              console.log('Joining to room', connection.patientId);
              this.socketService.joinToRoom(connection.patientId);
            });
        });
      });

    this.init$.next();
    this.createListenerForPatientEvents();
  }

  getInitObservable() {
    return this.init$.asObservable();
  }

  getPatientEventObservable() {
    return this.patientEvent$.asObservable();
  }

  private createListenerForPatientEvents() {
    this.socketService
      .getSocketInstance()
      ?.on('patientEvent', (event: PatientEvent) =>
        this.patientEvent$.next(event)
      );
  }
}
