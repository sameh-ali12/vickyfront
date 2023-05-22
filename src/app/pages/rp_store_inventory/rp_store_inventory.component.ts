import { Component, OnInit, Pipe } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { StoresService } from "../stores/stores.services";
import { TransferProductsBetweenStoresService } from "../transferproductsbetweenstores/transferproductsbetweenstores.services";
import { ProductsService } from "../products/products.services";

@Component({
  selector: "app-rp_store_inventory",
  templateUrl: "rp_store_inventory.component.html",
})
export class Rp_Store_InventoryComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean;
  printmode: boolean = true;
  stores: any;
  obj: any;
  products: any;
  singleproduct: boolean;
  multiproduct: boolean;
  allstoreoneproduct: boolean;
  allstoreallproduct: boolean;
  allstores: boolean;
  details: boolean;
  detailsobj: { element: any; obj: any };
  total: any = 0;
  constructor(
    private admin: AdminLayoutComponent,
    private formBuilder: FormBuilder,
    private globals: Globals,
    private router: Router,
    private storesservice: StoresService,
    private transferproductsbetweenstoresservice: TransferProductsBetweenStoresService,
    private productsservice: ProductsService
  ) {}
  ngOnInit() {
    this.getallstores();
    this.getallproduct();
    this.searchForm = this.formBuilder.group({
      store: [""],
      product: [""],
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
    this.details = false;

    if (
      this.searchForm.value.store != "all" &&
      this.searchForm.value.product == "all"
    ) {
      this.multiproduct = true;
      this.singleproduct = false;
      this.obj = {};
      var res;
      this.admin.active = true;
      console.log(this.searchForm.value.store);
      this.storesservice
        .inventorywithsinglestoreandallproducts(this.searchForm.value.store)
        .subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.obj = res.obj;
              this.findsum(this.obj);
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

    if (
      this.searchForm.value.store != "all" &&
      this.searchForm.value.product != "all"
    ) {
      this.singleproduct = true;
      this.multiproduct = false;
      this.obj = {};

      var res;
      this.admin.active = true;
      this.storesservice
        .inventorywithsingleproductandsinglestore(
          this.searchForm.value.store,
          this.searchForm.value.product
        )
        .subscribe({
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

    if (
      (this.searchForm.value.store == "all" &&
        this.searchForm.value.product != "all") ||
      (this.searchForm.value.store == "all" &&
        this.searchForm.value.product == "all")
    ) {
      this.singleproduct = false;
      this.multiproduct = false;
      this.allstores = true;
      this.obj = {};
      if (this.searchForm.value.product != "all") {
        this.allstoreoneproduct = true;
        this.allstoreallproduct = false;
      } else {
        this.allstoreoneproduct = false;
        this.allstoreallproduct = true;
      }

      var res;
      this.admin.active = true;
      this.storesservice.inventorywithallproductandallstores().subscribe({
        next: (data) => {
          res = data;
          console.log(res);
          if (res.code == 100) {
            this.admin.active = false;
            this.obj = res.obj;
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

  findsum(data) {
var x = data[0];
    for (let j = 0; j < x.products.length; j++) {
      if (x.products[j].quantity != 0) {
       this.total += x.products[j].quantity  * (x.products[j].productid.sellprice /  x.products[j].productid.countunit); 
        // this.total +=  x.products[j].quantity 
          // (data[0].products[j].productid.sellprice / data[0].products[j].productid.countunit);
      }
    }
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

  getdetails(element) {
    this.singleproduct = false;
    this.multiproduct = false;
    this.allstores = false;
    this.details = true;

    var res;
    this.admin.active = true;
    this.storesservice.detailssumproducts(element._id._id).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.detailsobj = {
            element: element,
            obj: [],
          };

          for (let index = 0; index < res.obj.length; index++) {
            const element2 = res.obj[index].products;
            let x = element2.filter(
              (x) => x.productid._id == element._id._id && x.quantity > 0
            );
            if (x != "") {
              this.detailsobj.obj.push({
                _id: res.obj[index]._id,
                name: res.obj[index].name,
                products: res.obj[index].products,
              });
            }
          }

          console.log(this.detailsobj);
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
  printall() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("carupload") as HTMLElement;
    this.gotoanther();
  }
  gotoanther() {
    setTimeout(() => {
      this.router.navigateByUrl("print");
    }, 0.1);
  }
}
