import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanBioradioComponent } from './bilan-bioradio.component';

describe('BilanBioradioComponent', () => {
  let component: BilanBioradioComponent;
  let fixture: ComponentFixture<BilanBioradioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilanBioradioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanBioradioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
