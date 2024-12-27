import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueConsultationBioradioComponent } from './historique-consultation-bioradio.component';

describe('HistoriqueConsultationBioradioComponent', () => {
  let component: HistoriqueConsultationBioradioComponent;
  let fixture: ComponentFixture<HistoriqueConsultationBioradioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueConsultationBioradioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueConsultationBioradioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
