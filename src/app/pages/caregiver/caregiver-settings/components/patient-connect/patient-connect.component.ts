import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonIcon, IonInput } from '@ionic/angular/standalone';
import {
  ConnectRequestsService,
  SendConnectRequestResponsesEnum,
} from 'src/app/services/connect-requests.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-patient-connect',
  templateUrl: './patient-connect.component.html',
  styleUrls: ['./patient-connect.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, IonIcon, IonInput, IonButton],
})
export class PatientConnectComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private connectRequestsService: ConnectRequestsService,
    private toastsService: ToastsService
  ) {}

  sendConnectRequest() {
    if (this.emailFormControl.invalid) {
      this.toastsService.showError('To nie jest prawidłowy adres e-mail');
      return;
    }

    this.connectRequestsService
      .sendConnectRequest(this.emailFormControl.value!)
      .subscribe({
        next: () => {
          this.toastsService.showSuccess('Zaproszenie wysłane');
          this.emailFormControl.reset();
        },
        error: (error) => {
          switch (error) {
            case SendConnectRequestResponsesEnum.USER_NOT_FOUND:
              this.toastsService.showError('Nie znaleziono użytkownika');
              break;
            default:
              this.toastsService.showError('Wystąpił błąd');
              break;
          }
        },
      });
  }
}
