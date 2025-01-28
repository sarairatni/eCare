import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationBilanComponent } from './consultation-bilan.component';

describe('ConsultationBilanComponent', () => {
  let component: ConsultationBilanComponent;
  let fixture: ComponentFixture<ConsultationBilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationBilanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationBilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
