import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BankCheckService } from "../bank_check/bank_check.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { TreasuryService } from "../treasuries/treasuries.services";
import { ClientsService } from "../clients/clients.services";
import { Globals } from "src/app/globals";
import { Router } from "@angular/router";

@Component({
  selector: "app-rpbankcheck",
  templateUrl: "rp_bank_check.component.html",
})
export class RpBankCheckComponent implements OnInit {
  checkForm: FormGroup;
  submitted = false;
  err: boolean = false;
  message: String;
  obj: {
    client: any;
    value: any;
    dateexpire: any;
    treasury: any;
    note: any;
    checkno: any;
    user: string;
    daterecived: any;
  };
  checks: any;
  treasuries: any;
  clients: any;
  treasuryvalue: any;
  checksvalue: any;
  printmode: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private bankservices: BankCheckService,
    private admin: AdminLayoutComponent,
    private treasuryservice: TreasuryService,
    private clientservice: ClientsService,
    private globals: Globals,
    private router: Router
  ) {}

  ngOnInit() {
    this.getalltreasury();
    this.getallclient();
    this.checkForm = this.formBuilder.group({
      client: [""],
      treasury: [""],
      status: ["", Validators.required],
    });
  }

  get f() {
    return this.checkForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.checkForm.invalid) {
      return;
    }
    if (
      this.checkForm.value.client == "all" &&
      this.checkForm.value.treasury == "all"
    ) {
      var res;
      this.admin.active = true;
      this.bankservices
        .getallcheckforallclientsandalltreasury(this.checkForm.value.status)
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.obj = res.obj;
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

    if (
      this.checkForm.value.client != "all" &&
      this.checkForm.value.treasury == "all"
    ) {

      var res;
      this.admin.active = true;
      this.bankservices
        .getallcheckforclientsandalltreasury(this.checkForm.value.status,this.checkForm.value.client)
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.obj = res.obj;
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

    if (
      this.checkForm.value.client != "all" &&
      this.checkForm.value.treasury != "all"
    ) {


      var res;
      this.admin.active = true;
      this.bankservices
        .getallcheckforclientsandtreasury(this.checkForm.value.status,this.checkForm.value.client,this.checkForm.value.treasury)
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.obj = res.obj;
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

    if (
      this.checkForm.value.client == "all" &&
      this.checkForm.value.treasury != "all"
    ) {
      var res;
      this.admin.active = true;
      this.bankservices
        .getallcheckforallclientsandtreasury(this.checkForm.value.status,this.checkForm.value.treasury)
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.obj = res.obj;
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
  }

  onReset() {
    this.submitted = false;
    this.checkForm.reset();
  }

  getalltreasury() {
    var res;
    this.admin.active = true;
    this.treasuryservice.getalltreasuries().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.treasuries = res.obj;
          this.err = false;
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
  getallclient() {
    var res;
    this.admin.active = true;
    this.clientservice.getallclients().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.clients = res.obj;
          this.err = false;
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

  printall() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("alldoc") as HTMLElement;
    this.gotoanther();
  }

  gotoanther() {
    setTimeout(() => {
      this.router.navigateByUrl("print");
    }, 0.1);
  }
  
}
