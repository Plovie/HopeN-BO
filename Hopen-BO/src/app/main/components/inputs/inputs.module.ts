import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputAddressComponent} from './input-address/input-address.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputMultiComponent} from './input-multi/input-multi.component';
import {InputWysiwygComponent} from './input-wysiwyg/input-wysiwyg.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {InputFileComponent} from './input-file/input-file.component';
import {InputSelectChipsComponent} from './input-select-chips/input-select-chips.component';
import { InputTimeComponent } from './input-time/input-time.component';
import { PdfImportComponent } from './pdf-import/pdf-import.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule
  ],
  declarations: [
    InputAddressComponent,
    InputMultiComponent,
    InputWysiwygComponent,
    InputFileComponent,
    InputSelectChipsComponent,
    InputTimeComponent,
    PdfImportComponent],
  exports: [InputAddressComponent,
    InputMultiComponent,
    InputWysiwygComponent,
    InputFileComponent,
    InputSelectChipsComponent,
    InputTimeComponent,
    PdfImportComponent],
})
export class InputsModule {
}
