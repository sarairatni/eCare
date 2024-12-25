import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFiveComponent } from './section-five.component';

describe('SectionFiveComponent', () => {
  let component: SectionFiveComponent;
  let fixture: ComponentFixture<SectionFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
