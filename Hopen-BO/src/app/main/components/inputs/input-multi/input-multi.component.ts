import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-multi',
  templateUrl: './input-multi.component.html',
  styleUrls: ['./input-multi.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMultiComponent),
      multi: true
    }
  ]
})
export class InputMultiComponent implements OnInit, ControlValueAccessor {
  multi = []
  addCtrl = new FormControl('')
  @Input() placeholder = ''
  propagateChange = (_: any) => {
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  writeValue(multi: any) {
    if (multi && multi.length) {
      this.multi = multi
    }
  }

  add() {
    if (this.addCtrl.value) {
      this.multi.push(this.addCtrl.value)
      this.addCtrl.setValue('')
      this.propagateChange(this.multi)
    }
  }

  remove(index) {
    this.multi.splice(index, 1)
    this.propagateChange(this.multi)
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
  }


}
