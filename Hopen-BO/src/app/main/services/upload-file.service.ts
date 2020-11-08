import {Injectable} from '@angular/core';
import firebase from "firebase";
import {from, of, throwError} from "rxjs";
import {catchError, filter, map, switchMap} from "rxjs/operators";
import {UploadTaskSnapshot} from "@angular/fire/storage/interfaces";
import {AngularFireStorage} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private _storage: AngularFireStorage
  ) {
  }


  uploadFile(file, filePathStorage: string) {
    if (!file || file.fullPath) {
      return of(null)
    }
    const fileName = `${Math.floor(Math.random() * 10000)}-${file.name}`;
    const pathWithName = `${filePathStorage}/${fileName}`;
    const fileRef = this._storage.ref(pathWithName);
    return from(fileRef.put(file))
      .pipe(
        filter((snapshot: UploadTaskSnapshot) => snapshot.state === 'success'),
        switchMap(() => fileRef.getDownloadURL()),
        map((url) => this.fileForDb(file, url, pathWithName)),
        catchError(err => {
          console.error(err);
          return throwError(err);
        })
      );
  }


  fileForDb(file: File, url: string, fullPath: string) {
    return {
      metadata: {
        name: file.name,
        size: file.size,
        type: file.type,
      },
      url: url,
      fullPath: fullPath
    };
  }
}
