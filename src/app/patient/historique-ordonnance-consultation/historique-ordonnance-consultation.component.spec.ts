import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueOrdonnanceConsultationComponent } from './historique-ordonnance-consultation.component';

describe('HistoriqueOrdonnanceConsultationComponent', () => {
  let component: HistoriqueOrdonnanceConsultationComponent;
  let fixture: ComponentFixture<HistoriqueOrdonnanceConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueOrdonnanceConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueOrdonnanceConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
