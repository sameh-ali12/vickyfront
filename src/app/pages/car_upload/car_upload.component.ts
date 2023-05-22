import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CarUploadService } from "./car_upload.services";
import { ProductsService } from "../products/products.services";
import { StoresService } from "../stores/stores.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
declare var jQuery: any;
import { SalesManService } from "../salesman/salesman.services";
import { ItinerariesService } from "../itineraries/itineraries.services";

@Component({
  selector: "app-carupload",
  templateUrl: "car_upload.component.html",
})
export class CarUploadComponent implements OnInit {
  uploadForm: FormGroup;
  totalcaruploadForm: FormGroup;
  submitteditem = false;
  submittotal = false;
  products: any;
  stores: any;
  selectedproduct: {
    name: any;
    bigunit: any;
    smallunit: any;
    countunit: any;
    fromstore: any;
  };
  carestore = [];
  enterdproducts: any[] = [];
  err: boolean;
  obj: {
    user: any;
    note: any;
    sales: any;
    itineraries: any;
    details: any[];
    daterecived: any;
  };
  message: string;
  sales: any;
  itineraries: any;
  salescarupdate: any;
  storeproducts: any;
  currentsales: any;
  constructor(
    private admin: AdminLayoutComponent,
    private storesservice: StoresService,
    private productsservice: ProductsService,
    private formBuilder: FormBuilder,
    private caruploadservice: CarUploadService,
    private salesmanservice: SalesManService,
    private itinerariesservice: ItinerariesService
  ) {}
  ngOnInit() {
    this.getallproduct();
    this.getallstores();
    this.getallsales();
    this.getitineraries();
    this.selectedproduct = {
      name: "",
      bigunit: "",
      smallunit: "",
      countunit: "",
      fromstore: "",
    };
    this.uploadForm = this.formBuilder.group({
      product: [""],
      unit: ["", Validators.required],
      quntity: ["", Validators.required],
      store: ["", Validators.required],
    });

    this.totalcaruploadForm = this.formBuilder.group({
      sales: ["", Validators.required],
      itineraries: ["", Validators.required],
      note: [""],
    });
  }
  get f() {
    return this.uploadForm.controls;
  }
  get s() {
    return this.totalcaruploadForm.controls;
  }

  keyword = "name";
  selectEvent(item) {
    // do something with selected item
    var currentproduct = this.products.find((x) => x._id === item._id);
    this.selectedproduct = currentproduct;
    this.uploadForm.patchValue({
      product: item._id,
    });
  }

  onSubmitTotal() {
    this.submittotal = true;
    // stop here if form is invalid
    if (this.totalcaruploadForm.invalid) {
      return;
    }
      


    // display form values on success
    var res;
    this.admin.active = true;
    this.obj = {
      user: localStorage.getItem("userid"),
      note: this.totalcaruploadForm.value.note,
      sales: this.totalcaruploadForm.value.sales,
      itineraries: this.totalcaruploadForm.value.itineraries,
      details: this.enterdproducts,
      daterecived: Date.now(),
    };
    // this.preparedataforupdatecarstore(this.obj.sales);
    this.caruploadservice.adduploadcar(this.obj).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = true;
          this.message = "تم اضافه الحموله الي السياره";
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
    this.onResetSellTotal();
    this.enterdproducts = [];
  }
  onResetSellTotal() {
    this.submittotal = false;
    this.totalcaruploadForm.reset();
  }

  @ViewChild("auto") auto;
  clearPanel(): void {
    this.auto.clear();
  }

  onSubmitItem() {
    if (this.uploadForm.value.product == null) {
      return;
    }
    this.submitteditem = true;
    this.selectedproduct.fromstore = this.uploadForm.value.store;
    // stop here if form is invalid
    if (this.uploadForm.invalid) {
      return;
    }
    for (let index = 0; index < this.enterdproducts.length; index++) {
      if (
        this.enterdproducts[index].store == this.uploadForm.value.store &&
        this.enterdproducts[index].productid == this.uploadForm.value.product
      ) {
        alert("لا يمكن اضافه نفس المنتج من نفس المخزن");
        return;
      }
    }
    var quntity;
    if (this.uploadForm.value.unit == "bigunit") {
      quntity = this.uploadForm.value.quntity * this.selectedproduct.countunit;
    } else {
      quntity = this.uploadForm.value.quntity;
    }

    var res;
    this.admin.active = true;
    this.storesservice.getsinglestore(this.uploadForm.value.store).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.storeproducts = res.obj[0];
          var flag = false;
          for (
            let index = 0;
            index < this.storeproducts.products.length;
            index++
          ) {
            if (
              this.storeproducts.products[index].productid ==
              this.uploadForm.value.product
            ) {
              flag = true;
              if (quntity > this.storeproducts.products[index].quantity) {
                this.err = true;
                this.message = "خطأ في ادخال الكمية";
              } else {
                this.enterdproducts.push({
                  productid: this.uploadForm.value.product,
                  unit: this.uploadForm.value.unit,
                  quntity: this.uploadForm.value.quntity,
                  realquntity: quntity,
                  store: this.uploadForm.value.store,
                  productname: this.selectedproduct.name,
                  unitname: jQuery("#unitname option:selected").text(),
                  storename: jQuery("#storename option:selected").text(),
                  storequantity: this.storeproducts.products[index].quantity,
                  fullobj: this.selectedproduct,
                  balancestorebefore: this.storeproducts.products[index]
                    .quantity,
                  balancestoreafter:
                    this.storeproducts.products[index].quantity - quntity,
                  balancecarbefore: 0,
                  balancecarafter: this.storeproducts.products[index].quantity,
                });
                var existbefore = false;
                for (let index = 0; index < this.carestore.length; index++) {
                  if (
                    this.carestore[index].productid ==
                    this.uploadForm.value.product
                  ) {
                    this.carestore[index].quntity =
                      this.carestore[index].quntity + quntity;
                    existbefore = true;
                  }
                }
                if (existbefore == false) {
                  this.carestore.push({
                    productid: this.uploadForm.value.product,
                    quntity: quntity,
                  });
                }
                this.clearPanel();
                this.onResetuploadItem();
              }
            }
          }
          if (flag == false) {
            this.err = true;
            this.message = "خطأ في ادخال الكمية";
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
  onResetuploadItem() {
    this.submitteditem = false;
    this.uploadForm.reset();
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
  getitineraries() {
    var res;
    this.admin.active = true;
    this.itinerariesservice.getitineraries().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.itineraries = res.obj;
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

  remove(index) {
    this.enterdproducts.splice(index, 1);
  }

  async onChangesales(value) {
    this.admin.active = true;
    this.currentsales =  await this.sales.filter((x) => x._id == value);
    var x = this.currentsales[0].carstore;
    for (const index in this.enterdproducts) {
      for (const index2 in x) {
        if (this.enterdproducts[index].productid == x[index2].productid) {
          this.enterdproducts[index].balancecarbefore = x[index2].quntity;
          this.enterdproducts[index].balancecarafter = x[index2].quntity + this.enterdproducts[index].realquntity;
        }
      }
    }
    this.admin.active = false;
  }
}
