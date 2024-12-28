import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpiLayoutComponent } from './dpi-layout.component';

describe('DpiLayoutComponent', () => {
  let component: DpiLayoutComponent;
  let fixture: ComponentFixture<DpiLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpiLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
