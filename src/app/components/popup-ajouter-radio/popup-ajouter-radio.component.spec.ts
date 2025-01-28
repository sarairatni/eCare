import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAjouterRadioComponent } from './popup-ajouter-radio.component';

describe('PopupAjouterRadioComponent', () => {
  let component: PopupAjouterRadioComponent;
  let fixture: ComponentFixture<PopupAjouterRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAjouterRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAjouterRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
