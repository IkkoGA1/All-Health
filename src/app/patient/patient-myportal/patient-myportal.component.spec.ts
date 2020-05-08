import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMyportalComponent } from './patient-myportal.component';

describe('PatientMyportalComponent', () => {
  let component: PatientMyportalComponent;
  let fixture: ComponentFixture<PatientMyportalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientMyportalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMyportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
