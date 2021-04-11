import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinningNumberComponent } from './spinning-number.component';

describe('SpinningNumberComponent', () => {
  let component: SpinningNumberComponent;
  let fixture: ComponentFixture<SpinningNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinningNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinningNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
