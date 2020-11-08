import {Component, forwardRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTimeComponent),
      multi: true
    }
  ]
})
export class InputTimeComponent implements OnInit {
  timeGroup: FormGroup;
  hours = [];
  minutes = [];
  propagateChange = (_: any) => {
  };

  constructor(
    private _fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initData()
    this.initForm()
  }

  initData() {
    for (let i = 0; i < 24; i++) {
      if (i < 10) {
        this.hours.push('0' + i)
      } else {
        this.hours.push(i)
      }
    }
    for (let i = 0; i < 60; i++) {
      if (i < 10) {
        this.minutes.push('0' + i)
      } else {
        this.minutes.push(i)
      }
    }
  }

  initForm() {
    this.timeGroup = this._fb.group({
      hour: ['', Validators.required],
      minute: ['', Validators.required]
    })
  }

  onSelect() {
    if (this.timeGroup.valid) {
      this.propagateChange(this.timeGroup.value)
    }
  }

  writeValue(time: any) {
    if (time) {
      this.timeGroup.patchValue(time)
    }

  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

}
