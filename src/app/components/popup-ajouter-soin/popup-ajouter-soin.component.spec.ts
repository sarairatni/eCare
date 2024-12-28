import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAjouterSoinComponent } from './popup-ajouter-soin.component';

describe('PopupAjouterSoinComponent', () => {
  let component: PopupAjouterSoinComponent;
  let fixture: ComponentFixture<PopupAjouterSoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAjouterSoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAjouterSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
