import { Component, OnInit } from "@angular/core";
import { AddLoginService } from "../login/login.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LiquidateService } from "../liquidate_accounts/liquidate.services";
import { PartnerSellService } from "../partner_sell/partner_sell.services";
import { Router } from "@angular/router";
import { Globals } from "../../globals";
import { StoresService } from "../stores/stores.services";
import { ProductsService } from "../products/products.services";


@Component({
  selector: "app-rp_productaction",
  templateUrl: "rp_product_action.component.html",
})
export class RP_ProductActionComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean = false;
  message: string;
  err: boolean;
  printmode: boolean;
  stores: any;
  obj: any;
  selectedproduct: any;
  products: any;
  constructor(
    private formBuilder: FormBuilder,
    private admin: AdminLayoutComponent,
    private storesservice: StoresService,
    private router: Router,
    private globals: Globals,
    private productsservice: ProductsService,

  ) {}

  ngOnInit() {
    this.getallproduct();
    this.searchForm = this.formBuilder.group({
      product: [""],
      from: ["", Validators.required],
      to: ["", Validators.required]
    });
  }
  get s() {
    return this.searchForm.controls;
  }
  keyword = "name";
  
  selectEvent(item) {
    // do something with selected item
    var currentproduct = this.products.find((x) => x._id === item._id);
    this.selectedproduct = currentproduct;
  }

  onSubmitsearch() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }else{
      var res;
      this.admin.active = true;
      this.productsservice.productactions(this.selectedproduct._id,this.searchForm.value.from,this.searchForm.value.to).subscribe({
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

  }

  getallproduct() {
    var res;
    this.productsservice.getallproducts().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.products = res.obj;
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
