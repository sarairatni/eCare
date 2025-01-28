import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleConsultataionComponent } from './nouvelle-consultataion.component';

describe('NouvelleConsultataionComponent', () => {
  let component: NouvelleConsultataionComponent;
  let fixture: ComponentFixture<NouvelleConsultataionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelleConsultataionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvelleConsultataionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
