import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(
    private _http: HttpClient
  ) {
  }

  searchAddress$(str) {
    str = str.replace(' ', '+')
    return this._http.get('https://api-adresse.data.gouv.fr/search/?q=' + str)
      .pipe(
      )
  }
}
