import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAntecedentsComponent } from './patient-antecedents.component';

describe('PatientAntecedentsComponent', () => {
  let component: PatientAntecedentsComponent;
  let fixture: ComponentFixture<PatientAntecedentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAntecedentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAntecedentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
