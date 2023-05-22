import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StoresService } from "../stores/stores.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Router } from "@angular/router";
import { Globals } from "src/app/globals";
@Component({
  selector: "app-stores",
  templateUrl: "stores.component.html",
})
export class StoresComponent implements OnInit {
  storeForm: FormGroup;
  submitted = false;
  obj: { name: any; address: any; user: string };
  err: boolean;
  stores: any;
  printmode: boolean;

  constructor(
    private admin: AdminLayoutComponent,
    private formBuilder: FormBuilder,
    private storeservice: StoresService,
    private router: Router,
    private globals: Globals
  ) {}
  ngOnInit() {
    this.storeForm = this.formBuilder.group({
      name: ["", Validators.required],
      address: ["", Validators.required],
    });
    this.getstores();
  }

  get f() {
    return this.storeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    var res;
    if (this.storeForm.invalid) {
      return;
    }
    this.obj = {
      name: this.storeForm.value.name,
      address: this.storeForm.value.address,
      user: localStorage.getItem("userid"),
    };

    this.storeservice.addstore(this.obj).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
        } else {
          this.admin.active = false;
          this.err = true;
        }
      },
      error: (error) => {
        alert(error);
        this.admin.active = false;
        this.err = true;
      },
    });
    this.onReset();
    this.getstores();
  }

  onReset() {
    this.submitted = false;
    this.storeForm.reset();
  }

  getstores() {
    var res;
    this.admin.active = true;
    this.storeservice.getstores().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.stores = res.obj;
        } else {
          this.admin.active = false;
          this.err = true;
        }
      },
      error: (error) => {
        alert(error);
        this.admin.active = false;
        this.err = true;
      },
    });
    this.onReset();
  }

  print() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("stores") as HTMLElement;
    this.gotoanther();
  }


  gotoanther() {
    setTimeout (() => {
      this.router.navigateByUrl("print");
      },0.1);
  }
}
