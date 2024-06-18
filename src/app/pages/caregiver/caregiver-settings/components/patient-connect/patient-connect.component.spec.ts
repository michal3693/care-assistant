import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientConnectComponent } from './patient-connect.component';

describe('PatientConnectComponent', () => {
  let component: PatientConnectComponent;
  let fixture: ComponentFixture<PatientConnectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PatientConnectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
