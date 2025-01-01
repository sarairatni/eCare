import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnancesPatientComponent } from './ordonnances-patient.component';

describe('OrdonnancesPatientComponent', () => {
  let component: OrdonnancesPatientComponent;
  let fixture: ComponentFixture<OrdonnancesPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdonnancesPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnancesPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
