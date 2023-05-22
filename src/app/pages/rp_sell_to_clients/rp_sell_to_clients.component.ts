import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SuppliersService } from "../suppliers/suppliers.services";
import { TreasuryService } from "../treasuries/treasuries.services";
import { PaymentForSuppliersService } from "../payment_for_suppliers/payment_for_suppliers.services";
import { BuyFromSuppliersService } from "../buy_from_suppliers/buy_from_suppliers.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Globals } from "src/app/globals";
import { Router } from "@angular/router";
import { ClientsService } from "../clients/clients.services";
import { SalesManService } from "../salesman/salesman.services";
import { SellForClientService } from "../sell_for_clients/sell_for_client.services";

@Component({
  selector: "app-rpselltoclients",
  templateUrl: "rp_sell_to_clients.component.html",
})
export class RpSellToClientComponent implements OnInit {
  submitted = false;
  err: boolean;
  suppliers: any;
  treasuries: any;
  message: string;
  dept: any;
  obj: any;
  printmode: boolean;
  total = 0;
  cashed = 0;
  discount = 0;
  clients: any;
  sales: any;
  searchform: FormGroup;
  alldetaails = [];
  groupbyproducts: any;
  selltotal: number;

  constructor(
    private formBuilder: FormBuilder,
    private suppliersservice: SuppliersService,
    private treasuryservice: TreasuryService,
    private paymentforsuppliersservice: PaymentForSuppliersService,
    private admin: AdminLayoutComponent,
    private globals: Globals,
    private router: Router,
    private buyFromsuppliersservice: BuyFromSuppliersService,
    private clientsservice: ClientsService,
    private salesmanservice: SalesManService,
    private sellforslientservice: SellForClientService
  ) {}

  ngOnInit() {
    this.getclients();
    this.getallsales();
    this.searchform = this.formBuilder.group({
      client: [""],
      sales: [""],
      from: ["", Validators.required],
      to: ["", Validators.required],
    });


  }

  // convenience getter for easy access to form fields
  get f() {
    return this.searchform.controls;
  }

