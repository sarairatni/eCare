import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationAntecedantsComponent } from './consultation-antecedants.component';

describe('ConsultationAntecedantsComponent', () => {
  let component: ConsultationAntecedantsComponent;
  let fixture: ComponentFixture<ConsultationAntecedantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationAntecedantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationAntecedantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
