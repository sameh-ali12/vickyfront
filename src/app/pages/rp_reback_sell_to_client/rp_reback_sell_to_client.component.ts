import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SuppliersService } from "../suppliers/suppliers.services";
import { TreasuryService } from "../treasuries/treasuries.services";
import { PaymentForSuppliersService } from "../payment_for_suppliers/payment_for_suppliers.services";
import {BuyFromSuppliersService} from "../buy_from_suppliers/buy_from_suppliers.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Globals } from "src/app/globals";
import { Router } from "@angular/router";
import { ClientsService } from "../clients/clients.services";
import {SellForClientService} from "../sell_for_clients/sell_for_client.services";

@Component({
  selector: "app-rprebackselltoclient",
  templateUrl: "rp_reback_sell_to_client.component.html",
})
export class RpReBackBuyToClientComponent implements OnInit {
  submitted = false;
  err: boolean;
  suppliers: any;
  treasuries: any;
  message: string;
  dept: any;
  obj: any;
  printmode: boolean;
  total = 0;
  cashed = 0;
  clients: any;
  searchfrom: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private suppliersservice: SuppliersService,
    private treasuryservice: TreasuryService,
    private paymentforsuppliersservice: PaymentForSuppliersService,
    private admin: AdminLayoutComponent,
    private globals: Globals,
    private router: Router,
    private buyFromsuppliersservice:BuyFromSuppliersService,
    private clientsservice: ClientsService,
    private sellforclientservice:SellForClientService

  ) {}

  ngOnInit() {
    this.getclients();
    this.searchfrom = this.formBuilder.group({
      client: ["", Validators.required],
      from: ["", Validators.required],
      to: ["", Validators.required]
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

  // convenience getter for easy access to form fields
  get f() {
    return this.searchfrom.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.searchfrom.invalid) {
      return;
    }
    var res;
    this.admin.active = true;
    this.sellforclientservice.getrebacksellbillswithclientanddate(this.searchfrom.value.client,this.searchfrom.value.from,this.searchfrom.value.to).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.obj = res.obj;
          console.log(this.obj);
        } else {
          this.admin.active = false;
          this.err = true;
        }
      },
      error: (error) => {
        alert(error);
        console.log(error);
        this.admin.active = false;
        this.err = true;
      },
    });
  }

  print(i) {
    this.printmode = true;
    this.globals.printobj = document.getElementById(i) as HTMLElement;
    this.gotoanther();
  }


  onReset() {
    this.submitted = false;
    this.searchfrom.reset();
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
