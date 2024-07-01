import { Injectable, signal } from '@angular/core';
import { CaregiverSocketsService } from './caregiver-sockets.service';
import { LoginService } from './login.service';
import { takeUntil, tap } from 'rxjs';
import { PatientEvent } from '../models/patient.event';

@Injectable({
  providedIn: 'root',
})
export class CaregiverNotificationsService {
  notifications = signal<PatientEvent[]>([]);

  constructor(
    private loginService: LoginService,
    private caregiverSocketsService: CaregiverSocketsService
  ) {
    caregiverSocketsService.getInitObservable().subscribe(() => {
      this.listenForPatientEvents();
    });
  }

  listenForPatientEvents() {
    this.caregiverSocketsService
      .getPatientEventObservable()
      .pipe(
        takeUntil(
          this.loginService
            .getLogoutObservable()
            .pipe(tap(() => this.notifications.set([])))
        )
      )
      .subscribe((event) => {
        console.log('New patient event', event);
        this.notifications.update((notifications) => [...notifications, event]);
      });
  }
}
