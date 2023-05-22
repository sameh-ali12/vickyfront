import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthLayoutComponent } from "../../layouts/auth-layout/auth-layout.component";
import { ForgetPasswordService } from "../forgetpassword/forgetpassword.services";
@Component({
  selector: "app-forgetpassword",
  templateUrl: "forgetpassword.component.html",
})
export class ForgetPasswordComponent implements OnInit {
  forgetpasswordForm: FormGroup;
  submitted = false;
  message: String;
  err = false;
  constructor(
    private auth: AuthLayoutComponent,
    private formBuilder: FormBuilder,
    private forgetpasswordservice: ForgetPasswordService
  ) {}

  ngOnInit() {
    this.forgetpasswordForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgetpasswordForm.controls;
  }

  onSubmit() {
    var res;
    this.submitted = true;
    this.auth.active = true;
    // stop here if form is invalid
    if (this.forgetpasswordForm.invalid) {
      this.auth.active = false;
      return;
    }
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.forgetpasswordForm.value, null, 4));
    this.forgetpasswordservice
      .forgetpassword(this.forgetpasswordForm.value)
      .subscribe({
        next: (data) => {
          res = data;
          if (res.code == 100) {
            this.auth.active = false;
            this.err = true;
            this.message = "يرجي مراجعه الايميل المرسل .";
          } else {
            this.auth.active = false;
            this.err = true;
            this.message = "بيانات خطأ.";
          }
        },
        error: (error) => {
          alert(error);
          this.auth.active = false;
          this.err = true;
          this.message = "حدث خطأ";
        },
      });
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.forgetpasswordForm.reset();
  }
}
