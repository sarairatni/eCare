import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerDpiComponent } from './creer-dpi.component';

describe('CreerDpiComponent', () => {
  let component: CreerDpiComponent;
  let fixture: ComponentFixture<CreerDpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerDpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerDpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
