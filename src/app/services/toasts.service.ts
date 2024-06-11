import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastsService {
  constructor(private toastCtrl: ToastController) {}

  showError(message: string) {
    this.toastCtrl
      .create({
        message,
        duration: 3000,
        color: 'danger',
      })
      .then((toast) => {
        toast.present();
      });
  }

  showSuccess(message: string) {
    this.toastCtrl
      .create({
        message,
        duration: 3000,
        color: 'success',
      })
      .then((toast) => {
        toast.present();
      });
  }
}
