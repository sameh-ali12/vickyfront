import { Component, OnInit } from "@angular/core";
import { AddLoginService } from "../login/login.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LiquidateService } from "../liquidate_accounts/liquidate.services";
import { PartnerSellService } from "../partner_sell/partner_sell.services";
import { Router } from "@angular/router";
import { Globals } from "../../globals";
import { StoresService } from "../stores/stores.services";
import { ClientsService } from "../clients/clients.services";


@Component({
  selector: "app-rp_clientaction",
  templateUrl: "rp_client_action.component.html",
})
export class RP_ClientActionComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean = false;
  message: string;
  err: boolean;
  printmode: boolean;
  obj: any;
  clients: any;
  constructor(
    private formBuilder: FormBuilder,
    private admin: AdminLayoutComponent,
    private storesservice: StoresService,
    private router: Router,
    private globals: Globals,
    private clientsservice: ClientsService,

  ) {}

  ngOnInit() {
    this.getclients();
    this.searchForm = this.formBuilder.group({
      client: ["", Validators.required],
      from: ["", Validators.required],
      to: ["", Validators.required]
    });
  }
  get s() {
    return this.searchForm.controls;
  }

  onSubmitsearch() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }else{
      var res;
      this.admin.active = true;
      this.clientsservice.getclientactions(this.searchForm.value.client,this.searchForm.value.from,this.searchForm.value.to).subscribe({
        next: (data) => {
          res = data;
          if (res.code == 100) {
            this.admin.active = false;
            this.obj = res.obj;
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

  onRest() {
    this.searchForm.reset();
    this.ngOnInit();
    }


    print(i) {
      this.printmode = true;
      this.globals.printobj = document.getElementById(i) as HTMLElement;
      this.gotoanther();
    }
   
  
  
    gotoanther() {
      setTimeout (() => {
        this.router.navigateByUrl("print");
        },0.1);
    }
}
