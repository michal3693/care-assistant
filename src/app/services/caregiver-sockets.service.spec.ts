import { TestBed } from '@angular/core/testing';

import { CaregiverSocketsService } from './caregiver-sockets.service';

describe('CaregiverSocketsService', () => {
  let service: CaregiverSocketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaregiverSocketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
