import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { StoresService } from "../stores/stores.services";
import { CarUploadService } from "../car_upload/car_upload.services";
import { ClientsService } from "../clients/clients.services";
import { BuyFromSuppliersService } from "../buy_from_suppliers/buy_from_suppliers.services";
import { TreasuryService } from "../treasuries/treasuries.services";
@Component({
  selector: "app-rebackbuyfromsupplier",
  templateUrl: "reback_buy_form_supplier.component.html",
})
export class RebackBuyFromSupplierComponent implements OnInit {
  downloadForm: FormGroup;
  public defualtbillstore: any[] = [];
  submitted = false;
  submitted2 = false;
  submitted3 = false;
  objbill = {
    _id: "",
    billno: "",
    totalamount: "",
    cashed: "",
    treasury: "",
    sales: "",
    client: {
      debtvalue: 0,
    },
    user: "",
    note: "",
    date: "",
    forclient: false,
    supplier: {
      value: 0,
    },
     details: [
      {
        productid: "",
        unitname: "",
        unit: "",
        price: "",
        quntity: "",
        realquntity: "",
      },
    ],
    rebackstatus: false,
    rebackdetails: [
      {
        rebackdate: Date.now(),
        details: [
          {
            productid: "",
            productname: "",
            unit: "",
            quntity: "",
            price: "",
            realquntity: "",
            fromstore: "",
          },
        ],
        totalamount: 0,
        cash: 0,
        treasury: "",
        note: "",
        balancebefore: 0,
        balanceafter: 0,
      },
    ],
  };
  searchForm: FormGroup;
  totalbuybillForm: FormGroup;
  sales: any;
  billstore: any[] = [];
  bigunit: any;
  smallunit: any;
  quntity: any;
  countunit: any;
  stores: any;
  enterdproducts: any[] = [];
  obj: { user: string; sales: any; details: any[] };
  err: boolean = false;
  message: any;
  clients: any;
  treasuries: any;
  totalamount: number = 0;
  selectedstore: any;
  currentstore: any;

  constructor(
    private admin: AdminLayoutComponent,
    private formBuilder: FormBuilder,
    private storesservice: StoresService,
    private buyFromsuppliersservice: BuyFromSuppliersService,
    private treasuryservice: TreasuryService
  ) {}

