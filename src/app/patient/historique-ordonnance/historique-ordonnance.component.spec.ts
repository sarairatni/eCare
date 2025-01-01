import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueOrdonnanceComponent } from './historique-ordonnance.component';

describe('HistoriqueOrdonnanceComponent', () => {
  let component: HistoriqueOrdonnanceComponent;
  let fixture: ComponentFixture<HistoriqueOrdonnanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueOrdonnanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
