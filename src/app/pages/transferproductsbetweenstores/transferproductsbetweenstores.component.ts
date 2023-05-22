import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TransferProductsBetweenStoresService } from "./transferproductsbetweenstores.services";
import { ProductsService } from "../products/products.services";
import { StoresService } from "../stores/stores.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
declare var jQuery: any;
import { SalesManService } from "../salesman/salesman.services";
import { ItinerariesService } from "../itineraries/itineraries.services";

@Component({
  selector: "app- transferproductsbetweenstores",
  templateUrl: "transferproductsbetweenstores.component.html"
})
export class TransferProductsBetweenStoresComponent implements OnInit {
  uploadForm: FormGroup;
  submitteditem = false;
  submittotal = false;
  products: any;
  stores: any;
  selectedproduct: {
    bigunit: any;
    smallunit: any;
    countunit: any;
    fromstore: any;

  };
  enterdproducts: any[] = [];
  err: boolean;
 
  message: string;
  sales: any;
  itineraries: any;
  salescarupdate: any;
  storeproducts: any;
  tostoreForm: FormGroup;
  obj: { user: string; tostore: any; details: any[];daterecived:any; };
  currentstore: any;
  constructor(
    private admin: AdminLayoutComponent,
    private storesservice: StoresService,
    private productsservice: ProductsService,
    private formBuilder: FormBuilder,
    private transferproductsbetweenstoresservice: TransferProductsBetweenStoresService,

  ) {}
  ngOnInit() {
    this.getallproduct();
    this.getallstores();

    this.selectedproduct = {
      bigunit: "",
      smallunit: "",
      countunit: "",
      fromstore: ""

    };
    this.uploadForm = this.formBuilder.group({
      product: ["", Validators.required],
      unit: ["", Validators.required],
      quntity: ["", Validators.required],
      store: ["", Validators.required],
    });

    this.tostoreForm = this.formBuilder.group({
      tostore: ["", Validators.required]
    });
  }
  get f() {
    return this.uploadForm.controls;
  }
  get s() {
    return this.tostoreForm.controls;
  }

  onChangeproduct(target) {
    var res;
    this.productsservice.getsingleproduct(target).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.selectedproduct = res.obj[0];
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
  
  async onSubmitTotal() {
    this.submittotal = true;
    // stop here if form is invalid
    if (this.tostoreForm.invalid) {
      return;
    }
    // display form values on success
    var res;
    this.admin.active = true;

    this.obj = {
      user: localStorage.getItem("userid"),
      tostore: this.tostoreForm.value.tostore,
      details: this.enterdproducts,
      daterecived:Date.now()
    };




    this.transferproductsbetweenstoresservice.addtransferproducts(this.obj).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = true;
          this.message = "تم ترحيل البضاعه";
          this.getallstores();
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

    this.onRestToStore();
    this.enterdproducts = [];
  }
  onRestToStore() {
    this.submittotal = false;
    this.tostoreForm.reset();
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
      if(this.enterdproducts[index].store  == this.uploadForm.value.store && this.enterdproducts[index].productid  == this.uploadForm.value.product ){
        alert("لا يمكن اضافه نفس المنتج من نفس المخزن");
        return;
      } 
    }

    var quntity;
    // display form values on success
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
            if (this.storeproducts.products[index].productid == this.uploadForm.value.product) {
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
                  productname: this.selectedproduct,
                  unitname: jQuery("#unitname option:selected").text(),
                  storename: jQuery("#storename option:selected").text(),
                  balancefromstorebefore:this.storeproducts.products[index].quantity,
                  balancefromstoreafter:this.storeproducts.products[index].quantity - quntity,
                  balancetostorebefore:0,
                  balancetostoreafter:quntity
                });
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
  
  remove(index) {
    this.enterdproducts.splice(index, 1);
    this.clearPanel();
  }
  @ViewChild('auto') auto;
  clearPanel(): void {
    this.auto.clear();
  }

  keyword = "name";
  selectEvent(item) {
    // do something with selected item
    var currentproduct = this.products.find((x) => x._id === item._id);
    this.selectedproduct = item;
    this.uploadForm.patchValue({
      product: item._id,
    });
  }

  onChangestore(store) {
    this.admin.active = true;
    this.currentstore = this.stores.filter((x) => x._id == store);
    for (const index1 in this.currentstore[0].products) {
      for (const index2 in this.enterdproducts) {
        if(this.currentstore[0].products[index1].productid == this.enterdproducts[index2].productid){
          // alert('balance before'+this.currentstore[0].products[index1].quantity);
          this.enterdproducts[index2].balancetostorebefore = this.currentstore[0].products[index1].quantity;
          this.enterdproducts[index2].balancetostoreafter = this.currentstore[0].products[index1].quantity + this.enterdproducts[index2].realquntity;
        }
    }
    this.admin.active = false;
  }
}
}
