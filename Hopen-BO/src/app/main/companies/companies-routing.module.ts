import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompaniesComponent} from "./companies.component";
import {ListComponent} from "./list/list.component";
import {CrudComponent} from "./crud/crud.component";

const routes: Routes = [
  {
    path: '',
    component: CompaniesComponent,
    children: [
      {path: '', redirectTo: 'liste', pathMatch:'full'},
      {path: 'liste', component: ListComponent},
      {path: 'edition/:id', component: CrudComponent},
      {path: 'creation', component: CrudComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule {
}
