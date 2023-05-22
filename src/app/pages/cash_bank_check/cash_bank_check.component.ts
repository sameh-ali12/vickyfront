import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BankCheckService } from "../bank_check/bank_check.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { ClientsService } from "../clients/clients.services";

@Component({
  selector: "app-cashbankcheck",
  templateUrl: "cash_bank_check.component.html",
})
export class CashBankCheckComponent implements OnInit {
  cashcheckForm: FormGroup;
  submitted = false;
  rebackcheckForm: FormGroup;
  checks: any;
  err: boolean = false;
  message: string;
  clients: any;
  checkno: any;
  selectedclient: any;
  selectedcheck: {_id:any, value: any; dateexpire: any };
  obj: { status: string; dateaction: number };


  constructor(
    private clientsservice: ClientsService,
    private admin: AdminLayoutComponent,
    private bankservices: BankCheckService,
    private formBuilder: FormBuilder
  ) {}



  ngOnInit() {
    this.getallchecks();
    this.getclients();
    this.selectedcheck = {
    _id:'',
      value: 0,
      dateexpire: false,
    };
    this.rebackcheckForm = this.formBuilder.group({
      client: ["", Validators.required],
      checkno: ["", Validators.required],
      notes: [""],
    });
  }

  get f() {
    return this.rebackcheckForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.rebackcheckForm.invalid) {
      return;
    }
    var res;
    this.admin.active = true;
    this.obj = {
      status: "cashed",
      dateaction: Date.now()
    };
    this.bankservices.updatecheck(this.obj,this.selectedcheck._id).subscribe({
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
    this.getallchecks();
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.rebackcheckForm.reset();
  }
  onChangeclient(target) {
    this.selectedclient = target;
    this.getallcheckswithclient(target);
  }

  onChangecheckno(checkno) {
    this.getallcheckswithclientandcheckno(checkno);
  }

  getallchecks() {
    var res;
    this.admin.active = true;
    this.bankservices.getallchecks("cashed").subscribe({
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

  getclients() {
    var res;
    this.admin.active = true;
    this.clientsservice.getallclients().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.clients = res.obj;
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

  getallcheckswithclient(client) {
    var res;
    this.admin.active = true;
    this.bankservices.allcheckforclient("underprocess", client).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.checkno = res.obj;
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

  getallcheckswithclientandcheckno(checkno) {
    var res;
    this.admin.active = true;
    this.bankservices
      .allcheckforclientandcheckno("underprocess", this.selectedclient, checkno)
      .subscribe({
        next: (data) => {
          res = data;
          if (res.code == 100) {
            this.admin.active = false;
            this.selectedcheck = res.obj[0];
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
