import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {filter, map, switchMap, tap} from "rxjs/operators";

export enum ConfigListEnum {
  service = 'service',
  categories = 'categories'
}


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configMap: Map<ConfigListEnum, any> = new Map<ConfigListEnum, any>()
  private config$: BehaviorSubject<Map<ConfigListEnum, any>> = new BehaviorSubject<Map<ConfigListEnum, any>>(this.configMap)
  private _init$ = new BehaviorSubject(false)

  constructor(
    private _afs: AngularFirestore
  ) {
  }

  initConfig() {
    return this._afs.collection('config').get()
      .pipe(
        tap((snap) => {
          snap.docs.forEach(doc => {
            this.configMap.set(doc.id as ConfigListEnum, doc.data())
          })
          console.log(this.configMap)
          this.config$.next(this.configMap)
          this._init$.next(true)
        })
      )
  }

  getList$(name: ConfigListEnum) {
    return this._init$
      .pipe(
        filter(val => !!val),
        switchMap(() => this.config$),
        map((configMap) => configMap.get(name))
      )

  }
}
