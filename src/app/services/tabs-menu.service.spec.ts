import { TestBed } from '@angular/core/testing';

import { TabsMenuService } from './tabs-menu.service';

describe('TabsMenuService', () => {
  let service: TabsMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabsMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
