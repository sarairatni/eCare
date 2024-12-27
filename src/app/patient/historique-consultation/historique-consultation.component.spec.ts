import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueConsultationComponent } from './historique-consultation.component';

describe('HistoriqueConsultationComponent', () => {
  let component: HistoriqueConsultationComponent;
  let fixture: ComponentFixture<HistoriqueConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
