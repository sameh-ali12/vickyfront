import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { ItinerariesService } from "../itineraries/itineraries.services";
import { ClientsService } from "../clients/clients.services";
@Component({
  selector: "app-rp_discount_for_clients",
  templateUrl: "rp_discount_for_clients.component.html",
})
export class Rp_Discount_for_ClientsComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean;
  printmode: boolean = true;
  itineraries: any;
  obj: any;
  clients: any;
  totaldebtvalue = 0;
  selectedclient: any;

  constructor(
    private admin: AdminLayoutComponent,
    private formBuilder: FormBuilder,
    private globals: Globals,
    private router: Router,
    private itinerariesservice: ItinerariesService,
    private clientsservice: ClientsService
  ) {}
  ngOnInit() {
    this.getclients();
    this.searchForm = this.formBuilder.group({
      client: [""],
      from: ["", Validators.required],
      to: ["", Validators.required],
    });
  }
  get s() {
    return this.searchForm.controls;
  }
  onSubmitsearch() {
    this.printmode = false;
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    this.totaldebtvalue = 0;
    var res;
    this.admin.active = true;
    this.clientsservice
      .discountwithclientanddate(
        this.selectedclient._id,
        this.searchForm.value.from,
        this.searchForm.value.to
      )
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

  onRest() {
    this.searchForm.reset();
    this.ngOnInit();
    this.printmode = true;
    this.clearPanel();
    this.totaldebtvalue = 0;
  }
  
  keyword = "name";
  selectEvent(item) {
  this.selectedclient = item;
  }

  @ViewChild('auto') auto;
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
  
  findsum(data) {
    for (let j = 0; j < data.length; j++) {
      this.totaldebtvalue += data[j].value;
    }
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
