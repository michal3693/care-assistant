import { TestBed } from '@angular/core/testing';

import { PatientSocketsService } from './patient-sockets.service';

describe('PatientSocketsService', () => {
  let service: PatientSocketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientSocketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