  getallsales() {
    var res;
    this.admin.active = true;
    this.salesmanservice.getallsales().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.sales = res.obj;
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

  getclients() {
    var res;
    this.admin.active = true;
    this.clientsservice.getallclients().subscribe({
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
  onSubmit() {
    this.submitted = true;
    this.cashed = 0;
    this.total = 0;
    this.discount = 0;
    this.obj ={};
    this.groupbyproducts = {};
    // stop here if form is invalid
    if (this.searchform.invalid) {
      return;
    }
    if (
      this.searchform.value.client == "all" &&
      this.searchform.value.sales == "all"
    ) {
      var res;
      this.admin.active = true;
      this.sellforslientservice
        .getsellbillswithallclientssanddate(
          this.searchform.value.from,
          this.searchform.value.to
        )
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.err = false;
              this.obj = res.obj;
              console.log(this.obj);
              this.findsum(this.obj);
              this.getsummry(this.obj);
    
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

    if (
      this.searchform.value.client == "all" &&
      this.searchform.value.sales == "allsales"
    ) {
      var res;
      this.admin.active = true;
      this.sellforslientservice
        .getsellbillswithallclientsandallsalesanddate(
          this.searchform.value.from,
          this.searchform.value.to
        )
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.err = false;
              this.obj = res.obj;
              console.log(this.obj);
              this.findsum(this.obj);
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
    if (
      this.searchform.value.client == "all" &&
      this.searchform.value.sales == "store"
    ) {
      var res;
      this.admin.active = true;
      this.sellforslientservice
        .getsellbillswithallclientsandstoreanddate(
          this.searchform.value.from,
          this.searchform.value.to
        )
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.err = false;
              this.obj = res.obj;
              console.log(this.obj);
              this.findsum(this.obj);
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

    if (
      this.searchform.value.client != "all" &&
      this.searchform.value.sales != "store" &&
      this.searchform.value.sales != "allsales"
    ) {
      var res;
      this.admin.active = true;
      this.sellforslientservice
        .getsellbillswithoneclientandonesalesanddate(
          this.searchform.value.sales,
          this.searchform.value.client,
          this.searchform.value.from,
          this.searchform.value.to
        )
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.err = false;
              this.obj = res.obj;
              console.log(this.obj);
              this.findsum(this.obj);
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
    if (
      this.searchform.value.client != "all" &&
      this.searchform.value.sales == "store"
    ) {
      var res;
      this.admin.active = true;
      this.sellforslientservice
        .getsellbillswithoneclientandallstoreanddate(
          this.searchform.value.client,
          this.searchform.value.from,
          this.searchform.value.to
        )
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.err = false;
              this.obj = res.obj;
              console.log(this.obj);
              this.findsum(this.obj);
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


    ///// edit from here
    /// كل العملاء  ومندوب واحد
    
    if (
      this.searchform.value.client == "all" &&
      this.searchform.value.sales != "store" &&
      this.searchform.value.sales != "all" &&
      this.searchform.value.sales != "allsales"
    ) {
      var res;
      this.admin.active = true;
      this.sellforslientservice
        .getsellbillswitallclientandonesalesanddate(
          this.searchform.value.sales,
          this.searchform.value.from,
          this.searchform.value.to
        )
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.err = false;
              this.obj = res.obj;
              console.log(this.obj);
              this.findsum(this.obj);
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
////عميل واحد والكل
    if (
      this.searchform.value.client != "all" &&
      this.searchform.value.sales == "all" 
    ) {
      var res;
      this.admin.active = true;
      this.sellforslientservice
        .getsellbillswithoneclientandallanddate(
          this.searchform.value.client,
          this.searchform.value.from,
          this.searchform.value.to
        )
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.err = false;
              this.obj = res.obj;
              console.log(this.obj);
              this.findsum(this.obj);
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
    /// عميل واحد كل المندوبين
    if (
      this.searchform.value.client != "all" &&
      this.searchform.value.sales != "all" &&
      this.searchform.value.sales == "allsales" 
    ) {
      var res;
      this.admin.active = true;
      this.sellforslientservice
        .getsellbillswithoneclientandallsalesanddate(
          this.searchform.value.client,
          this.searchform.value.from,
          this.searchform.value.to
        )
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.err = false;
              this.obj = res.obj;
              console.log(this.obj);
              this.findsum(this.obj);
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

  print(i) {
    this.printmode = true;
    this.globals.printobj = document.getElementById(i) as HTMLElement;
    this.gotoanther();
  }

  onReset() {
    this.submitted = false;
    this.searchform.reset();
    this.cashed = 0;
    this.total = 0;
    this.discount = 0;
    this.obj={};
  }

  findsum(data) {
    for (let j = 0; j < data.length; j++) {
      this.total += data[j].totalamount;
      this.cashed += data[j].cashed;
      this.discount += data[j].discount;
      data[j].details.forEach(element => {
        this.alldetaails.push(element);
      });
    }

     this.groupbyproducts = this.alldetaails.reduce((acc, item) => {
      let accItem = acc.find(ai => ai.productid._id === item.productid._id)
      if(accItem){
          accItem.realquntity += item.realquntity ;
          accItem.total += (item.quntity * item.price);
          accItem.selltotal += (item.quntity * item.productid.buyprice);
      }else{
        item.total = item.quntity * item.price;
        item.selltotal = item.quntity * item.productid.buyprice;
         acc.push(item)
      }
      return acc;
    },[])
    
  }

  getsummry(obj){
// var accItem  = [];
//     obj.forEach(element => {
//       const calculated = element.details.reduce((acc, item) => {
//         console.log(acc);
//         console.log(item);
//          accItem = acc.find(ai => ai.productid._id === item.productid._id);
//         if(accItem){
//             accItem[0].quntity += item[0].quntity
//         }else{
//            acc.push(item)
//         }
//         return acc;
//       },[])
      
//       // console.log(calculated)
//     });
  
  }



  printall() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("alldoc") as HTMLElement;
    this.gotoanther();
  }

  gotoanther() {
    setTimeout(() => {
      this.router.navigateByUrl("print");
    }, 0.1);
  }

  remove(id){
    console.log(id);
    
  }

}
