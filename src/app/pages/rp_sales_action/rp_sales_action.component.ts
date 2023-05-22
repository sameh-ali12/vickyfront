import { Component, OnInit } from "@angular/core";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Globals } from "../../globals";
import { StoresService } from "../stores/stores.services";
import { ProductsService } from "../products/products.services";
import { SalesManService } from "../salesman/salesman.services";

@Component({
  selector: "app-rp_salesaction",
  templateUrl: "rp_sales_action.component.html",
})
export class RP_SalesActionComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean = false;
  message: string;
  err: boolean;
  printmode: boolean;
  obj: any;
  products: any;
  selectedproduct: any;
  subobj: any =[];
  productaction: boolean = false;
  searchobj: {};
  sales: any;

  constructor(
    private formBuilder: FormBuilder,
    private admin: AdminLayoutComponent,
    private storesservice: StoresService,
    private router: Router,
    private globals: Globals,
    private productsservice: ProductsService,
    private salesmanservice: SalesManService

  ) {}

  ngOnInit() {
    this.getallsales();
    this.getallproduct();
    this.searchForm = this.formBuilder.group({
      sales: ["", Validators.required],
      from: ["", Validators.required],
      to: ["", Validators.required],
    });
    this.selectedproduct = {};
  }
  get s() {
    return this.searchForm.controls;
  }

  onSubmitsearch() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    } else {
      this.subobj=[];
      this.obj = {};
      var x = this.sales.filter((x) => x._id == this.searchForm.value.sales);

      this.searchobj = {
        from:this.searchForm.value.from,
        to:this.searchForm.value.to,
        sales:x[0].name
      }
      if (this.selectedproduct._id == undefined) {

        var res;
        this.admin.active = true;
        this.salesmanservice
          .caractions(
            this.searchForm.value.sales,
            this.searchForm.value.from,
            this.searchForm.value.to
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
      } else {
         this.productaction = true;
        var res;
        this.admin.active = true;
        this.salesmanservice
          .caractionswithproducts(
            this.searchForm.value.sales,
            this.selectedproduct._id,
            this.searchForm.value.from,
            this.searchForm.value.to
          )
          .subscribe({
            next: (data) => {
              res = data;
              console.log(res.obj);
              if (res.code == 100) {
                this.admin.active = false;
                this.obj = res.obj;
                for (const index in this.obj) {
                  if (this.obj[index].cardownload.status) {
                    var x = this.obj[index].cardownload.cardownloadid.details.filter((x) => x.productid._id == this.selectedproduct._id);
                    this.subobj.push({
                      obj: x[0],
                      type: "cardownload",
                      id: this.obj[index].cardownload.cardownloadid._id,
                      // contactname: this.obj[index].cardownload.cardownloadid.details.store.name,
                      contactname: "",
                      date: this.obj[index].cardownload.cardownloadid.daterecived,
                      billno:""
                    });
                  }
                  if (this.obj[index].carupload.status) {
                    var x = this.obj[index].carupload.caruploadid.details.filter((x) => x.productid._id == this.selectedproduct._id);
                    this.subobj.push({
                      obj: x[0],
                      type: "carupload",
                      id: this.obj[index].carupload.caruploadid._id,
                      // contactname: this.obj[index].carupload.caruploadid.details.store.name,
                      contactname: "",
                      date: this.obj[index].carupload.caruploadid.daterecived,
                      billno:""
                    });
                  }
                  if (this.obj[index].selltoclients.status) {
                    var x = this.obj[index].selltoclients.billid.details.filter((x) => x.productid._id == this.selectedproduct._id);
                    this.subobj.push({
                      obj: x[0],
                      type: "selltoclients",
                      id: this.obj[index].selltoclients.billid._id,
                      contactname: this.obj[index].selltoclients.billid,
                      date: this.obj[index].daterecived,
                      billno:this.obj[index].selltoclients.billid.billno
                    });
                  }
                  if (this.obj[index].transferproductsto.status) {
                    var x = this.obj[index].transferproductsto.transferid.details.filter((x) => x.productid._id == this.selectedproduct._id);
                    this.subobj.push({
                      obj: x[0],
                      type: "transferproductsto",
                      id: this.obj[index].transferproductsto.transferid._id,
                      contactname: this.obj[index].transferproductsto.transferid,
                      date: this.obj[index].daterecived,
                      billno:""
                    });
                  }
                  if (this.obj[index].transferproductsfrom.status) {
                    var x = this.obj[index].transferproductsfrom.transferid.details.filter((x) => x.productid._id == this.selectedproduct._id );
                    this.subobj.push({
                      obj: x[0],
                      type: "transferproductsfrom",
                      id: this.obj[index].transferproductsfrom.transferid._id,
                      contactname: this.obj[index].transferproductsfrom.transferid,
                      date: this.obj[index].daterecived,
                      billno:""
                    });
                  }
                }
                console.log(this.subobj);
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

  onRest() {
    this.searchForm.reset();
    this.selectedproduct = {};
    this.products = [];
    this.ngOnInit();
    this.productaction = false;
  }

  keyword = "name";
  selectEvent(item) {
    var currentproduct = this.products.find((x) => x._id === item._id);
    this.selectedproduct = currentproduct;
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

  
  print() {
    this.printmode = true;
      this.globals.printobj = document.getElementById("print") as HTMLElement;
    this.gotoanther();
  }

  gotoanther() {
    setTimeout(() => {
      this.router.navigateByUrl("print");
    }, 0.1);
  }
}
