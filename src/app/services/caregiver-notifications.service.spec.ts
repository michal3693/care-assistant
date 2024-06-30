import { TestBed } from '@angular/core/testing';

import { CaregiverNotificationsService } from './caregiver-notifications.service';

describe('CaregiverNotificationsService', () => {
  let service: CaregiverNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaregiverNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
