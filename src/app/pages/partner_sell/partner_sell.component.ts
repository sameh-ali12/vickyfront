import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PartnerSellService } from "./partner_sell.services";
import { ProductsService } from "../products/products.services";
import { StoresService } from "../stores/stores.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
declare var jQuery: any;
import { AddLoginService } from "../login/login.services";
import { TreasuryService } from "../treasuries/treasuries.services";
import { DecimalPipe } from "@angular/common";
@Component({
  selector: "app-partnersell",
  templateUrl: "partner_sell.component.html",
})
export class PartnerSellComponent implements OnInit {
  sellForm: FormGroup;
  totalSellForm: FormGroup;
  submitteditem = false;
  submittotal = false;
  products: any;
  stores: any;
  totalamount: any = 0;
  totalcashed: number = 0;
  selectedproduct: {
    name: any;
    bigunit: any;
    smallunit: any;
    sellprice: any;
    countunit: any;
    buyprice: any;
    fromstore:any;
  };
  enterdproducts: any[] = [];
  users: any;
  treasuries: any;
  err: boolean;
  obj: {
    total: any;
    cashed: any;
    from: string;
    to: any;
    totreasury: any;
    note: any;
    details: any[];
    daterecived: any;
  };
  message: string;
  storeproducts: any;
  constructor(
    private admin: AdminLayoutComponent,
    private storesservice: StoresService,
    private productsservice: ProductsService,
    private formBuilder: FormBuilder,
    private partnersellservice: PartnerSellService,
    private addloginservice: AddLoginService,
    private treasuryservice: TreasuryService
  ) {}

  ngOnInit() {
    this.getallproduct();
    this.getallstores();
    this.getallowedusers();
    this.getalltreasuries();
    this.selectedproduct = {
      name: "",
      bigunit: "",
      smallunit: "",
      sellprice: "",
      countunit: "",
      buyprice: "",
      fromstore:""
    };
    this.sellForm = this.formBuilder.group({
      product: [""],
      unit: ["", Validators.required],
      price: ["", Validators.required],
      quntity: ["", Validators.required],
      store: ["", Validators.required],
    });
    this.totalSellForm = this.formBuilder.group({
      total: [Number],
      cashed: [0, Validators.required],
      partner: ["", Validators.required],
      treasury: ["", Validators.required],
      note: [""],
      remain: [Number],
    });
  }
  get f() {
    return this.sellForm.controls;
  }
  get s() {
    return this.totalSellForm.controls;
  }

  // onChangeproduct(target) {
  //   var res;
  //   this.productsservice.getsingleproduct(target).subscribe({
  //     next: (data) => {
  //       res = data;
  //       if (res.code == 100) {
  //         this.admin.active = false;
  //         this.selectedproduct = res.obj[0];
  //         this.selectedproduct.sellprice = res.obj[0].sellprice;
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
  keyword = "name";
  selectEvent(item) {
    // do something with selected item
    var currentproduct = this.products.find((x) => x._id === item._id);
    console.log(currentproduct);
    this.selectedproduct = currentproduct;
    this.sellForm.patchValue({
      product: item._id,
    });
  }

  onChangeunit(target) {
    if (target == "bigunit") {
      this.sellForm.patchValue({
        price: this.selectedproduct.buyprice,
      });
    } else {
      this.sellForm.patchValue({
        price: this.selectedproduct.buyprice / this.selectedproduct.countunit,
      });
    }
  }
  onSubmitTotal() {
    this.submittotal = true;
    // stop here if form is invalid
    if (this.totalSellForm.invalid) {
      return;
    }
    // display form values on success
    var res;
    this.admin.active = true;
    this.obj = {
      total: this.totalSellForm.value.total,
      cashed: this.totalSellForm.value.cashed,
      from: localStorage.getItem("userid"),
      to: this.totalSellForm.value.partner,
      totreasury: this.totalSellForm.value.treasury,
      note: this.totalSellForm.value.note,
      details: this.enterdproducts,
      daterecived: Date.now(),
    };
    this.partnersellservice.addpartnersell(this.obj).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = true;
          this.message = "تم ارسال الفاتوره الي الشريك للموافقه عليها ";
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
    this.totalSellForm.reset();
  }

  @ViewChild('auto') auto;
  clearPanel(): void {
    this.auto.clear();
  }


  onSubmitItem() {
    if(this.sellForm.value.product == null){
      return;
    }
    this.submitteditem = true;
    this.selectedproduct.fromstore  = this.sellForm.value.store;
    // stop here if form is invalid
    if (this.sellForm.invalid) {
      return;
    }

    if (this.enterdproducts.find((x) => x.productid === this.sellForm.value.product)) {
      if (
        this.enterdproducts.find(
          (x) => x.productid === this.sellForm.value.product
        ).fromstore == this.sellForm.value.store
      ) {
        alert("غير مسموح بأضافه نفس الصنف من نفس المخزن");
        return;
      }
    }
    var quntity;
    var viewquntity;
    // display form values on success
    if (this.sellForm.value.unit == "bigunit") {
      quntity = this.sellForm.value.quntity * this.selectedproduct.countunit;
      viewquntity = this.sellForm.value.quntity;
    } else {
      quntity = this.sellForm.value.quntity;
      viewquntity = this.sellForm.value.quntity;
    }

    var res;
    this.admin.active = true;
    this.storesservice.getsinglestore(this.sellForm.value.store).subscribe({
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
              this.sellForm.value.product
            ) {
              flag = true;
              if (quntity > this.storeproducts.products[index].quantity) {
                this.err = true;
                this.message = "خطأ في ادخال الكمية";
              } else {
                // display form values on success
                this.enterdproducts.push({
                  productid: this.sellForm.value.product,
                  unit: this.sellForm.value.unit,
                  price: this.sellForm.value.price,
                  quntity: quntity,
                  viewquntity: viewquntity,
                  fromstore: this.sellForm.value.store,
                  productname: this.selectedproduct.name,
                  unitname: jQuery("#unitname option:selected").text(),
                  storename: jQuery("#storename option:selected").text(),
                });
                this.totalamount =
                  this.totalamount +
                  this.sellForm.value.price * this.sellForm.value.quntity;
                this.totalSellForm.patchValue({
                  total: this.totalamount,
                  remain: this.totalamount - this.totalcashed,
                });
                this.onResetSellItem();
                this.clearPanel();
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
  onResetSellItem() {
    this.submitteditem = false;
    this.sellForm.reset();
    this.err = false;
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

  getalltreasuries() {
    var res;
    this.admin.active = true;
    this.treasuryservice.getalltreasuries().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.treasuries = res.obj;
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
    this.totalamount = this.totalamount - this.enterdproducts[index].price * this.enterdproducts[index].viewquntity;

    this.totalSellForm.patchValue({
      total: this.totalamount,
      remain: this.totalamount - this.totalcashed,
    });

    this.enterdproducts.splice(index, 1);
  }

  onChangecash(target) {
    if (target > this.totalamount) {
      this.err = true;
      this.message = "خطأ في المدفوع";
      this.totalSellForm.patchValue({
        cashed: 0,
      });
    } else {
      this.totalcashed = target;
      this.totalSellForm.patchValue({
        remain: this.totalamount - target,
      });
    }
  }
}
