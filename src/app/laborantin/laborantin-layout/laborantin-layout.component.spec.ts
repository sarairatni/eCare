import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborantinLayoutComponent } from './laborantin-layout.component';

describe('LaborantinLayoutComponent', () => {
  let component: LaborantinLayoutComponent;
  let fixture: ComponentFixture<LaborantinLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaborantinLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaborantinLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
