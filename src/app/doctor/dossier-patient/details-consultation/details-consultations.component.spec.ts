import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsConsultationsComponent } from './details-consultations.component';

describe('DetailsConsultationsComponent', () => {
  let component: DetailsConsultationsComponent;
  let fixture: ComponentFixture<DetailsConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsConsultationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
