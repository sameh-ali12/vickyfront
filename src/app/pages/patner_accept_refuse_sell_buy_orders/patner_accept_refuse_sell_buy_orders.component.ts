import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PartnerSellService } from "../partner_sell/partner_sell.services";
import { TreasuryService } from "../treasuries/treasuries.services";
import { StoresService } from "../stores/stores.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { identifierModuleUrl } from "@angular/compiler";
declare var jQuery: any;
@Component({
  selector: "app-patneracceptrefusesellbuyorders",
  templateUrl: "patner_accept_refuse_sell_buy_orders.component.html",
})
export class PatnerAcceptRefuseSellBuyOrdersComponent implements OnInit {
  acceptForm: FormGroup;
  submitted = false;
  treasuries: any;
  stores: any;
  partnersellorders: any;
  panelOpenState = false;
  err: boolean;
  message: string;
  storestatus: boolean = true;
  clickedcheckstore: boolean = false;
  currentstore: any;

  constructor(
    private admin: AdminLayoutComponent,
    private storesservice: StoresService,
    private treasuryservice: TreasuryService,
    private partnersellservice: PartnerSellService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    jQuery(function () {
      jQuery("#accordion").accordion();
    });

    this.getalltreasury();
    this.getstores();
    this.getparntersellorders();
    this.acceptForm = this.formBuilder.group({
      store: ["", Validators.required],
      treasury: ["", Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.acceptForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.acceptForm.invalid) {
      return;
    }

    // display form values on success
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.acceptForm.value, null, 4));
  }

  accept(order) {
    if (this.clickedcheckstore == false) {
      this.err = true;
      this.message = "يجب التحقق من الفاتوره اولا ";
    } else {
      order.tostore = this.acceptForm.value.store;
      order.fromtreasury = this.acceptForm.value.treasury;
      order.dateaction = Date.now();
      order.status = "accept";
      order.reading = true;
      if (order.cashed == 0) {
        if (this.acceptForm.value.store == "") {
          return;
        } else {
          if (this.storestatus == true) {
            this.updateorder(order._id, order, "تم الموافقه علي الفاتوره");
          } else {
            this.err = true;
            this.message = "الكميه في مخزن المرسل اقل من الفاتوره ";
          }
        }
      } else {
        this.submitted = true;
        if (this.acceptForm.invalid) {
          return;
        } else {
          if (this.storestatus == true) {
            this.updateorder(order._id, order, "تم الموافقه علي الفاتوره");
          } else {
            this.err = true;
            this.message = "الكميه في مخزن المرسل اقل من الفاتوره ";
          }
        }
      }
    }
  }
  refuse(order) {
    order.dateaction = Date.now();
    order.status = "refuse";
    order.reading = true;
    this.updateorder(order._id, order, "تم رفض الفاتوره");
  }
  updateorder(id, obj, msg) {
    if (obj.status == "accept") {
      for (const index in obj.details) {
        var x = this.currentstore[0].products.filter(
          (x) => x.productid === obj.details[index].productid._id
        );
        console.log(x);
        if (x.length != 0) {
          obj.details[index].balancetostorebefore = x[0].quantity;
          obj.details[index].balancetostoreafter =
            x[0].quantity + obj.details[index].quntity;
        } else {
          obj.details[index].balancetostorebefore = 0;
          obj.details[index].balancetostoreafter = obj.details[index].quntity;
        }
      }

      var res;
      this.partnersellservice.checkacceptpartnersell(obj).subscribe({
        next: (data) => {
          res = data;
          if (res.code == 100) {
            var res1;
            this.partnersellservice.updatepartnersell(id, obj).subscribe({
              next: (data) => {
                res1 = data;
                if (res1.code == 100) {
                  this.admin.active = false;
                  this.err = true;
                  this.message = msg;
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
          } else {
            this.admin.active = false;
            this.err = true;
            this.message = "المبلغ المدفوع غير موجود في الخزينه";
          }
        },
        error: (error) => {
          alert(error);
          this.admin.active = false;
          this.err = true;
          this.message = "حدث خطأ";
        },
      });
    } else {
      var res1;
      this.partnersellservice.updatepartnersell(id, obj).subscribe({
        next: (data) => {
          res1 = data;
          if (res1.code == 100) {
            this.admin.active = false;
            this.err = true;
            this.message = msg;
          } else {
            this.admin.active = false;
            this.err = true;
            this.message = "حدث خطأ";
          }
        },
        error: (error) => {
          alert(error);
          console.log(error);

          this.admin.active = false;
          this.err = true;
          this.message = "حدث خطأ";
        },
      });
    }
    this.onReset();
    this.getparntersellorders();
  }
  getalltreasury() {
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
  getstores() {
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

  validate(obj) {
    this.clickedcheckstore = true;
    var stores = [];
    for (const index in obj.details) {
      var flag = false;
      for (const index2 in stores) {
        if (obj.details[index].fromstore._id == stores[index2]) {
          flag = true;
        }
      }
      if (flag == false) {
        stores.push(obj.details[index].fromstore._id);
      }
    }
    var fullobj = [];
    var products = obj.details;
    for (const index in stores) {
      var obj2 = { store: stores[index], products: [] };
      for (const index2 in products) {
        if (products[index2].fromstore._id == stores[index]) {
          obj2.products.push({
            productid: products[index2].productid._id,
            quntity: products[index2].quntity,
          });
        }
      }
      fullobj.push(obj2);
      // obj = {};
    }
    for (const index in fullobj) {
      var res2;
      this.storesservice.getsinglestore(fullobj[index].store).subscribe({
        next: (data) => {
          res2 = data;
          if (res2.code == 100) {
            for (const index1 in fullobj[index].products) {
              for (const index2 in res2.obj[0].products) {
                if (
                  res2.obj[0].products[index2].productid ==
                  fullobj[index].products[index1].productid
                ) {
                  var quantity =
                    res2.obj[0].products[index2].quantity -
                    fullobj[index].products[index1].quntity;
                  if (quantity < 0) {
                    this.storestatus = false;
                    break;
                  } else {
                    ///// here to manage quantity before and after on multiable store
                    for (const index3 in obj.details) {
                      if (
                        obj.details[index3].productid._id==
                          fullobj[index].products[index1].productid &&
                        obj.details[index3].fromstore._id ==
                          fullobj[index].store
                      ) {
                        obj.details[index3].balancefromstorebefore =
                        res2.obj[0].products[index2].quantity;
                        obj.details[index3].balancefromstoreafter =
                          res2.obj[0].products[index2].quantity -
                          fullobj[index].products[index1].quntity;
                      }
                    }
                  }
                }
              }
            }
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
    }
    this.err = true;
    this.message = "تم التحقق";
    console.log(obj);
  }

  getparntersellorders() {
    var res;
    this.admin.active = true;
    this.partnersellservice.getpartnersellunderprocess().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.partnersellorders = res.obj;
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
  onReset() {
    this.submitted = false;
    this.acceptForm.reset();
  }

  onChangestore(store) {
    this.currentstore = this.stores.filter((x) => x._id == store);
    console.log(this.currentstore);
  }
}
