import { Component, OnInit } from "@angular/core";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Globals } from "../../globals";
import { StoresService } from "../stores/stores.services";
import { ProductsService } from "../products/products.services";

@Component({
  selector: "app-rp_storeaction",
  templateUrl: "rp_store_action.component.html",
})
export class RP_StoreActionComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean = false;
  message: string;
  err: boolean;
  printmode: boolean;
  stores: any;
  obj: any;
  products: any;
  selectedproduct: any;
  subobj: any =[];
  productaction: boolean = false;
  searchobj: {};

  constructor(
    private formBuilder: FormBuilder,
    private admin: AdminLayoutComponent,
    private storesservice: StoresService,
    private router: Router,
    private globals: Globals,
    private productsservice: ProductsService
  ) {}

  ngOnInit() {
    this.getallstores();
    this.getallproduct();
    this.searchForm = this.formBuilder.group({
      store: ["", Validators.required],
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
      var x = this.stores.filter((x) => x._id == this.searchForm.value.store);

      this.searchobj = {
        from:this.searchForm.value.from,
        to:this.searchForm.value.to,
        store:x[0].name
      }
     console.log(this.selectedproduct._id);
      if (this.selectedproduct._id == undefined) {

        var res;
        this.admin.active = true;
        this.storesservice
          .storeactions(
            this.searchForm.value.store,
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
        this.storesservice
          .storeactionswithproducts(
            this.searchForm.value.store,
            this.selectedproduct._id,
            this.searchForm.value.from,
            this.searchForm.value.to
          )
          .subscribe({
            next: (data) => {
              res = data;
              if (res.code == 100) {
                this.admin.active = false;

                this.obj = res.obj;
                for (const index in this.obj) {
                  if (this.obj[index].buyinside.status) {
                    var x = this.obj[index].buyinside.billid.details.filter((x) => x.productid._id == this.selectedproduct._id && this.searchForm.value.store == x.fromstore._id);
                    this.subobj.push({
                      obj: x[0],
                      type: "buyinside",
                      id: this.obj[index].buyinside.billid._id,
                      contactname: this.obj[index].buyinside.billid.to,
                      date: this.obj[index].buyinside.billid.daterecived,
                      billno:""
                    });
                  }
                  if (this.obj[index].sellinside.status) {
                    var x = this.obj[index].sellinside.billid.details.filter((x) => x.productid._id == this.selectedproduct._id);
                    this.subobj.push({
                      obj: x[0],
                      type: "sellinside",
                      id: this.obj[index].sellinside.billid._id,
                      contactname: this.obj[index].sellinside.billid.from,
                      date: this.obj[index].sellinside.billid.daterecived,
                      billno:""
                    });
                  }
                  if (this.obj[index].cardownload.status) {
                    var x = this.obj[index].cardownload.cardownloadid.details.filter((x) => x.productid._id == this.selectedproduct._id  && this.searchForm.value.store == x.store._id);
                    this.subobj.push({
                      obj: x[0],
                      type: "cardownload",
                      id: this.obj[index].cardownload.cardownloadid._id,
                      contactname: this.obj[index].cardownload.cardownloadid.sales,
                      date: this.obj[index].cardownload.cardownloadid.daterecived,
                      billno:""
                    });
                  }
                  if (this.obj[index].carupload.status) {
                    var x = this.obj[index].carupload.caruploadid.details.filter((x) => x.productid._id == this.selectedproduct._id  && this.searchForm.value.store == x.store._id);
                    console.log(x);
                    this.subobj.push({
                      obj: x[0],
                      type: "carupload",
                      id: this.obj[index].carupload.caruploadid._id,
                      contactname: this.obj[index].carupload.caruploadid.sales,
                      date: this.obj[index].carupload.caruploadid.daterecived,
                      billno:""
                    });
                  }
                  if (this.obj[index].buyfromsupplier.status) {
                    var x = this.obj[index].buyfromsupplier.billid.details.filter((x) => x.productid._id == this.selectedproduct._id);
                    this.subobj.push({
                      obj: x[0],
                      type: "buyfromsupplier",
                      id: this.obj[index].buyfromsupplier.billid._id,
                      contactname: this.obj[index].buyfromsupplier.billid,
                      date: this.obj[index].daterecived,
                      billno:this.obj[index].buyfromsupplier.billid.billno
                    });
                  }
                  if (this.obj[index].sellfromstore.status) {
                    var x = this.obj[index].sellfromstore.billid.details.filter((x) => x.productid._id == this.selectedproduct._id &&  this.searchForm.value.store == x.fromstore._id );
                    this.subobj.push({
                      obj: x[0],
                      type: "sellfromstore",
                      id: this.obj[index].sellfromstore.billid._id,
                      contactname: this.obj[index].sellfromstore.billid,
                      date: this.obj[index].daterecived,
                      billno:this.obj[index].sellfromstore.billid.billno
                    });
                  }
                  if (this.obj[index].transferproductsto.status) {
                    var x = this.obj[index].transferproductsto.transferid.details.filter((x) => x.productid._id == this.selectedproduct._id);
                    this.subobj.push({
                      obj: x[0],
                      type: "transferproductsto",
                      id: this.obj[index].transferproductsto.transferid._id,
                      contactname: this.obj[index].transferproductsto.transferid,
                      date: this.obj[index].transferproductsto.transferid.daterecived,
                      billno:""
                    });
                  }
                  if (this.obj[index].transferproductsfrom.status) {
                    var x = this.obj[index].transferproductsfrom.transferid.details.filter((x) => x.productid._id == this.selectedproduct._id &&  this.searchForm.value.store == x.store._id );
                    this.subobj.push({
                      obj: x[0],
                      type: "transferproductsfrom",
                      id: this.obj[index].transferproductsfrom.transferid._id,
                      contactname: this.obj[index].transferproductsfrom.transferid,
                      date: this.obj[index].transferproductsfrom.transferid.daterecived,
                      billno:""
                    });
                  }
                  if (this.obj[index].rebackfromsupplier.status) {
                   var currentreback = this.obj[index].rebackfromsupplier.billid.rebackdetails.filter((x) => x.rebackdate == this.obj[index].daterecived);
                    var x = currentreback[0].details.filter((x) => x.productid._id == this.selectedproduct._id && x.fromstore == this.searchForm.value.store);
                
                    this.subobj.push({
                      obj: x[0],
                      type: "rebackfromsupplier",
                      id: this.obj[index].rebackfromsupplier.billid._id,
                      contactname: this.obj[index].rebackfromsupplier.billid,
                      date: this.obj[index].daterecived,
                      billno:this.obj[index].rebackfromsupplier.billid.billno
                    });
                  }
                  if (this.obj[index].rebackselltoclients.status) {
                    var currentreback = this.obj[index].rebackselltoclients.billid.rebackdetails.filter((x) => x.rebackdate == this.obj[index].daterecived);
                    var x = currentreback[0].details.filter((x) => x.productid._id == this.selectedproduct._id);
                    this.subobj.push({
                      obj: x[0],
                      type: "rebackselltoclients",
                      id: this.obj[index].rebackselltoclients.billid._id,
                      contactname: this.obj[index].rebackselltoclients.billid,
                      date: this.obj[index].daterecived,
                      billno:this.obj[index].rebackselltoclients.billid.billno
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
