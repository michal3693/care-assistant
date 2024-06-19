import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConnectRequestsComponent } from './connect-requests.component';

describe('ConnectRequestsComponent', () => {
  let component: ConnectRequestsComponent;
  let fixture: ComponentFixture<ConnectRequestsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ConnectRequestsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
