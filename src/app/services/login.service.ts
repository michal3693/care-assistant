import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { ConnectRequestsService } from './connect-requests.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  auth: Auth = inject(Auth);
  userService: UserService = inject(UserService);
  connectRequestsService: ConnectRequestsService = inject(
    ConnectRequestsService
  );
  router: Router = inject(Router);

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    signOut(this.auth).then(() => {
      this.userService.clearUserProfile();
      this.connectRequestsService.destroyConnectRequestsSubscription();
      this.router.navigateByUrl('/login');
    });
  }
}
