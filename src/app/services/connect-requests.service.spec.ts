import { TestBed } from '@angular/core/testing';

import { ConnectRequestsService } from './connect-requests.service';

describe('ConnectRequestsService', () => {
  let service: ConnectRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
