import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Rp_PartnerService } from "../rp_partners/rp_partner.services";
import { AddLoginService } from "../login/login.services";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
@Component({
  selector: "app-rppartner",
  templateUrl: "rp_partner.component.html",
})
export class Rp_PartnerComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean;
  users: any;
  sellbills: [];
  public clicked: boolean = true;
  public clicked1: boolean = false;
  buybills: any[];
  printmode: boolean = true;
  constructor(
    private admin: AdminLayoutComponent,
    private formBuilder: FormBuilder,
    private rp_partnerservice: Rp_PartnerService,
    private addloginservice: AddLoginService,
    private globals: Globals,
    private router: Router
  ) {}
  ngOnInit() {
    this.getallowedusers();
    this.searchForm = this.formBuilder.group({
      partner: [""],
      from: [""],
      to: [""],
      status: [""],
    });
  }
  get s() {
    return this.searchForm.controls;
  }

  onSubmitsearch() {
    this.printmode = false;

    this.submitted = true;
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }
    this.sellbills = [];
    this.buybills = [];

    if (this.clicked == true) {
      if (
        this.searchForm.value.partner == "" &&
        this.searchForm.value.from == "" &&
        this.searchForm.value.to == "" &&
        this.searchForm.value.status == ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice.getallpartnersell().subscribe({
          next: (data) => {
            res = data;
            console.log(data);
            if (res.code == 100) {
              this.admin.active = false;
              this.sellbills = res.obj;
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

      if (
        this.searchForm.value.partner == "" &&
        this.searchForm.value.from == "" &&
        this.searchForm.value.to == "" &&
        this.searchForm.value.status != ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnersellwithstatus(this.searchForm.value.status)
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.sellbills = res.obj;
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

      if (
        this.searchForm.value.partner == "" &&
        this.searchForm.value.from != "" &&
        this.searchForm.value.to != "" &&
        this.searchForm.value.status == ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnersellwithdate(
            this.searchForm.value.from,
            this.searchForm.value.to
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.sellbills = res.obj;
              } else {
                this.admin.active = false;
              }
            },
            error: (error) => {
              console.log(error);
              alert(error);
              this.admin.active = false;
            },
          });
      }

      if (
        this.searchForm.value.partner == "" &&
        this.searchForm.value.from != "" &&
        this.searchForm.value.to != "" &&
        this.searchForm.value.status != ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnersellwithstatusanddate(
            this.searchForm.value.from,
            this.searchForm.value.to,
            this.searchForm.value.status
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.sellbills = res.obj;
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

      if (
        this.searchForm.value.partner != "" &&
        this.searchForm.value.from != "" &&
        this.searchForm.value.to != "" &&
        this.searchForm.value.status != ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnersellwithdateandstatusandpartner(
            this.searchForm.value.partner,
            this.searchForm.value.from,
            this.searchForm.value.to,
            this.searchForm.value.status
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.sellbills = res.obj;
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

      if (
        this.searchForm.value.partner != "" &&
        this.searchForm.value.from == "" &&
        this.searchForm.value.to == "" &&
        this.searchForm.value.status != ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnersellwithandstatusandpartner(
            this.searchForm.value.partner,
            this.searchForm.value.status
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.sellbills = res.obj;
                console.log(this.sellbills);
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

      if (
        this.searchForm.value.partner != "" &&
        this.searchForm.value.from != "" &&
        this.searchForm.value.to != "" &&
        this.searchForm.value.status == ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnersellwithdateandpartner(
            this.searchForm.value.partner,
            this.searchForm.value.from,
            this.searchForm.value.to
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.sellbills = res.obj;
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

      if (
        this.searchForm.value.partner != "" &&
        this.searchForm.value.from == "" &&
        this.searchForm.value.to == "" &&
        this.searchForm.value.status == ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnersellwithpartner(this.searchForm.value.partner)
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.sellbills = res.obj;
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
    } else {
      if (
        this.searchForm.value.partner == "" &&
        this.searchForm.value.from == "" &&
        this.searchForm.value.to == "" &&
        this.searchForm.value.status == ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice.getallpartnerbuy().subscribe({
          next: (data) => {
            res = data;
            console.log(data);
            if (res.code == 100) {
              this.admin.active = false;
              this.buybills = res.obj;
            } else {
              this.admin.active = false;
            }
          },
          error: (error) => {
            alert(error);
            console.log(error);
            this.admin.active = false;
          },
        });
      }

      if (
        this.searchForm.value.partner == "" &&
        this.searchForm.value.from == "" &&
        this.searchForm.value.to == "" &&
        this.searchForm.value.status != ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnerbuywithstatus(this.searchForm.value.status)
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.buybills = res.obj;
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

      if (
        this.searchForm.value.partner == "" &&
        this.searchForm.value.from != "" &&
        this.searchForm.value.to != "" &&
        this.searchForm.value.status == ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnerbuywithdate(
            this.searchForm.value.from,
            this.searchForm.value.to
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.buybills = res.obj;
              } else {
                this.admin.active = false;
              }
            },
            error: (error) => {
              console.log(error);
              alert(error);
              this.admin.active = false;
            },
          });
      }

      if (
        this.searchForm.value.partner == "" &&
        this.searchForm.value.from != "" &&
        this.searchForm.value.to != "" &&
        this.searchForm.value.status != ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnerbuywithstatusanddate(
            this.searchForm.value.from,
            this.searchForm.value.to,
            this.searchForm.value.status
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.buybills = res.obj;
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

      if (
        this.searchForm.value.partner != "" &&
        this.searchForm.value.from != "" &&
        this.searchForm.value.to != "" &&
        this.searchForm.value.status != ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnerbuywithdateandstatusandpartner(
            this.searchForm.value.partner,
            this.searchForm.value.from,
            this.searchForm.value.to,
            this.searchForm.value.status
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.buybills = res.obj;
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

      if (
        this.searchForm.value.partner != "" &&
        this.searchForm.value.from == "" &&
        this.searchForm.value.to == "" &&
        this.searchForm.value.status != ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnerbuywithandstatusandpartner(
            this.searchForm.value.partner,
            this.searchForm.value.status
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.buybills = res.obj;
                console.log(this.sellbills);
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

      if (
        this.searchForm.value.partner != "" &&
        this.searchForm.value.from != "" &&
        this.searchForm.value.to != "" &&
        this.searchForm.value.status == ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnerbuywithdateandpartner(
            this.searchForm.value.partner,
            this.searchForm.value.from,
            this.searchForm.value.to
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.buybills = res.obj;
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

      if (
        this.searchForm.value.partner != "" &&
        this.searchForm.value.from == "" &&
        this.searchForm.value.to == "" &&
        this.searchForm.value.status == ""
      ) {
        var res;
        this.admin.active = true;
        this.rp_partnerservice
          .getpartnerbuywithpartner(this.searchForm.value.partner)
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.buybills = res.obj;
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

  onRest() {
    this.searchForm.reset();
    this.ngOnInit();
    this.printmode = true;
    }

  print(i) {
    this.printmode = true;
    this.globals.printobj = document.getElementById(i) as HTMLElement;
    this.gotoanther();
  }
  printallsell() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("sellbills") as HTMLElement;
    this.gotoanther();
  }
  printallbuy() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("buybills") as HTMLElement;
    this.gotoanther();
  }


  gotoanther() {
    setTimeout (() => {
      this.router.navigateByUrl("print");
      },0.1);
  }
}
