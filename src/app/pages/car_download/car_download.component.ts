import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalesManService } from "../salesman/salesman.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { StoresService } from "../stores/stores.services";
import { CarUploadService } from "../car_upload/car_upload.services";
@Component({
  selector: "app-cardownload",
  templateUrl: "car_download.component.html",
})
export class CarDownloadComponent implements OnInit {
  downloadForm: FormGroup;
  submitted = false;
  submitted2 = false;
  searchForm: FormGroup;
  salesman: [] = [];
  sales: any;
  carstore: any;
  bigunit: any;
  smallunit: any;
  quntity: any;
  countunit: any;
  stores: any;
  enterdproducts: any[] = [];
  obj: { user: string; sales: any; details: any[]; daterecived: any };
  err: boolean = false;
  message: any;
  products: any[];
  currentproduct: any;
  removedproducts: any[] = [];
  currentstore: any;

  constructor(
    private admin: AdminLayoutComponent,
    private salesmanservice: SalesManService,
    private formBuilder: FormBuilder,
    private storesservice: StoresService,
    private caruploadservice: CarUploadService
  ) {}

  ngOnInit() {
    this.getallsales();
    this.getallstores();
    this.searchForm = this.formBuilder.group({
      sales: ["", Validators.required],
    });

    this.downloadForm = this.formBuilder.group({
      product: [""],
      unit: ["", Validators.required],
      quntity: ["", Validators.required],
      store: ["", Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.downloadForm.controls;
  }
  get s() {
    return this.searchForm.controls;
  }

  onSubmit() {
    if (this.currentproduct == null) {
      return;
    }
    this.submitted = true;
    for (let index = 0; index < this.enterdproducts.length; index++) {
      if (
        this.enterdproducts[index].store == this.downloadForm.value.store &&
        this.currentproduct.productid._id ==
          this.enterdproducts[index].productid
      ) {
        alert("لا يمكن اضافه نفس المنتج من نفس المخزن");
        return;
      }
    }
    // stop here if form is invalid
    if (this.downloadForm.invalid) {
      return;
    }
    var quntity;
    if (this.downloadForm.value.unit == "bigunit") {
      quntity = this.downloadForm.value.quntity * this.countunit;
    } else {
      quntity = this.downloadForm.value.quntity;
    }

    if (quntity > this.quntity) {
      this.err = true;
      this.message = "خطأ في ادخال الكمية";
    } else {
      let quntityproductonstore = this.currentstore[0].products.filter(
        (element) => element.productid == this.currentproduct.productid._id
      );
      console.log(quntityproductonstore.length);

      if (quntityproductonstore.length == 0 ) {
        this.enterdproducts.push({
          productid: this.currentproduct.productid._id,
          unit: this.downloadForm.value.unit,
          quntity: this.downloadForm.value.quntity,
          realquntity: quntity,
          store: this.downloadForm.value.store,
          productname: this.currentproduct.productid.name,
          unitname: jQuery("#unitname option:selected").text(),
          storename: jQuery("#storename option:selected").text(),
          fullobj: this.currentproduct,
          carquantity: this.quntity,
          balancestorebefore: 0,
          balancestoreafter: 0 + quntity
        });
      }
      else{
        this.enterdproducts.push({
          productid: this.currentproduct.productid._id,
          unit: this.downloadForm.value.unit,
          quntity: this.downloadForm.value.quntity,
          realquntity: quntity,
          store: this.downloadForm.value.store,
          productname: this.currentproduct.productid.name,
          unitname: jQuery("#unitname option:selected").text(),
          storename: jQuery("#storename option:selected").text(),
          fullobj: this.currentproduct,
          carquantity: this.quntity,
          balancestorebefore: quntityproductonstore[0].quantity,
          balancestoreafter: quntityproductonstore[0].quantity + quntity,
          balancecarbefore:this.quntity,
          balancecarafter:this.quntity - quntity
        });
      }
 
      for (let index = 0; index < this.carstore.length; index++) {
        if (
          this.carstore[index].productid._id ==
          this.currentproduct.productid._id
        ) {
          this.carstore[index].quntity = this.carstore[index].quntity - quntity;
          if (this.carstore[index].quntity == 0) {
            this.removedproducts.push(this.carstore[index]);
            this.carstore.splice(index, 1);
          }
        }
      }
      this.products = [];
      for (let index = 0; index < this.carstore.length; index++) {
        this.products.push({
          _id: this.carstore[index].productid._id,
          name: this.carstore[index].productid.name,
          quntity: this.carstore[index].quntity,
        });
      }
    }
    this.onReset();
    this.currentproduct = null;
    this.clearPanel();
  }

  keyword = "name";
  selectEvent(item) {
    this.currentproduct = this.carstore.find(
      (x) => x.productid._id === item._id
    );
    this.bigunit = this.currentproduct.productid.bigunit;
    this.smallunit = this.currentproduct.productid.smallunit;
    this.countunit = this.currentproduct.productid.countunit;
    this.quntity = this.currentproduct.quntity;
  }

  onSubmitsearch() {
    this.submitted2 = true;

    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }
    this.getcarstore(this.searchForm.value.sales);
  }

  onReset() {
    this.submitted = false;
    this.downloadForm.reset();
  }

  onResetSearch() {
    this.submitted2 = false;
    this.searchForm.reset();
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

  remove(i) {
    var flag = false;
    for (let index = 0; index < this.carstore.length; index++) {
      if (
        this.carstore[index].productid._id == this.enterdproducts[i].productid
      ) {
        this.carstore[index].quntity += this.enterdproducts[i].realquntity;
        flag = true;
        this.products = [];
        for (let index = 0; index < this.carstore.length; index++) {
          this.products.push({
            _id: this.carstore[index].productid._id,
            name: this.carstore[index].productid.name,
            quntity: this.carstore[index].quntity,
          });
        }
      }
    }
    if (flag == false) {
      this.enterdproducts[i].fullobj.quntity = this.enterdproducts[
        i
      ].realquntity;
      this.carstore.push(this.enterdproducts[i].fullobj);
      this.products = [];
      for (let index = 0; index < this.carstore.length; index++) {
        this.products.push({
          _id: this.carstore[index].productid._id,
          name: this.carstore[index].productid.name,
          quntity: this.carstore[index].quntity,
        });
      }
    }

    this.downloadForm.reset();
    this.enterdproducts.splice(i, 1);
    this.clearPanel();
  }

  @ViewChild("auto") auto;
  clearPanel(): void {
    this.auto.clear();
  }

  getcarstore(id) {
    var res;
    this.admin.active = true;
    this.salesmanservice.onesales(id).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.salesman = res.obj;
          this.carstore = res.obj.carstore;
          this.products = [];

          for (let index = 0; index < this.carstore.length; index++) {
            this.products.push({
              _id: this.carstore[index].productid._id,
              name: this.carstore[index].productid.name,
              quntity: this.carstore[index].quntity,
            });
          }
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

  onChangeproduct(value) {
    var currentproduct = this.carstore.find((x) => x.productid._id === value);
    this.bigunit = currentproduct.productid.bigunit;
    this.smallunit = currentproduct.productid.smallunit;
    this.countunit = currentproduct.productid.countunit;
    this.quntity = currentproduct.quntity;
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

  totalsubmit() {
    this.submitted = true;
    var res;
    this.admin.active = true;
    this.obj = {
      user: localStorage.getItem("userid"),
      sales: this.searchForm.value.sales,
      details: this.enterdproducts,
      daterecived: Date.now(),
    };
    this.caruploadservice.addcardownload(this.obj).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = true;
          this.message = "تم";
        } else {
          this.admin.active = false;
          this.err = true;
          this.message = "حدث خطأ";
        }
      },
      error: (error) => {
        alert(error);
        this.admin.active = false;
        this.err = true;
        this.message = "حدث خطأ";
      },
    });
    this.enterdproducts = [];
    this.onResetSearch();
  }

  onChangestore(store) {
    this.currentstore = this.stores.filter((x) => x._id == store);
  }
}
