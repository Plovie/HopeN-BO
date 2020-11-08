import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectChipsComponent } from './input-select-chips.component';

describe('InputSelectChipsComponent', () => {
  let component: InputSelectChipsComponent;
  let fixture: ComponentFixture<InputSelectChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSelectChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSelectChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
