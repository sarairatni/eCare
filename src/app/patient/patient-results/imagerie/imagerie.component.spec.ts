import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagerieComponent } from './imagerie.component';

describe('ImagerieComponent', () => {
  let component: ImagerieComponent;
  let fixture: ComponentFixture<ImagerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagerieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
