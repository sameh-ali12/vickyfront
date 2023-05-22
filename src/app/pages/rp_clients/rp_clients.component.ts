import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { ItinerariesService } from "../itineraries/itineraries.services";
import { ClientsService } from "../clients/clients.services";
@Component({
  selector: "app-rp_clients",
  templateUrl: "rp_clients.component.html",
})
export class Rp_ClientsComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean;
  printmode: boolean = true;
  itineraries: any;
  obj: any;

  constructor(
    private admin: AdminLayoutComponent,
    private formBuilder: FormBuilder,
    private globals: Globals,
    private router: Router,
    private itinerariesservice: ItinerariesService,
    private clientsservice:ClientsService

  ) {}
  ngOnInit() {
    this.getitineraries();
    this.searchForm = this.formBuilder.group({
      itinerary: ["", Validators.required]
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
    var res;
    this.admin.active = true;
    this.clientsservice.getclientsonitinerary(this.searchForm.value.itinerary).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.obj = res.obj;
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

  onRest() {
    this.searchForm.reset();
    this.ngOnInit();
    this.printmode = true;
    }

 
  getitineraries(){
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
    setTimeout (() => {
      this.router.navigateByUrl("print");
      },0.1);
  }
}
