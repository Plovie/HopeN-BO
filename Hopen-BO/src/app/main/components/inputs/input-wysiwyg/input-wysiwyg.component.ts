import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-input-wysiwyg',
  templateUrl: './input-wysiwyg.component.html',
  styleUrls: ['./input-wysiwyg.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputWysiwygComponent),
      multi: true
    }
  ]
})
export class InputWysiwygComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() placeholder = '';
  htmlContent;
  editorConfig: AngularEditorConfig;
  destroy$ = new Subject();


  propagateChange = (_: any) => {
  };

  constructor() {
  }

  ngOnInit() {
    this.editorConfig = {
      editable: true,
      spellcheck: true,
      placeholder: this.placeholder,
      translate: 'no',
    };
  }

  writeValue(value) {
    if (value) {
      this.htmlContent = value;
    }
  }

  eventChange(event) {
    this.propagateChange(this.htmlContent);
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
