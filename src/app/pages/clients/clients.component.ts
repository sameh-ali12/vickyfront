import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ItinerariesService } from "../itineraries/itineraries.services";
import { ClientsService } from "./clients.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";

@Component({
  selector: "app-clients",
  templateUrl: "clients.component.html",
})
export class ClientsComponent implements OnInit {
  clientsForm: FormGroup;
  submitted = false;
  itineraries: any;
  err: boolean;
  clients: any;
  obj: {
    name: any;
    address: any;
    phonenumber: any;
    itineraries: any;
    user: string;
    debtvalue:Number
  };
  editmode: boolean = false;
  id: any;

  constructor(
    private admin: AdminLayoutComponent,
    private clientservice: ClientsService,
    private itinerariesservice: ItinerariesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getclients();
    this.getitineraries();
    this.clientsForm = this.formBuilder.group({
      name: ["", Validators.required],
      address: ["", Validators.required],
      phonenumber: ["", Validators.required],
      itineraries: ["", Validators.required],
      debtvalue:[0]
    });
  }

  get f() {
    return this.clientsForm.controls;
  }

  onSubmit() {
    this.admin.active = true;
    this.submitted = true;
    var res;
    if (this.clientsForm.invalid) {
      return;
    }
    this.obj = {
      name: this.clientsForm.value.name,
      address: this.clientsForm.value.address,
      phonenumber: this.clientsForm.value.phonenumber,
      itineraries: this.clientsForm.value.itineraries,
      user: localStorage.getItem("userid"),
      debtvalue:this.clientsForm.value.debtvalue
    };
    if(this.editmode == true){

   this.clientservice.updateclient(this.id,this.obj).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
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
    this.editmode = false;
    this.id = "";
    }
    else{
      this.clientservice.addclient(this.obj).subscribe({
        next: (data) => {
          res = data;
          if (res.code == 100) {
            this.admin.active = false;
            this.err = false;
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
    this.getclients();
    this.onReset();
  }
  onReset() {
    this.submitted = false;
    this.clientsForm.reset();
  }
  getitineraries() {
    var res;
    this.admin.active = true;
    this.itinerariesservice.getitineraries().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.itineraries = res.obj;
          console.log(this.itineraries);
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


  getclients() {
    var res;
    this.admin.active = true;
    this.clientservice.getallclients().subscribe({
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


  edit(client){
    console.log(client);
    this.editmode = true;
    this.id = client._id;
    this.clientsForm.patchValue({
      name: client.name,
      address: client.address,
      phonenumber:client.phonenumber,
      itineraries:client.itineraries._id,
      debtvalue:client.debtvalue
    });
  }


}
