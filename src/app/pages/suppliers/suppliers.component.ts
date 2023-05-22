import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SuppliersService} from "./suppliers.services";
import {AdminLayoutComponent} from "../../layouts/admin-layout/admin-layout.component";
import { Router } from "@angular/router";
import { Globals } from "src/app/globals";


@Component({
  selector: "app-suppliers",
  templateUrl: "suppliers.component.html"
})
export class SuppliersComponent implements OnInit {
  suppliersForm: FormGroup;
  submitted = false;
  err: boolean;
  suppliers: any;
  obj: { name: any; phonenumber: any; address: any; notes: any; user: string; };
  total = 0;
  printmode: boolean;

  constructor(private globals: Globals,private router: Router,private admin:AdminLayoutComponent ,private suppliersservice:SuppliersService,private formBuilder: FormBuilder) { }

  ngOnInit() {
  
this.getallsuppliers();
      this.suppliersForm = this.formBuilder.group({
        suppliername: ['', Validators.required],
        phonenumber: ['', Validators.required],
        address: ['', Validators.required],
        notes:['']
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.suppliersForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.suppliersForm.invalid) {
          return;
      }
this.obj= {
  name:this.suppliersForm.value.suppliername,
  phonenumber:this.suppliersForm.value.phonenumber,
  address:this.suppliersForm.value.address,
  notes:this.suppliersForm.value.notes,
  user:localStorage.getItem('userid')
}


      var res;
      this.admin.active = true;
      this.suppliersservice.addsupplier(this.obj).subscribe({
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
this.getallsuppliers();
      this.onReset();
  }

  onReset() {
      this.submitted = false;
      this.suppliersForm.reset();
  }

  getallsuppliers(){
    var res;
    this.admin.active = true;
    this.suppliersservice.getallsuppliers().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.suppliers = res.obj;
          this.findsum(this.suppliers);
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
  
  
  findsum(data) {
    for (let j = 0; j < data.length; j++) {
      console.log(data[j]);
      this.total += data[j].value;
    }
  }

  printall() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("suppliers") as HTMLElement;
    this.gotoanther();
  }

  gotoanther() {
    setTimeout(() => {
      this.router.navigateByUrl("print");
    }, 0.1);
  }



}