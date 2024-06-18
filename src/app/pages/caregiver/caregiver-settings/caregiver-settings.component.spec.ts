import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CaregiverSettingsComponent } from './caregiver-settings.component';

describe('CaregiverSettingsComponent', () => {
  let component: CaregiverSettingsComponent;
  let fixture: ComponentFixture<CaregiverSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CaregiverSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaregiverSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
