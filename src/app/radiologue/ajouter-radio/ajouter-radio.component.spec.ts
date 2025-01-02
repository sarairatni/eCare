import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterRadioComponent } from './ajouter-radio.component';

describe('AjouterRadioComponent', () => {
  let component: AjouterRadioComponent;
  let fixture: ComponentFixture<AjouterRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
