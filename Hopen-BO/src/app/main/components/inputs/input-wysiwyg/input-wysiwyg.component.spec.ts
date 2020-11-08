import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWysiwygComponent } from './input-wysiwyg.component';

describe('InputWysiwygComponent', () => {
  let component: InputWysiwygComponent;
  let fixture: ComponentFixture<InputWysiwygComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputWysiwygComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWysiwygComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
