import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompaniesService} from "../../services/companies.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first, switchMap, tap} from "rxjs/operators";
import {UploadFileService} from "../../services/upload-file.service";
import {combineLatest, of} from "rxjs";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  companiesForm: FormGroup
  onSubmit = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _companiesService: CompaniesService,
    private _uploadFile: UploadFileService,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._initForm()

    this._route.params
      .pipe(
        first(),
        switchMap(params => {
          if (params.id) {
            return this._companiesService.getOneCompanyByUid$(params.id)
              .pipe(
                tap((company) => {
                  console.log(company)
                  this.companiesForm.patchValue(company)
                })
              )
          } else {
            return of(null)
          }
        })
      ).subscribe()
  }

  private _initForm() {
    this.companiesForm = this._fb.group({
      uid: [''],
      picture: [''],
      logo: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      categories: ['', Validators.required],
      services: [''],
      phone: ['', Validators.required],
      web: [''],
      contactEmail: [''],
      contactName: ['', Validators.required],
      socialNetwork: [''],
      referentEmail: ['', Validators.required],
      description: ['', Validators.required],
      openTime: [''],
      closeTime: [''],
      pdf: ['']
    })
  }

  submit() {
    console.log('(this.companiesForm.', this.companiesForm.valid, this.companiesForm.value)
    if (this.companiesForm.valid) {
      this.onSubmit = true;

      if (this.companiesForm.value.uid) {
        console.log(this.companiesForm.get('pdf').value)
        return combineLatest([
          this._uploadFile.uploadFile(this.companiesForm.get('logo').value ? this.companiesForm.get('logo').value.file : null, `companies/${this.companiesForm.value.uid}/logo`),
          this._uploadFile.uploadFile(this.companiesForm.get('picture').value ? this.companiesForm.get('picture').value.file : null, `companies/${this.companiesForm.value.uid}/picture`),
          this._uploadFile.uploadFile(this.companiesForm.get('pdf').value ? this.companiesForm.get('pdf').value.file : null, `companies/${this.companiesForm.value.uid}/picture`),

        ]).pipe(
          switchMap(([logo, picture, pdf]) => {
            if (logo) {
              this.companiesForm.get('logo').setValue(logo)
            }
            if (picture) {
              this.companiesForm.get('picture').setValue(picture)
            }
            if (pdf) {
              const current = this.companiesForm.get('pdf').value;
              this.companiesForm.get('pdf').setValue({
                file: pdf,
                type: current.type
              })
            }
            return this._companiesService.updateCompany(this.companiesForm.value.uid, this.companiesForm.value)
          }),
          switchMap(() => this._router.navigateByUrl('/compagnies/liste'))
        ).subscribe()
      }
      this._companiesService.createCompany({...this.companiesForm.value})
        .pipe(
          first(),
          switchMap((uid) => {
            console.log(this.companiesForm.get('logo'))
            return combineLatest([
              this._uploadFile.uploadFile(this.companiesForm.get('logo').value.file, `companies/${uid}/logo`),
              this._uploadFile.uploadFile(this.companiesForm.get('picture').value.file, `companies/${uid}/picture`),
              this._uploadFile.uploadFile(this.companiesForm.get('pdf').value.file, `companies/${uid}/pdf`),
            ]).pipe(
              switchMap(([logo, picture]) => {
                console.log(logo, picture)
                return this._companiesService.updateCompany(uid, {logo, picture})
              }),
            )
          }),

          switchMap(() => this._router.navigateByUrl('/compagnies/liste'))
        ).subscribe()

    }
  }

}
