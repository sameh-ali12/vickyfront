import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { StoresService } from "../stores/stores.services";
import { SalesManService } from "../salesman/salesman.services";
import { ItinerariesService } from "../itineraries/itineraries.services";
import { ClientsService } from "../clients/clients.services";

@Component({
  selector: "app-rpcarload",
  templateUrl: "rp_carload.component.html",
})
export class Rp_CarloadComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean;
  printmode: boolean = true;
  stores: any;
  sales: any;
  obj: {
    carstore:[]
  };
  getalldata=false;
  itineraries: any;
  clients:any;
  constructor(
    private admin: AdminLayoutComponent,
    private formBuilder: FormBuilder,
    private globals: Globals,
    private router: Router,
    private itinerariesservice: ItinerariesService,
    private salesmanservice: SalesManService,
    private clientservice: ClientsService

  ) {}
  ngOnInit() {
    this.getallsales();
     this.getitineraries();
    this.searchForm = this.formBuilder.group({
      salesman: ["", Validators.required]
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

    var res;
    this.admin.active = true;
    this.salesmanservice.onesales(this.searchForm.value.salesman).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.obj = res.obj;
          this.getalldata = true;
          console.log(this.obj);
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


  getallsales() {
    var res;
    this.admin.active = true;
    this.salesmanservice.getallsales().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.sales = res.obj;
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
  printall() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("carload") as HTMLElement;
    this.gotoanther();
  }
  printdaily() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("dailyrp") as HTMLElement;
    this.gotoanther();
  }

  gotoanther() {
    setTimeout(() => {
      this.router.navigateByUrl("print");
    }, 0.1);
  }


  getitineraries() {
    var res;
    this.admin.active = true;
    this.itinerariesservice.getitineraries().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.itineraries = res.obj;
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
  onChange(target){
    var res;
    this.admin.active = true;
    this.clientservice.getclientsonitinerary(target).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.clients = res.obj;
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
