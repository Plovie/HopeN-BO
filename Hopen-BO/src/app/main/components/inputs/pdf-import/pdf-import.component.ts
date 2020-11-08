import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {debounceTime, takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'app-pdf-import',
  templateUrl: './pdf-import.component.html',
  styleUrls: ['./pdf-import.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdfImportComponent),
      multi: true
    }
  ]
})
export class PdfImportComponent implements OnInit, OnDestroy {
  pdfForm: FormGroup;
  private _destroy$ = new Subject();
  uploading = false;
  @Input() placeholder = ''


  propagateChange = (_: any) => {
  };

  constructor(
    private _fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this._initForm();
    this.pdfForm.valueChanges
      .pipe(
        debounceTime(200),
        tap(() => this.editParent()),
        takeUntil(this._destroy$),
      ).subscribe()
  }

  private _initForm() {
    this.pdfForm = this._fb.group({
      file: ['', Validators.required],
      type: ['menu', Validators.required]
    })
  }

  onSelectFiles(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.pdfForm.get('file').setValue(file);
      };
    }
  }

  editParent() {
    if (this.pdfForm.valid) {
      this.propagateChange(this.pdfForm.value)
    }
  }


  writeValue(pdf: any[]) {
    console.log(pdf)
    if (pdf && !this.pdfForm.value.file) {
      this.pdfForm.patchValue(pdf)

    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

}
