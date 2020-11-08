import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  signInForm: FormGroup

  constructor(
    private _fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this._initForm()
  }

  private _initForm() {
    this.signInForm = this._fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if(this.signInForm.valid) {
      console.log(this.signInForm.value)
    }
  }

}
