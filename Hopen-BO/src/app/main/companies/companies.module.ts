import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompaniesComponent} from './companies.component';
import {ListComponent} from './list/list.component';
import {CrudComponent} from './crud/crud.component';
import {CompaniesRoutingModule} from "./companies-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputsModule} from "../components/inputs/inputs.module";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputsModule,
    CompaniesRoutingModule,
  ],
  declarations: [CompaniesComponent, ListComponent, CrudComponent],
})
export class CompaniesModule {
}
