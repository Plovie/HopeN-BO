import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject, from, Observable} from "rxjs";
import {CompaniesInterface} from "../../interfaces/companies";
import {filter, first, map, switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private _companiesCache$: BehaviorSubject<CompaniesInterface[]> = new BehaviorSubject(null)

  constructor(
    private _afs: AngularFirestore
  ) {
  }


  initCompanies() {
    return this._afs.collection('companies').get()
      .pipe(
        first(),
        map((snap) => {
          return snap.docs.map(doc => doc.data())
        }),
        tap((companies: CompaniesInterface[]) => this._companiesCache$.next(companies))
      )
  }

  getAll() {
    return this._companiesCache$
      .pipe(
        filter((val) => !!val)
      )
  }

  getOneCompanyByUid$(uid: string) {
    return this.getAll()
      .pipe(
        map((all) => all.find(company => company.uid === uid))
      )
  }

  createCompany(company: CompaniesInterface): Observable<string> {
    const copy = {...company}
    delete copy.logo;
    delete copy.picture;
    delete copy.pdf;
    return from(this._afs.collection('companies').add(copy))
      .pipe(
        switchMap(ref => {
          return from(this._afs.collection('companies').doc(ref.id).set({uid: ref.id}, {merge: true}))
            .pipe(
              map(() => ref.id)
            )

        })
      )
  }

  updateCompany(uid: string, data) {
    return from(this._afs.collection('companies').doc(uid).set(data, {merge: true}))
  }

}
