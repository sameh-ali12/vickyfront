import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PartnerFinancialSuppliesService } from "./partner_financialـsupplies.services";
import { AddLoginService } from "../login/login.services";
import { TreasuryService } from "../treasuries/treasuries.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";

@Component({
  selector: "app-partnerfinancialsupplies",
  templateUrl: "partner_financialـsupplies.component.html",
})
export class PartnerFinancialSuppliesComponent implements OnInit {
  transferForm: FormGroup;
  submitted = false;
  users: any;
  treasuries: any;
  obj: { value: any; from: string; to: any; fromtreasury: any; note: any,daterecived:any };
  err: boolean;
  message: string;

  constructor(
    private admin: AdminLayoutComponent,
    private treasuryservice: TreasuryService,
    private addloginservice: AddLoginService,
    private partnerfinancialsuppliesservice: PartnerFinancialSuppliesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getallowedusers();
    this.getalltreasuries();
    this.transferForm = this.formBuilder.group({
      value: [0, Validators.required],
      partner: ["", Validators.required],
      treasury: ["", Validators.required],
      note: [""],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.transferForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.transferForm.invalid) {
      return;
    }

    this.treasuryservice
      .gettreasury(this.transferForm.value.treasury)
      .subscribe({
        next: (data) => {
          res = data;
          if (res.code == 100) {
            this.admin.active = false;
            console.log(res.obj[0].value);
            console.log(this.transferForm.value.value);
            if (res.obj[0].value < this.transferForm.value.value) {
            
              this.err = true;
              this.message = "المبلغ المطلوب توريده غير موجود في الخزينه";
            } else {
              // display form values on success
              var res;
              this.admin.active = true;
              this.obj = {
                value: this.transferForm.value.value,
                from: localStorage.getItem("userid"),
                to: this.transferForm.value.partner,
                fromtreasury: this.transferForm.value.treasury,
                note: this.transferForm.value.note,
                daterecived:Date.now()
              };
              this.partnerfinancialsuppliesservice
                .addtransfer(this.obj)
                .subscribe({
                  next: (data) => {
                    res = data;
                    if (res.code == 100) {
                      this.admin.active = false;
                      this.err = true;
                      this.message =
                        "تم ارسال طلب التوريد الي الشريك للموافقه عليها ";
                        this.onReset();

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
    this.transferForm.reset();
  }

  getallowedusers() {
    var res;
    this.admin.active = true;
    this.addloginservice.getallowedusers().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.users = res.obj;
        } else {
          this.admin.active = false;
        }
      },
      error: (error) => {
        alert(error);
        this.admin.active = false;
      },
    });
  }

  getalltreasuries() {
    var res;
    this.admin.active = true;
    this.treasuryservice.getalltreasuries().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.treasuries = res.obj;
        } else {
          this.admin.active = false;
        }
      },
      error: (error) => {
        alert(error);
        this.admin.active = false;
      },
    });
  }
}
