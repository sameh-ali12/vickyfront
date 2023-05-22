import { Component, OnInit } from "@angular/core";
import { AddLoginService } from "../login/login.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LiquidateService } from "../liquidate_accounts/liquidate.services";
import { PartnerSellService } from "../partner_sell/partner_sell.services";
import { Router } from "@angular/router";
import { Globals } from "../../globals";


@Component({
  selector: "app-rp_liquidateaccounts",
  templateUrl: "rp_liquidate_accounts.component.html",
})
export class RP_LiquidateAccountsComponent implements OnInit {
  users: any;
  searchForm: FormGroup;
  submitted: boolean = false;
  liquidates: any;
  selecteduser: {
    sellbills: [];
    buybills: [];
    transferfromhim: [];
    transferfromus: [];
    value: any;
  };
  sellbills: [];
  buybills: [];
  transferfromhim: [];
  transferfromus: [];
  bill: any;
  message: string;
  err: boolean;
  printmode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private admin: AdminLayoutComponent,
    private addloginservice: AddLoginService,
    private LiquidateService: LiquidateService,
    private router: Router,
    private globals: Globals
  ) {}

  ngOnInit() {
    this.getallowedusers();
    // this.getliquidation();
    this.searchForm = this.formBuilder.group({
      partner: ["", Validators.required],
      from: [""],
      to: [""]
    });
  }
  get s() {
    return this.searchForm.controls;
  }

  onSubmitsearch() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }else{
    

      if(this.searchForm.value.to==""&&this.searchForm.value.from==""&&this.searchForm.value.partner!=""){
        this.liquidates = {};
        var res;
        this.admin.active = true;
        this.LiquidateService.liquidationwithparnter(this.searchForm.value.partner).subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.liquidates = res.obj;
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
      else{
        this.liquidates = {};
        var res;
        this.admin.active = true;
        this.LiquidateService.liquidationwithparnteranddate(this.searchForm.value.partner,this.searchForm.value.from,this.searchForm.value.to).subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.liquidates = res.obj;
              console.log(this.liquidates);
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

  }
  getallowedusers() {
    var res;
    this.admin.active = true;
    this.addloginservice.getallowedusers().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.users = res.obj;
          console.log(this.users);
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
