import { TestBed } from '@angular/core/testing';

import { PatientWebRTCService } from './patient-web-rtc.service';

describe('WebRTCService', () => {
  let service: PatientWebRTCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientWebRTCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
