import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { RoleEnum } from 'src/app/models/role.enum';
import { UserService } from 'src/app/services/user.service';

export const isPatientGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(UserService)
    .getUserProfile()
    .pipe(
      map((user) =>
        user?.role === RoleEnum.Patient
          ? true
          : router.parseUrl(user?.role as string)
      )
    );
};

export const isCaregiverGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(UserService)
    .getUserProfile()
    .pipe(
      map((user) =>
        user?.role === RoleEnum.Caregiver
          ? true
          : router.parseUrl(user?.role as string)
      )
    );
};
