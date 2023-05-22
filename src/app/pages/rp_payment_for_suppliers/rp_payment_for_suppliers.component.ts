import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SuppliersService } from "../suppliers/suppliers.services";
import { TreasuryService } from "../treasuries/treasuries.services";
import { PaymentForSuppliersService } from "../payment_for_suppliers/payment_for_suppliers.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Globals } from "src/app/globals";
import { Router } from "@angular/router";

@Component({
  selector: "app-rppaymentforsuppliers",
  templateUrl: "rp_payment_for_suppliers.component.html",
})
export class Rp_PaymentForSuppliersComponent implements OnInit {
  paymentsuppliersForm: FormGroup;
  submitted = false;
  err: boolean;
  suppliers: any;
  treasuries: any;
  message: string;
  dept: any;
  obj: any;
  printmode: boolean;
  total = 0;

  constructor(
    private formBuilder: FormBuilder,
    private suppliersservice: SuppliersService,
    private treasuryservice: TreasuryService,
    private paymentforsuppliersservice: PaymentForSuppliersService,
    private admin: AdminLayoutComponent,
    private globals: Globals,
    private router: Router
  ) {}

  ngOnInit() {
    this.getallsuppliers();
    this.getalltreasury();
    this.paymentsuppliersForm = this.formBuilder.group({
      supplier: ["", Validators.required],
      from: ["", Validators.required],
      to: ["", Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.paymentsuppliersForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.paymentsuppliersForm.invalid) {
      return;
    }
    var res;
    this.admin.active = true;
    this.paymentforsuppliersservice.paymenttosupplierwithdate(this.paymentsuppliersForm.value.supplier,this.paymentsuppliersForm.value.from,this.paymentsuppliersForm.value.to).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.obj = res.obj;
          this.findsum(this.obj);
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

  onReset() {
    this.submitted = false;
    this.paymentsuppliersForm.reset();
  }

  getallsuppliers() {
    var res;
    this.admin.active = true;
    this.suppliersservice.getallsuppliers().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.suppliers = res.obj;
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
  getalltreasury() {
    var res;
    this.admin.active = true;
    this.treasuryservice.getalltreasuries().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.treasuries = res.obj;
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

  findsum(data) {
    for (let j = 0; j < data.length; j++) {
      console.log(data[j]);
      this.total += data[j].value;
    }
  }

  printall() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("suppliers") as HTMLElement;
    this.gotoanther();
  }

  gotoanther() {
    setTimeout(() => {
      this.router.navigateByUrl("print");
    }, 0.1);
  }
  
}
