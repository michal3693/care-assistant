import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

export const isNotEmptyPathGuard: CanActivateFn = (route, state) => {
  if (state.url !== '/') return true;
  else {
    const router = inject(Router);
    return inject(UserService)
      .getUserProfile()
      .pipe(map((user) => router.parseUrl(user?.role || '/home')));
  }
};
