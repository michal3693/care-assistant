import { Injectable } from '@angular/core';
import { CaregiverSocketsService } from './caregiver-sockets.service';
import { LoginService } from './login.service';
import { takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CaregiverNotificationsService {
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
      .pipe(takeUntil(this.loginService.getLogoutObservable()))
      .subscribe((event) => {
        console.log('Received event', event);
      });
  }
}
