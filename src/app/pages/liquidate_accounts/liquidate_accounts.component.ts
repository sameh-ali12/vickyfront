import { Component, OnInit } from "@angular/core";
import { AddLoginService } from "../login/login.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LiquidateService } from "./liquidate.services";
import { PartnerSellService } from "../partner_sell/partner_sell.services";
import { Router } from "@angular/router";
import { Globals } from "../../globals";

@Component({
  selector: "app-liquidateaccounts",
  templateUrl: "liquidate_accounts.component.html",
})
export class LiquidateAccountsComponent implements OnInit {
  users: any;
  searchForm: FormGroup;
  submitted: boolean;
  liquidate: any;
  selecteduser: {
    sellbills: [];
    buybills: [];
    transferfromhim: [];
    transferfromus: [];
    value: any;
  };
  sellbills: [];
  buybills: [];
  transferfromhim: [];
  transferfromus: [];
  value: any;
  bill: any;
  editmode: boolean = false;
  message: string;
  err: boolean;
  printmode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private admin: AdminLayoutComponent,
    private addloginservice: AddLoginService,
    private LiquidateService: LiquidateService,
    private partnersellservice: PartnerSellService,
    private router: Router,
    private globals: Globals
  ) {}

  ngOnInit() {
    this.getallowedusers();
    this.getliquidation();
    this.searchForm = this.formBuilder.group({
      partner: ["", Validators.required],
    });
  }
  get s() {
    return this.searchForm.controls;
  }

  onSubmitsearch() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }
    for (let index = 0; index < this.liquidate[0].partners.length; index++) {
      if (
        this.liquidate[0].partners[index].user == this.searchForm.value.partner
      ) {
        this.selecteduser = this.liquidate[0].partners[index];
        this.sellbills = this.selecteduser.sellbills;
        this.buybills = this.selecteduser.buybills;
        this.transferfromhim = this.selecteduser.transferfromhim;
        this.transferfromus = this.selecteduser.transferfromus;
        this.value = this.selecteduser.value;
      }
    }
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
          console.log(this.users);
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
  getliquidation() {
    this.liquidate = {};
    var res;
    this.admin.active = true;
    this.LiquidateService.getliquidation().subscribe({
      next: (data) => {
        res = data;
        console.log(data);
        if (res.code == 100) {
          this.admin.active = false;
          this.liquidate = res.obj;
          this.onSubmitsearch();
          console.log(this.liquidate);
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

  editbill(obj) {
    this.bill = {};
    this.bill = obj;
    this.editmode = true;
  }
  saveeditbill(bill) {
    if (localStorage.getItem("role") == "admin") {
      var total_amount = 0;
      for (let index = 0; index < bill.details.length; index++) {
        const product = bill.details[index];
        total_amount += product.price * product.viewquntity;
      }
      var remain = bill.total - total_amount;
      //// here for update users liquation
      bill.total = total_amount;
      bill.remain = remain;
      var res;
      this.partnersellservice.updatepartnersellprice(bill._id, bill).subscribe({
        next: (data) => {
          res = data;
          if (res.code == 100) {
            this.admin.active = false;
            this.onSubmitsearch();
            this.editmode = false;
          } else {
            this.admin.active = false;
            alert("حدث خطأ");
          }
        },
        error: (error) => {
          alert(error);
          this.admin.active = false;
          alert("حدث خطأ");
        },
      });
    } else {
      alert(" تعديل الفواتير  للآدمن فقط !");
    }
  }
  canceleditbill() {
    this.liquidate = {};
    this.getliquidation();
    this.editmode = false;
  }

  submitall(){
    var obj = {
      foruser:localStorage.getItem('userid'),
      touser:this.searchForm.value.partner,
      value: this.value,
      sellbills: this.selecteduser.sellbills,
      buybills: this.selecteduser.buybills,
      transferfromus: this.selecteduser.transferfromhim,
      transferfromhim: this.selecteduser.transferfromus,
      Date:Date.now()
    }


    var res;
this.admin.active = true;
this.LiquidateService.addliquidation(obj).subscribe({
  next: (data) => {
    res = data;
    if (res.code == 100) {
      this.admin.active = false;
      this.err = true;
      this.message ="تمت عمليه التصفية بنجاح";
      this.getallowedusers();
      this.getliquidation();
    } else {
      this.admin.active = false;
      this.err = true;
      this.message = "حدث خطأ";
    }
  },
  error: (error) => {
    alert(error);
    console.log(error);
    this.admin.active = false;
    this.err = true;
    this.message = "حدث خطأ";
  },
});
  }


  print() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("printall") as HTMLElement;
    this.gotoanther();
  }
 


  gotoanther() {
    setTimeout (() => {
      this.router.navigateByUrl("print");
      },0.1);
  }
}
