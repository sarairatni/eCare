import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentsMedComponent } from './antecedents-med.component';

describe('AntecedentsMedComponent', () => {
  let component: AntecedentsMedComponent;
  let fixture: ComponentFixture<AntecedentsMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntecedentsMedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntecedentsMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