  ngOnInit() {
    this.getalltreasuries();
    this.getstores();
    this.searchForm = this.formBuilder.group({
      billno: ["", Validators.required],
    });
    this.downloadForm = this.formBuilder.group({
      product: ["", Validators.required],
      unit: ["", Validators.required],
      quntity: ["", Validators.required],
      price: ["", Validators.required],
      store: ["", Validators.required],
    });

    this.totalbuybillForm = this.formBuilder.group({
      totalamount: [""],
      cash: ["", Validators.required],
      remain: [""],
      treasury: ["", Validators.required],
      balancebefore: [0],
      balanceafter: [0],
      notes: [""],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.downloadForm.controls;
  }
  get s() {
    return this.searchForm.controls;
  }
  get h() {
    return this.totalbuybillForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.downloadForm.invalid) {
      return;
    }
    var storequantity;
    var res;
    var quntity;
    this.admin.active = true;
    this.storesservice.getsinglestore(this.downloadForm.value.store).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          console.log(this.downloadForm.value.product);
          for (let index = 0; index < res.obj[0].products.length; index++) {

            if (
              this.downloadForm.value.product ==
              res.obj[0].products[index].productid
            ) {
              storequantity = res.obj[0].products[index].quantity;
            }
          }
          if (this.downloadForm.value.unit == "bigunit") {
            quntity = this.downloadForm.value.quntity * this.countunit;
          } else {
            quntity = this.downloadForm.value.quntity;
          }
          if (quntity > this.quntity || quntity > storequantity) {
            this.err = true;
            this.message = "خطأ في ادخال الكمية";
          } else {
            var quantityproduct = this.currentstore[0].products.filter((x) => x.productid == this.downloadForm.value.product );

            this.enterdproducts.push({
              productid: this.downloadForm.value.product,
              unit: this.downloadForm.value.unit,
              quntity: this.downloadForm.value.quntity,
              realquntity: quntity,
              price: this.downloadForm.value.price,
              productname: jQuery("#productname option:selected").text(),
              unitname: jQuery("#unitname option:selected").text(),
              fromstore: this.downloadForm.value.store,
              store: jQuery("#storename option:selected").text(),
              balancestorebefore:quantityproduct[0].quantity,
              balancestoreafter:quantityproduct[0].quantity -  quntity
            });
            this.totalamount +=
              this.downloadForm.value.quntity * this.downloadForm.value.price;
            this.totalbuybillForm.patchValue({
              totalamount: this.totalamount,
            });
            // for (let index = 0; index < this.billstore.length; index++) {
            //   if (
            //     this.billstore[index].productid._id ==
            //     this.downloadForm.value.product
            //   ) {
            //     // this.billstore[index].realquntity =
            //     //   this.billstore[index].realquntity - quntity;
               
            //   }
            // }
            this.onReset();
          }
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

  onSubmitsearch() {
    this.submitted2 = true;
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }
    this.getbill(this.searchForm.value.billno);
  }

  onReset() {
    this.submitted = false;
    this.downloadForm.reset();
  }

  onResetSearch() {
    this.submitted2 = false;
    this.searchForm.reset();
  }

  onChangeproduct(value) {
    var currentproduct = this.billstore.find((x) => x.productid._id === value);
    this.bigunit = currentproduct.productid.bigunit;
    this.smallunit = currentproduct.productid.smallunit;
    this.countunit = currentproduct.productid.countunit;
    this.quntity = currentproduct.realquntity;
  }

  getbill(billno) {
    var res;
    this.admin.active = true;
    this.buyFromsuppliersservice.getbuybill(billno).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;

          this.objbill = res.obj[0];
          this.billstore = res.obj[0].details;

          console.log(this.objbill);
          if (this.objbill.forclient == true) {
            console.log("this when client == true");
            this.totalbuybillForm.patchValue({
              balancebefore: this.objbill.client.debtvalue,
            });
          } else {
            if (this.objbill.forclient == false) {
              this.totalbuybillForm.patchValue({
                balancebefore: this.objbill.supplier.value,
              });
            }
          }
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

  getalltreasuries() {
    var res;
    this.admin.active = true;
    this.treasuryservice.getalltreasuries().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.treasuries = res.obj;
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

  submittall() {
    this.submitted3 = true;
    // stop here if form is invalid
    if (this.totalbuybillForm.invalid) {
      return;
    }
    this.admin.active = true;
    var x = this.objbill.rebackdetails;
    //  this.objbill.details = this.defualtbillstore;
    x.push({
      rebackdate: Date.now(),
      details: this.enterdproducts,
      totalamount: this.totalbuybillForm.value.totalamount,
      cash: this.totalbuybillForm.value.cash,
      treasury: this.totalbuybillForm.value.treasury,
      note: this.totalbuybillForm.value.note,
      balancebefore: this.totalbuybillForm.value.balancebefore,
      balanceafter: this.totalbuybillForm.value.balanceafter,
    });
    this.objbill.rebackdetails = x;
    this.objbill.rebackstatus = true;
    var res;
    console.log(this.objbill);
    this.buyFromsuppliersservice
      .updatebill(this.objbill._id,this.objbill)
      .subscribe({
        next: (data) => {
          res = data;
          if (res.code == 100) {
            this.onrestotalsellclientsForm();
            this.onResetSearch();
            this.admin.active = false;
            this.err = true;
            this.message = "تم الاسترجاع";
            this.enterdproducts = [];
          } else {
            this.admin.active = false;
            this.err = true;
            this.message = "حدث خطأ";
          }
        },
        error: (error) => {
          alert(error);
          this.admin.active = false;
        },
      });
  }

  onrestotalsellclientsForm() {
    this.submitted3 = false;
    this.totalbuybillForm.reset();
  }

  onChangeCash(target) {
    if(this.objbill.forclient == true){
      this.totalbuybillForm.patchValue({
        remain: this.totalamount - target,
        balanceafter: this.objbill.client.debtvalue + (this.totalamount - target),
      });
    }
    else{
      this.totalbuybillForm.patchValue({
        remain: this.totalamount - target,
        balanceafter: this.objbill.supplier.value - (this.totalamount - target),
      });
    }

  }

  getstores() {
    var res;
    this.admin.active = true;
    this.storesservice.getstores().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.stores = res.obj;
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
  
  onChangestore(store) {
    this.currentstore = this.stores.filter((x) => x._id == store);
  }

}
