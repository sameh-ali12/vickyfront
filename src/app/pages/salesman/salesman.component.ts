import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalesManService } from "./salesman.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
@Component({
  selector: "app-salesman",
  templateUrl: "salesman.component.html",
})
export class SalesManComponent implements OnInit {
  salesmanForm: FormGroup;
  submitted = false;
  obj: { name: any; phonenumber: any; note: any; user: string };
  err: boolean;
  sales: any;
  printmode: boolean;

  constructor(
    private admin: AdminLayoutComponent,
    private salesManservice: SalesManService,
    private formBuilder: FormBuilder,
    private globals: Globals,
    private router: Router
  ) {}

  ngOnInit() {
    this.getallsales();
    this.salesmanForm = this.formBuilder.group({
      name: ["", Validators.required],
      phonenumber: ["", Validators.required],
      note: [""],
    });
  }

  get f() {
    return this.salesmanForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    var res;
    if (this.salesmanForm.invalid) {
      return;
    }
    this.obj = {
      name: this.salesmanForm.value.name,
      phonenumber: this.salesmanForm.value.phonenumber,
      note: this.salesmanForm.value.note,
      user: localStorage.getItem("userid"),
    };
    this.salesManservice.addsalesman(this.obj).subscribe({
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
    this.getallsales();
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.salesmanForm.reset();
  }
  getallsales() {
    var res;
    this.admin.active = true;
    this.salesManservice.getallsales().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.sales = res.obj;
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
  }


  printall() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("sales") as HTMLElement;
    this.gotoanther();
  }


  gotoanther() {
    setTimeout (() => {
      this.router.navigateByUrl("print");
      },0.1);
  }
}
