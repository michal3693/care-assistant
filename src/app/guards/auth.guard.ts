import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const isUserAuthGuard: CanActivateFn = () => {
  const auth: Auth = inject(Auth);
  return new Observable<boolean>((observer) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('isUserAuthGuard -> user', user);
      unsubscribe();
      if (user) observer.next(true);
      else {
        const router = inject(Router);
        router.navigate(['/home']);
        observer.next(false);
      }
    });
  });
};

export const isUserNotAuthGuard: CanActivateFn = () => {
  const auth: Auth = inject(Auth);
  return new Observable<boolean>((observer) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('isUserNotAuthGuard -> user', user);
      unsubscribe();
      if (user) {
        const router = inject(Router);
        router.navigate(['']);
        observer.next(false);
      } else observer.next(true);
    });
  });
};
