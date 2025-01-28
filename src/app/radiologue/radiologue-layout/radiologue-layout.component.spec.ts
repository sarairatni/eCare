import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologueLayoutComponent } from './radiologue-layout.component';

describe('RadiologueLayoutComponent', () => {
  let component: RadiologueLayoutComponent;
  let fixture: ComponentFixture<RadiologueLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiologueLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiologueLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
