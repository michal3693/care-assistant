import { Component } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { take } from 'rxjs';
import { ConnectRequest } from 'src/app/models/connect-request.model';
import { ConnectRequestsService } from 'src/app/services/connect-requests.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-connect-requests',
  templateUrl: './connect-requests.component.html',
  styleUrls: ['./connect-requests.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton],
})
export class ConnectRequestsComponent {
  connectRequests = this.connectRequestsService.connectRequests;

  constructor(
    private connectRequestsService: ConnectRequestsService,
    private toastsService: ToastsService
  ) {}

  acceptRequest(request: ConnectRequest) {
    this.connectRequestsService
      .acceptConnectRequest(request)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.toastsService.showSuccess('Zaakceptowano prośbę o połączenie');
        },
        error: () => {
          this.toastsService.showError(
            'Wystąpił błąd podczas akceptowania prośby o połączenie'
          );
        },
      });
  }
}
