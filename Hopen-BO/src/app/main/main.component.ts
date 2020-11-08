import {Component, OnInit} from '@angular/core';
import {CompaniesService} from "./services/companies.service";
import {ConfigService} from "./services/config.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private _companiesService: CompaniesService,
    private _config: ConfigService
  ) {
  }

  ngOnInit(): void {
    this._companiesService.initCompanies()
      .subscribe()
    this._config.initConfig().subscribe()
  }

}
