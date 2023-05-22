import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { ItinerariesService } from "../itineraries/itineraries.services";
import { ClientsService } from "../clients/clients.services";

@Component({
  selector: "app-rp_debtـclients",
  templateUrl: "rp_debtـclients.component.html",
})
export class Rp_Debt_ClientsComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean;
  printmode: boolean = true;
  itineraries: any;
  obj: any;
  selected = [];
  clients: any;
  totaldebtvalue = 0;
  totalchecksvalue = 0;
  constructor(
    private admin: AdminLayoutComponent,
    private formBuilder: FormBuilder,
    private globals: Globals,
    private router: Router,
    private itinerariesservice: ItinerariesService,
    private clientsservice: ClientsService
  ) {}
  ngOnInit() {
    this.getitineraries();
    this.getclients();
    this.searchForm = this.formBuilder.group({
      itinerary: [""]
    });
  }

  getSelectedValue() {
    console.log(this.selected);
  }

  get s() {
    return this.searchForm.controls;
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
  onSubmitsearch() {
    this.printmode = false;
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    this.totaldebtvalue  = 0;
    this.totalchecksvalue = 0;
    if (this.searchForm.value.itinerary != "all" && this.selected.length == 0) {
      var res;
      this.admin.active = true;
      this.clientsservice
        .getclientsonitinerary(this.searchForm.value.itinerary)
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.obj = res.obj;
              this.findsum(this.obj);
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
    if (this.searchForm.value.itinerary == "all" && this.selected.length == 0) {
      var res;
      this.admin.active = true;
      this.clientsservice.getallclients().subscribe({
        next: (data) => {
          res = data;
          if (res.code == 100) {
            this.admin.active = false;
            this.obj = res.obj;
            this.findsum(this.obj);
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

    if (this.selected.length != 0) {
      console.log(this.selected);
      this.obj = this.selected;
      this.findsum(this.obj);
    }
  }

  findsum(data) {
    for (let j = 0; j < data.length; j++) {
      this.totaldebtvalue += data[j].debtvalue;
      this.totalchecksvalue += data[j].checksvalue;
    }
  }

  onRest() {
    this.searchForm.reset();
    this.ngOnInit();
    this.printmode = true;
    this.selected = [];
    this.obj = [];
    this.totaldebtvalue = 0;
    this.totalchecksvalue = 0;
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

  printall() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("clients") as HTMLElement;
    this.gotoanther();
  }

  gotoanther() {
    setTimeout(() => {
      this.router.navigateByUrl("print");
    }, 0.1);
  }
}
