import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MustMatch } from "../../_helpers/must-match.validator";
import { AuthLayoutComponent } from "../../layouts/auth-layout/auth-layout.component";
import { RestPasswordService } from "../restpassword/restpassword.services";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-restpassword",
  templateUrl: "restpassword.component.html",
})
export class RestPasswordComponent implements OnInit {
  restpasswordForm: FormGroup;
  submitted = false;
  err: boolean = false;
  token: any;

  constructor(
    private restpasswordservice: RestPasswordService,
    private auth: AuthLayoutComponent,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public router: Router

  ) {}

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.params.token;
    // this.registerForm = this.formBuilder.group({
    //     title: ['', Validators.required],
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     email: ['', [Validators.required, Validators.email]],
    //     password: ['', [Validators.required, Validators.minLength(6)]],
    //     confirmPassword: ['', Validators.required],
    //     acceptTerms: [false, Validators.requiredTrue]
    // }, {
    //     validator: MustMatch('password', 'confirmPassword')
    // });

    this.restpasswordForm = this.formBuilder.group(
      {
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.restpasswordForm.controls;
  }

  onSubmit() {
    var res;
    this.submitted = true;
    // stop here if form is invalid
    if (this.restpasswordForm.invalid) {
      return;
    }

    
    this.restpasswordservice.restpassword(this.restpasswordForm.value,this.token).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.auth.active = false;
          this.err = false;
          this.router.navigateByUrl("/login");
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
    this.restpasswordForm.reset();
  }
}
