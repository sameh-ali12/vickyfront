import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SuppliersService } from "../suppliers/suppliers.services";
import { TreasuryService } from "../treasuries/treasuries.services";
import { PaymentForSuppliersService } from "./payment_for_suppliers.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";

@Component({
  selector: "app-paymentforsuppliers",
  templateUrl: "payment_for_suppliers.component.html",
})
export class PaymentForSuppliersComponent implements OnInit {
  paymentsuppliersForm: FormGroup;
  submitted = false;
  err: boolean;
  suppliers: any;
  treasuries: any;
  message: string;
  dept: any;

  constructor(
    private formBuilder: FormBuilder,
    private suppliersservice: SuppliersService,
    private treasuryservice: TreasuryService,
    private paymentforsuppliersservice: PaymentForSuppliersService,
    private admin: AdminLayoutComponent
  ) {}

  ngOnInit() {
    this.getallsuppliers();
    this.getalltreasury();
    this.paymentsuppliersForm = this.formBuilder.group({
      supplier: ["", Validators.required],
      treasury: ["", Validators.required],
      value: ["", Validators.required],
      notes: [""],
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
    this.treasuryservice
      .gettreasury(this.paymentsuppliersForm.value.treasury)
      .subscribe({
        next: (data) => {
          res = data;
          console.log(res);
          if (res.code == 100) {
            this.admin.active = false;
            if (res.obj[0].value < this.paymentsuppliersForm.value.value) {
              this.err = true;
              this.message = "المبلغ المطلوب توريده غير موجود في الخزينه";
            } else {
              this.suppliersservice
                .getsinglesupplier(this.paymentsuppliersForm.value.supplier)
                .subscribe({
                  next: (data) => {
                    res = data;
                    if (res.code == 100) {
                      if (
                        res.obj[0].value < this.paymentsuppliersForm.value.value
                      ) {
                        this.err = true;
                        this.message =
                          "لا يمكن دفع  مبلغ اكبر من المديونيه الفعليه";
                      } else {
                        var obj = {
                          value: this.paymentsuppliersForm.value.value,
                          note: this.paymentsuppliersForm.value.notes,
                          user: localStorage.getItem("userid"),
                          supplier: this.paymentsuppliersForm.value.supplier,
                          fromtreasury: this.paymentsuppliersForm.value.treasury,
                          daterecived:Date.now()
                        };

                        var res;
                        this.admin.active = true;
                        this.paymentforsuppliersservice
                          .addpayment(obj)
                          .subscribe({
                            next: (data) => {
                              res = data;
                              if (res.code == 100) {
                                this.admin.active = false;
                                this.err = true;
                                this.message = "تم سداد مديونيه المورد";
                              } else {
                                this.admin.active = false;
                                this.err = true;
                                this.message = "حدث خطأ";
                              }
                            },
                            error: (error) => {
                              alert(error);
                              this.admin.active = false;
                              this.err = true;
                              this.message = "حدث خطأ";
                            },
                          });

                        this.onReset();
                      }
                    } else {
                      this.admin.active = false;
                      this.err = true;
                      this.message = "حدث خطأ";
                    }
                  },
                  error: (error) => {
                    alert(error);
                    this.admin.active = false;
                    this.err = true;
                    this.message = "حدث خطأ";
                  },
                });
            }
          } else {
            this.admin.active = false;
            this.err = true;
            this.message = "حدث خطأ";
          }
        },
        error: (error) => {
          alert(error);
          this.admin.active = false;
          this.err = true;
          this.message = "حدث خطأ";
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
  onChange(value){
    var supplier = this.suppliers.find((x) => x._id === value);
    console.log(supplier);
    this.dept = supplier.value 
   }

  
}
