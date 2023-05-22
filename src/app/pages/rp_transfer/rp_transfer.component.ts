import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import {Rp_TransferService} from "../rp_transfer/rp_transfer.services";
import { AddLoginService } from "../login/login.services";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
@Component({
  selector: "app-rptransfer",
  templateUrl: "rp_transfer.component.html",
})
export class Rp_TransferComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean;
  users: any;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  printmode: boolean = true;
  transferfromyou: any[];
  transfertoyou: any[];
  constructor(
    private admin: AdminLayoutComponent,
    private formBuilder: FormBuilder,
    private Rp_TransferService: Rp_TransferService,
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
    this.transferfromyou = [];
    this.transfertoyou = [];

    if (this.clicked == true) {
      if (
        this.searchForm.value.partner == "" &&
        this.searchForm.value.from == "" &&
        this.searchForm.value.to == "" &&
        this.searchForm.value.status == ""
      ) {
        var res;
        this.admin.active = true;
        this.Rp_TransferService.getalltransfer().subscribe({
          next: (data) => {
            res = data;
            console.log(data);
            if (res.code == 100) {
              this.admin.active = false;
              this.transferfromyou = res.obj;
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
        this.Rp_TransferService
          .gettransferfromyouwithstatus(this.searchForm.value.status)
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.transferfromyou = res.obj;
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
        this.Rp_TransferService
          .gettransferfromyouwithdate(
            this.searchForm.value.from,
            this.searchForm.value.to
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.transferfromyou = res.obj;
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
        this.Rp_TransferService
          .gettransferfromyouwithstatusanddate(
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
                this.transferfromyou = res.obj;
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
        this.Rp_TransferService
          .gettransferfromyouwithdateandstatusandpartner(
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
                this.transferfromyou = res.obj;
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
        this.Rp_TransferService
          .gettransferfromyouwithandstatusandpartner(
            this.searchForm.value.partner,
            this.searchForm.value.status
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.transferfromyou = res.obj;
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
        this.Rp_TransferService
          .gettransferfromyouwithdateandpartner(
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
                this.transferfromyou = res.obj;
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
        this.Rp_TransferService
          .gettransferfromyouwithpartner(this.searchForm.value.partner)
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.transferfromyou = res.obj;
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
        this.Rp_TransferService.getalltransfertoyou().subscribe({
          next: (data) => {
            res = data;
            console.log(data);
            if (res.code == 100) {
              this.admin.active = false;
              this.transfertoyou = res.obj;
              console.log(this.transfertoyou);
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
        this.Rp_TransferService
          .gettransfertoyouwithstatus(this.searchForm.value.status)
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.transfertoyou = res.obj;
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
        this.Rp_TransferService
          .gettransfertoyouwithdate(
            this.searchForm.value.from,
            this.searchForm.value.to
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.transfertoyou = res.obj;
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
        this.Rp_TransferService
          .gettransfertoyouwithstatusanddate(
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
                this.transfertoyou = res.obj;
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
        this.Rp_TransferService
          .gettransfertoyouwithdateandstatusandpartner(
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
                this.transfertoyou = res.obj;
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
        this.Rp_TransferService
          .gettransfertoyouwithandstatusandpartner(
            this.searchForm.value.partner,
            this.searchForm.value.status
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.transfertoyou = res.obj;
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
        this.Rp_TransferService
          .gettransfertoyouwithdateandpartner(
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
                this.transfertoyou = res.obj;
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
        this.Rp_TransferService
          .gettransfertoyouwithpartner(this.searchForm.value.partner)
          .subscribe({
            next: (data) => {
              res = data;
              console.log(data);
              if (res.code == 100) {
                this.admin.active = false;
                this.transfertoyou = res.obj;
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
  
  printalltransferformyou() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("transferfromyou") as HTMLElement;
    this.gotoanther();
  }

  
  printalltransfertoyou() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("transfertoyouprint") as HTMLElement;
    this.gotoanther();
  }


  gotoanther() {
    setTimeout (() => {
      this.router.navigateByUrl("print");
      },0.1);
  }
}
