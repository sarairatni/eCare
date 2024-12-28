import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatsMedComponent } from './resultats-med.component';

describe('ResultatsMedComponent', () => {
  let component: ResultatsMedComponent;
  let fixture: ComponentFixture<ResultatsMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatsMedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatsMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
