import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  auth: Auth = inject(Auth);
  router: Router = inject(Router);

  private logout$ = new Subject<void>();

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    signOut(this.auth).then(() => {
      this.logout$.next();
      this.router.navigateByUrl('/login');
    });
  }

  getLogoutObservable() {
    return this.logout$.asObservable();
  }
}
