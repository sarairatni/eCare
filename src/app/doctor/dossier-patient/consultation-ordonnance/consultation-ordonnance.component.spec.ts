import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationOrdonnanceComponent } from './consultation-ordonnance.component';

describe('ConsultationOrdonnanceComponent', () => {
  let component: ConsultationOrdonnanceComponent;
  let fixture: ComponentFixture<ConsultationOrdonnanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationOrdonnanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
