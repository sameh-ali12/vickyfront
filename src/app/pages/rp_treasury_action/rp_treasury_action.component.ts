import { Component, OnInit } from "@angular/core";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Globals } from "../../globals";
import {TreasuryService} from "../treasuries/treasuries.services";


@Component({
  selector: "app-rp_treasuryaction",
  templateUrl: "rp_treasury_action.component.html",
})
export class RP_TreasuryActionComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean = false;
  message: string;
  err: boolean;
  printmode: boolean;
  stores: any;
  obj: any;
  treasuries: any;
  constructor(
    private formBuilder: FormBuilder,
    private admin: AdminLayoutComponent,
    private treasuryservice: TreasuryService,
    private router: Router,
    private globals: Globals
  ) {}

  ngOnInit() {
    this.getalltreasury();
    this.searchForm = this.formBuilder.group({
      treasury: ["", Validators.required],
      from: ["", Validators.required],
      to: ["", Validators.required]
    });
  }
  get s() {
    return this.searchForm.controls;
  }

  getalltreasury() {
    var res;
    this.admin.active = true;
    this.treasuryservice.getalltreasuries().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.treasuries = res.obj;
        } else {
          this.admin.active = false;
        }
      },
      error: (error) => {
        alert(error);
        this.admin.active = false;
        this.err = true;
      },
    });
  }
  
  onSubmitsearch() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }else{
      var res;
      this.admin.active = true;
      this.treasuryservice.gettreasuryaction(this.searchForm.value.treasury,this.searchForm.value.from,this.searchForm.value.to).subscribe({
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
          console.log(error);
          this.admin.active = false;
        },
      });
  

    }

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
