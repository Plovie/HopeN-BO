import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {of, Subject} from "rxjs";
import {debounceTime, map, startWith, switchMap, takeUntil, tap} from "rxjs/operators";
import {CompaniesService} from "../../services/companies.service";
import {CompaniesInterface} from "../../../interfaces/companies";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  searchCtrl = new FormControl('')
  results: CompaniesInterface[] = [];
  private _destroy$ = new Subject();

  constructor(
    private _companiesService: CompaniesService
  ) {
  }

  ngOnInit(): void {

    this.searchCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        switchMap((searchStr: string) => {
          if (searchStr.length > 2) {
            return this._search$(searchStr)
          } else {
            return this._companiesService.getAll()
          }
        }),
        tap((companies)=> this.results = companies),
        takeUntil(this._destroy$),
      ).subscribe()
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _search$(str: string) {
    return this._companiesService.getAll()
      .pipe(
        map((companies) => companies.filter(company => company.name.includes(str)))
      )
  }

}
