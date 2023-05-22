import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddLoginService } from "./login.services";
// import custom validator to validate that password and confirm password fields match
// import { MustMatch } from '../../_helpers/must-match.validator';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthLayoutComponent } from "../../layouts/auth-layout/auth-layout.component";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  err = false;

  constructor(
    private auth: AuthLayoutComponent,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private loginservices: AddLoginService,
    public router: Router
  ) {}

  ngOnInit() {
 

    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });

    var logged = this.loginservices.isAuthenticated();
    console.log(logged);
    if(logged == true){
      this.router.navigateByUrl("/dashboard");
    }
  }


  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.auth.active = true;
    var res;
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.auth.active = false;
      return;
    }
    this.loginservices.login(this.loginForm.value).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {

          this.auth.active = false;
          localStorage.setItem("role", res.role);
          localStorage.setItem("userid",res.id);
          localStorage.setItem("email",res.email);
          localStorage.setItem("token",res.token);
          localStorage.setItem("name",res.name);
          this.router.navigateByUrl("/dashboard");
        } else {
          this.auth.active = false;
          this.err = true;
        }
      },
      error: (error) => {
        alert(error);
        this.auth.active = false;
        this.err = true;
      },
    });
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
}
