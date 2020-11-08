import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ConfigListEnum, ConfigService} from "../../../services/config.service";
import {filter, first, tap} from "rxjs/operators";
import {FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-select-chips',
  templateUrl: './input-select-chips.component.html',
  styleUrls: ['./input-select-chips.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectChipsComponent),
      multi: true
    }
  ]
})
export class InputSelectChipsComponent implements OnInit {
  @Input() index = ''
  @Input() placeholder = ''
  list = null;
  elementsSelected = {}

  selectControl = new FormControl()

  propagateChange = (_: any) => {
  }

  constructor(
    private _config: ConfigService
  ) {
  }

  ngOnInit(): void {
    this._config.getList$(this.index as ConfigListEnum)
      .pipe(
        tap(list => {
          console.log('aaaa', list)
          this.list = list
        })
      ).subscribe()
  }

  onSelect(target) {
    console.log(this.selectControl.value)
    this.elementsSelected[this.selectControl.value] = true
    this.selectControl.setValue('')
    this.propagateChange(Object.keys(this.elementsSelected))
  }

  writeValue(elements: any[]) {
    if (elements && elements.length) {
      elements.forEach(elem => {
        this.elementsSelected[elem] = true
      })
    }
  }

  removeElem(elem) {
    delete this.elementsSelected[elem]
    this.propagateChange(Object.keys(this.elementsSelected))
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
  }

}
