import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMultiComponent } from './input-multi.component';

describe('InputMultiComponent', () => {
  let component: InputMultiComponent;
  let fixture: ComponentFixture<InputMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputMultiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
