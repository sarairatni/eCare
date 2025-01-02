import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAnalyseBioComponent } from './ajouter-analyse-bio.component';

describe('AjouterAnalyseBioComponent', () => {
  let component: AjouterAnalyseBioComponent;
  let fixture: ComponentFixture<AjouterAnalyseBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterAnalyseBioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterAnalyseBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
