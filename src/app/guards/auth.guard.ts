import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const isUserAuthGuard: CanActivateFn = () => {
  const auth: Auth = inject(Auth);
  const router = inject(Router);

  return new Observable<boolean>((observer) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('isUserAuthGuard -> user', user);
      unsubscribe();
      if (user) observer.next(true);
      else {
        router.navigate(['/home']);
        observer.next(false);
      }
    });
  });
};

export const isUserNotAuthGuard: CanActivateFn = () => {
  const auth: Auth = inject(Auth);
  const router = inject(Router);

  return new Observable<boolean>((observer) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('isUserNotAuthGuard -> user', user);
      unsubscribe();
      if (user) {
        router.navigate(['']);
        observer.next(false);
      } else observer.next(true);
    });
  });
};
