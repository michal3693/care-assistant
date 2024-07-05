import { TestBed } from '@angular/core/testing';

import { CaregiverWebRtcService } from './caregiver-web-rtc.service';

describe('CaregiverWebRtcService', () => {
  let service: CaregiverWebRtcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaregiverWebRtcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
