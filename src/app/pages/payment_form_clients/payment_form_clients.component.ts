import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TreasuryService } from "../treasuries/treasuries.services";
import { PaymentFormClientsService } from "./payment_form_clients.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { ClientsService } from "../clients/clients.services";
import { ThrowStmt } from "@angular/compiler";
import { SalesManService } from "../salesman/salesman.services";

@Component({
  selector: "app-paymentformclients",
  templateUrl: "payment_form_clients.component.html",
})
export class PaymentFormClientsComponent implements OnInit {
  paymentsuppliersForm: FormGroup;
  submitted = false;
  err: boolean;
  suppliers: any;
  treasuries: any;
  message: string;
  clients: any;
  dept: number = 0;
  selectedclient: any;
  sales: any;
  selectedsales: any;
  salesfalg: boolean;
  clientflag: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private treasuryservice: TreasuryService,
    private paymentformclientsservice: PaymentFormClientsService,
    private admin: AdminLayoutComponent,
    private clientsservice: ClientsService,
    private SalesManService:SalesManService
  ) {}

  ngOnInit() {
    this.getalltreasury();
    this.getclients();
    this.getallsales();
    this.paymentsuppliersForm = this.formBuilder.group({
      from:["",Validators.required],
      client: [""],
      sales: [""],
      treasury: ["", Validators.required],
      value: ["", Validators.required],
      notes: [""],
      balancebefore: [""],
      balanceafter: [""],
    });
  }

  keyword = "name";
  selectEvent(item) {
    // do something with selected item
    this.selectedclient = this.clients.find((x) => x._id === item._id);
    this.paymentsuppliersForm.patchValue({
      balancebefore: this.selectedclient.debtvalue,
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.paymentsuppliersForm.controls;
  }


  selectEventSales(ev){
    // do something with selected item
    this.selectedsales = this.sales.find((x) => x._id === ev._id);
    this.paymentsuppliersForm.patchValue({
      balancebefore: this.selectedsales.currentmoney
    });
  }

  getallsales() {
    var res;
    this.admin.active = true;
    this.SalesManService.getallsales().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.sales = res.obj;
          console.log(this.sales);
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



  onChangFrom(ev){
    if(ev == 0){
      this.salesfalg = true;
      this.clientflag = false;
    }
    if(ev == 1){
      this.salesfalg = false;
      this.clientflag = true;
    }

  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.paymentsuppliersForm.invalid) {
      return;
    }
if(this.paymentsuppliersForm.value.from == 0){
  var obj1 = {
    value: this.paymentsuppliersForm.value.value,
    note: this.paymentsuppliersForm.value.notes,
    user: localStorage.getItem("userid"),
    sales: this.selectedsales._id,
    totreasury: this.paymentsuppliersForm.value.treasury,
    // balancebefore: this.paymentsuppliersForm.value.balancebefore,
    // balanceafter: this.paymentsuppliersForm.value.balanceafter,
    daterecived: Date.now(),
  };
  var res;
  this.admin.active = true;
  this.paymentformclientsservice.addpaymentfromsales(obj1).subscribe({
    next: (data) => {
      res = data;
      if (res.code == 100) {
        this.admin.active = false;
        this.err = true;
        this.message = "تم السداد";
        alert(this.message);
        window.location.reload();
        this.clearPanel();
        // this.clients = res.obj;
        this.ngOnInit();
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
else{

  var obj = {
    value: this.paymentsuppliersForm.value.value,
    note: this.paymentsuppliersForm.value.notes,
    user: localStorage.getItem("userid"),
    client: this.selectedclient._id,
    totreasury: this.paymentsuppliersForm.value.treasury,
    balancebefore: this.paymentsuppliersForm.value.balancebefore,
    balanceafter: this.paymentsuppliersForm.value.balanceafter,
    daterecived: Date.now(),
  };
  var res;
  this.admin.active = true;
  this.paymentformclientsservice.addpayment(obj).subscribe({
    next: (data) => {
      res = data;
      if (res.code == 100) {
        this.admin.active = false;
        this.err = true;
        this.message = "تم سداد مديونيه العميل";
        alert(this.message);
        window.location.reload();
        this.clearPanel();
        this.clients = res.obj;
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


    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.paymentsuppliersForm.reset();
  }

  @ViewChild("auto") auto;
  clearPanel(): void {
    this.auto.clear();
  }

  getclients() {
    var res;
    this.admin.active = true;
    this.clientsservice.getallclients().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.clients = res.obj;
          console.log(this.clients);
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

  onchangecash(val) {
    this.paymentsuppliersForm.patchValue({
      balanceafter: this.paymentsuppliersForm.value.balancebefore - val,
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
}
