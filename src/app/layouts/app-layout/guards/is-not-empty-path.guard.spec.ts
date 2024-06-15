import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isNotEmptyPathGuard } from './is-not-empty-path.guard';

describe('isNotEmptyPathGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isNotEmptyPathGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
