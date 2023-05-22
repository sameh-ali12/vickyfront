import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ItinerariesService } from "./itineraries.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";

@Component({
  selector: "app-itineraries",
  templateUrl: "itineraries.component.html",
})
export class ItinerariesComponent implements OnInit {
  itineraryForm: FormGroup;
  submitted = false;
  obj: { name: any; notes: any; user: string };
  err: boolean;
  itineraries: any;
  editmode: boolean = false;
  id: any;

  constructor(
    private admin: AdminLayoutComponent,
    private itinerariesservice: ItinerariesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getitineraries();
    this.itineraryForm = this.formBuilder.group({
      name: ["", Validators.required],
      notes: [""]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.itineraryForm.controls;
  }

  onSubmit() {
    this.admin.active = true;
    this.submitted = true;
    var res;
    // stop here if form is invalid
    if (this.itineraryForm.invalid) {
      return;
    }
    this.obj = {
      name: this.itineraryForm.value.name,
      notes: this.itineraryForm.value.notes,
      user: localStorage.getItem("userid")
    };
    
    if(this.editmode == true){
  
      this.itinerariesservice.edititinerary(this.id,this.obj).subscribe({
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
      
      this.id = "";
      this.editmode = false;
    }else{
    
  
      this.itinerariesservice.additierary(this.obj).subscribe({
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
    

    this.onReset();
    this.getitineraries();
    }

  onReset() {
    this.submitted = false;
    this.itineraryForm.reset();
  }


  edit(product){
    this.editmode = true;
    this.id = product._id;
    this.itineraryForm.patchValue({
      name: product.name,
      notes: product.notes
    });
  }

  getitineraries(){
    var res;
    this.admin.active = true;
    this.itinerariesservice.getitineraries().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.itineraries = res.obj;
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
}
