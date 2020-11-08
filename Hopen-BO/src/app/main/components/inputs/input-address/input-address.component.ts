import {Component, ElementRef, forwardRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AddressService} from "../../../services/address.service";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrls: ['./input-address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAddressComponent),
      multi: true
    }
  ]
})
export class InputAddressComponent implements OnInit, OnDestroy, ControlValueAccessor {
  results = [];
  searchControl = new FormControl()
  onSelect = false;
  onEdit = false;
  @ViewChild('addressResult') addressResult: ElementRef;
  private _destroy$ = new Subject();
  propagateChange = (_: any) => {
  }

  constructor(
    private _renderer: Renderer2,
    private _addressService: AddressService
  ) {
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        map((str) => {
          if(this.onSelect ) {
            this.onSelect = false;
            this.results = []
            return ''
          }
          if(this.onEdit ) {
            this.onEdit = false;
            this.results = []
            return ''
          }
          return str
        }),
        filter(str => str.length > 2  ),
        debounceTime(300),
        switchMap((str) => this._addressService.searchAddress$(str)),
        tap((res: any) => {
          if (res && res.features && res.features.length) {
            this.positionResults(res.features.length)
            this.results = res.features
          } else {
            this.results = []
          }
        }),
        takeUntil(this._destroy$),
      ).subscribe()
  }

  writeValue(address: any) {
    if(address) {
      this.searchControl.setValue(address.properties.label)
      this.onEdit = true;
    }
  }

  select(address) {
    this.onSelect = true;
    this.searchControl.setValue(address.properties.label)
    this.results = []
    this.propagateChange(address)
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  positionResults(numberResults) {
    this._renderer.setStyle(this.addressResult.nativeElement, 'bottom', 30*numberResults+'px')
  }

}
