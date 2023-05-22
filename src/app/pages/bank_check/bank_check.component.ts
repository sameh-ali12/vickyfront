import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BankCheckService } from "./bank_check.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { TreasuryService } from "../treasuries/treasuries.services";
import { ClientsService } from "../clients/clients.services";

@Component({
  selector: "app-bankcheck",
  templateUrl: "bank_check.component.html",
})
export class BankCheckComponent implements OnInit {
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
    daterecived:any
  };
  checks: any;
  treasuries: any;
  clients: any;
  treasuryvalue: any;
  checksvalue: any;
  constructor(
    private formBuilder: FormBuilder,
    private bankservices: BankCheckService,
    private admin: AdminLayoutComponent,
    private treasuryservice: TreasuryService,
    private clientservice: ClientsService
  ) {}

  ngOnInit() {
    this.getallchecks();
    this.getalltreasury();
    this.getallclient();
    this.checkForm = this.formBuilder.group({
      client: ["", Validators.required],
      value: ["", Validators.required],
      dateexpire: ["", Validators.required],
      treasury: ["", Validators.required],
      checkno: ["", Validators.required],
      note: [""],
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
    var res;
    this.admin.active = true;
    this.obj = {
      client: this.checkForm.value.client,
      value: this.checkForm.value.value,
      dateexpire: this.checkForm.value.dateexpire,
      treasury: this.checkForm.value.treasury,
      note: this.checkForm.value.note,
      checkno: this.checkForm.value.checkno,
      user: localStorage.getItem("userid"),
      daterecived:Date.now()
    };
    this.bankservices.addcheck(this.obj).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = true;
          this.message = "تم اضافه الشيك";
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
    this.getallchecks();
  }

  onReset() {
    this.submitted = false;
    this.checkForm.reset();
  }
  getallchecks() {
    var res;
    this.admin.active = true;
    this.bankservices.getallchecks("underprocess").subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.checks = res.obj;
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
}
