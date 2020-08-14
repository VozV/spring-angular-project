import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../_service/auth.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _authService:AuthService
  ) {}


  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      fio:['',Validators.required]
    })
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid){
      return;
    }

    this.loading = true;
    this._authService.registration(this.f.login.value, this.f.password.value, this.f.fio.value)
      .pipe(first())
      .subscribe(() => this.router.navigateByUrl('/'), () => this.loading = false);
  }

}
