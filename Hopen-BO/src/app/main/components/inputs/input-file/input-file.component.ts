import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {UploadFileService} from "../../../services/upload-file.service";

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true
    }
  ]
})
export class InputFileComponent implements OnInit, ControlValueAccessor {
  uploading = false;
  @Input() placeholder = ''
  propagateChange = (_: any) => {
  };

  constructor(
    private _uploadFileService: UploadFileService
  ) {
  }

  ngOnInit() {
  }

  onSelectFiles(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const url = reader.result;
        this.propagateChange({file, url});
      };
    }
  }



  writeValue(files: any[]) {

  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }
}
