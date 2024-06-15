import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isPatientGuard } from './role.guard';

describe('isPatientGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isPatientGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
