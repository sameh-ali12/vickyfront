import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { StoresService } from "../stores/stores.services";
import {TransferProductsBetweenStoresService} from "../transferproductsbetweenstores/transferproductsbetweenstores.services";

@Component({
  selector: "app-rp_transfer_products",
  templateUrl: "rp_transfer_products.component.html",
})
export class Rp_Transfer_ProductsComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean;
  printmode: boolean = true;
  stores: any;
  sales: any;
  obj: any;
  constructor(
    private admin: AdminLayoutComponent,
    private formBuilder: FormBuilder,
    private globals: Globals,
    private router: Router,
    private storesservice: StoresService,
    private transferproductsbetweenstoresservice:TransferProductsBetweenStoresService
  ) {}
  ngOnInit() {
    this.getallstores();
    this.searchForm = this.formBuilder.group({
      status: ["",Validators.required],
      from: [""],
      to: [""],
      store: ["", Validators.required]
    });
  }
  get s() {
    return this.searchForm.controls;
  }

  onSubmitsearch() {
    this.printmode = false;
    this.obj = [];

    this.submitted = true;
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }

if(this.searchForm.value.status == 1 && this.searchForm.value.from ==""&&this.searchForm.value.to ==""){

      var res;
      this.admin.active = true;
      this.transferproductsbetweenstoresservice.transferproductsfromstore(this.searchForm.value.store).subscribe({
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
if(this.searchForm.value.status == 2 && this.searchForm.value.from ==""&&this.searchForm.value.to ==""){
  var res;
  this.admin.active = true;
  this.transferproductsbetweenstoresservice.transferproductstostore(this.searchForm.value.store).subscribe({
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
if(this.searchForm.value.status == 2 && this.searchForm.value.from !=""&&this.searchForm.value.to !=""){

  var res;
  this.admin.active = true;
  this.transferproductsbetweenstoresservice.transferproductstostoreanddate(this.searchForm.value.store,this.searchForm.value.from,this.searchForm.value.to).subscribe({
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

if(this.searchForm.value.status == 1 && this.searchForm.value.from !=""&&this.searchForm.value.to !=""){
  var res;
  this.admin.active = true;
  this.transferproductsbetweenstoresservice.transferproductsfromstoreanddate(this.searchForm.value.store,this.searchForm.value.from,this.searchForm.value.to).subscribe({
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
      // alert(error);
      console.log(error);
      this.admin.active = false;
    },
  });
}

    // //sales
    // if(this.searchForm.value.sales != "" && this.searchForm.value.store == "" && this.searchForm.value.to == "" && this.searchForm.value.from == ""){
    //   var res;
    //   this.admin.active = true;
    //   this.caruploadservice.cardownloadwithsales(this.searchForm.value.sales).subscribe({
    //     next: (data) => {
    //       res = data;
    //       if (res.code == 100) {
    //         this.admin.active = false;
    //         this.obj = res.obj;
    //         console.log(this.obj);
    //       } else {
    //         this.admin.active = false;
    //       }
    //     },
    //     error: (error) => {
    //       alert(error);
    //       this.admin.active = false;
    //     },
    //   });
    // }
    // //store
    // if(this.searchForm.value.sales == "" && this.searchForm.value.store != "" && this.searchForm.value.to == "" && this.searchForm.value.from == ""){
    //   var res;
    //   this.admin.active = true;
    //   this.caruploadservice.cardownloadwithstore(this.searchForm.value.store).subscribe({
    //     next: (data) => {
    //       res = data;
    //       if (res.code == 100) {
    //         this.admin.active = false;
    //         this.obj = res.obj;

    //       } else {
    //         this.admin.active = false;
    //       }
    //     },
    //     error: (error) => {
    //       alert(error);
    //       this.admin.active = false;
    //     },
    //   });
    // }
    // //sales,store,date
    // if(this.searchForm.value.sales != "" && this.searchForm.value.store != "" && this.searchForm.value.to != "" && this.searchForm.value.from != ""){
    //   var res;
    //   this.admin.active = true;
    //   this.caruploadservice.cardownloadwithstoreandsalesanddate(this.searchForm.value.sales,this.searchForm.value.store,this.searchForm.value.from,this.searchForm.value.to).subscribe({
    //     next: (data) => {
    //       res = data;
    //       if (res.code == 100) {
    //         this.admin.active = false;
    //         this.obj = res.obj;
    //       } else {
    //         this.admin.active = false;
    //       }
    //     },
    //     error: (error) => {
    //       alert(error);
    //       this.admin.active = false;
    //     },
    //   });
    // }
    // //sales,date
    // if(this.searchForm.value.sales != "" && this.searchForm.value.store == "" && this.searchForm.value.to != "" && this.searchForm.value.from != ""){
    //   var res;
    //   this.admin.active = true;
    //   this.caruploadservice.cardownloadwithsalesanddate(this.searchForm.value.sales,this.searchForm.value.from,this.searchForm.value.to).subscribe({
    //     next: (data) => {
    //       res = data;
    //       if (res.code == 100) {
    //         this.admin.active = false;
    //         this.obj = res.obj;
    //         console.log(this.obj);
    //       } else {
    //         this.admin.active = false;
    //       }
    //     },
    //     error: (error) => {
    //       alert(error);
    //       this.admin.active = false;
    //     },
    //   });
    // }
    // //store,date
    // if(this.searchForm.value.sales == "" && this.searchForm.value.store != "" && this.searchForm.value.to != "" && this.searchForm.value.from != ""){
    //   var res;
    //   this.admin.active = true;
    //   this.caruploadservice.cardownloadwithstoreanddate(this.searchForm.value.store,this.searchForm.value.from,this.searchForm.value.to).subscribe({
    //     next: (data) => {
    //       res = data;
    //       if (res.code == 100) {
    //         this.admin.active = false;
    //         this.obj = res.obj;
    //       } else {
    //         this.admin.active = false;
    //       }
    //     },
    //     error: (error) => {
    //       alert(error);
    //       this.admin.active = false;
    //     },
    //   });
    // }
    // //store,sales
    // if(this.searchForm.value.sales != "" && this.searchForm.value.store != "" && this.searchForm.value.to == "" && this.searchForm.value.from == ""){
    //   var res;
    //   this.admin.active = true;
    //   this.caruploadservice.cardownloadwithsalesandstore(this.searchForm.value.sales,this.searchForm.value.store).subscribe({
    //     next: (data) => {
    //       res = data;
    //       if (res.code == 100) {
    //         this.admin.active = false;
    //         this.obj = res.obj;
    //       } else {
    //         this.admin.active = false;
    //       }
    //     },
    //     error: (error) => {
    //       alert(error);
    //       this.admin.active = false;
    //     },
    //   });
    // }
  }

  getallstores() {
    var res;
    this.admin.active = true;
    this.storesservice.getstores().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.stores = res.obj;
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
  printall(){
    this.printmode = true;
    this.globals.printobj = document.getElementById("carupload") as HTMLElement;
    this.gotoanther();
  }

  gotoanther() {
    setTimeout (() => {
      this.router.navigateByUrl("print");
      },0.1);
  }
}
