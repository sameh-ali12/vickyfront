import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { StoresService } from "../stores/stores.services";
import { CarUploadService } from "../car_upload/car_upload.services";
import { ClientsService } from "../clients/clients.services";
import { SellForClientService } from "../sell_for_clients/sell_for_client.services";
import { TreasuryService } from "../treasuries/treasuries.services";
@Component({
  selector: "app-rebacksellforclients",
  templateUrl: "reback_sell_for_client.component.html",
})
export class RebackSellForClientsComponent implements OnInit {
  downloadForm: FormGroup;
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
    forsupplier:false,
    supplier:{value:0},
    user: "",
    note: "",
    date: "",
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
        rebackdate: "",
        details: [
          {
            productid: "",
            productname: "",
            unit: "",
            quntity: "",
            price: "",
            realquntity: "",
          },
        ],
        tostore: "",
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
  totalsellclientsForm: FormGroup;
  // bill:{};
  sales: any;
  carstore: any;
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

  constructor(
    private admin: AdminLayoutComponent,
    private formBuilder: FormBuilder,
    private storesservice: StoresService,
    private caruploadservice: CarUploadService,
    private clientsservice: ClientsService,
    private sellforclientservice: SellForClientService,
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
    });

    this.totalsellclientsForm = this.formBuilder.group({
      totalamount: [""],
      cash: ["", Validators.required],
      remain: [""],
      treasury: ["", Validators.required],
      notes: [""],
      store: ["", Validators.required],
      balancebefore: [0],
      balanceafter: [0],
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
    return this.totalsellclientsForm.controls;
  }

  onSubmit() {
    this.submitted = true;

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
      this.enterdproducts.push({
        productid: this.downloadForm.value.product,
        unit: this.downloadForm.value.unit,
        quntity: this.downloadForm.value.quntity,
        realquntity: quntity,
        price: this.downloadForm.value.price,
        productname: jQuery("#productname option:selected").text(),
        unitname: jQuery("#unitname option:selected").text(),
        balancestorebefore:0,
        balancestoreafter:quntity
      });
      this.totalamount +=
        this.downloadForm.value.quntity * this.downloadForm.value.price;
      this.totalsellclientsForm.patchValue({
        totalamount: this.totalamount,
      });
      // for (let index = 0; index < this.carstore.length; index++) {
      //   if (
      //     this.carstore[index].productid._id == this.downloadForm.value.product
      //   ) {
      //     this.carstore[index].realquntity =
      //       this.carstore[index].realquntity - quntity;
      //     // if (this.carstore[index].realquntity == 0) {
      //     //   // this.carstore.splice(index, 1);
      //     // }
      //   }
      // }
      console.log(this.carstore);
      this.onReset();
    }
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
    var currentproduct = this.carstore.find((x) => x.productid._id === value);
    this.bigunit = currentproduct.productid.bigunit;
    this.smallunit = currentproduct.productid.smallunit;
    this.countunit = currentproduct.productid.countunit;
    this.quntity = currentproduct.realquntity;
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
    if (this.totalsellclientsForm.invalid) {
      return;
    }
    var res;
    this.admin.active = true;

    let currentstore = this.stores.filter((x) => x._id == this.totalsellclientsForm.value.store);


    for (const index1 in currentstore[0].products) {
      for (const index2 in this.enterdproducts) {
      if(this.enterdproducts[index2].productid == currentstore[0].products[index1].productid)  {
        this.enterdproducts[index2].balancestorebefore  = currentstore[0].products[index1].quantity;
        this.enterdproducts[index2].balancestoreafter  = currentstore[0].products[index1].quantity +  this.enterdproducts[index2].realquntity
      }
    }      
    }
    this.objbill.details = this.carstore;
    this.objbill.rebackstatus = true;
    var x = this.objbill.rebackdetails;
    x.push({
      rebackdate: Date.now().toString(),
      details: this.enterdproducts,
      tostore: this.totalsellclientsForm.value.store,
      totalamount: this.totalsellclientsForm.value.totalamount,
      cash: this.totalsellclientsForm.value.cash,
      treasury: this.totalsellclientsForm.value.treasury,
      note: this.totalsellclientsForm.value.note,
      balancebefore: this.totalsellclientsForm.value.balancebefore,
      balanceafter: this.totalsellclientsForm.value.balanceafter
    });
    this.objbill.rebackdetails = x;
    this.sellforclientservice
      .updatebill(this.objbill._id, this.objbill)

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
    this.totalsellclientsForm.reset();
  }

  onChangeCash(target) {
    if(this.objbill.forsupplier == true){
      this.totalsellclientsForm.patchValue({
        remain: this.totalamount - target,
        balanceafter:
          this.totalsellclientsForm.value.balancebefore +
          (this.totalamount - target)
      });
    }
    else{
      this.totalsellclientsForm.patchValue({
        remain: this.totalamount - target,
        balanceafter:
          this.totalsellclientsForm.value.balancebefore -
          (this.totalamount - target)
      });

    }

  }

  getbill(billno) {
    var res;
    this.admin.active = true;
    this.sellforclientservice.getsellbill(billno).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.objbill = res.obj[0];
          this.carstore = res.obj[0].details;
        if(this.objbill.forsupplier  == true){
          this.totalsellclientsForm.patchValue({
            balancebefore: this.objbill.supplier.value
          });
        }
        else{
          this.totalsellclientsForm.patchValue({
            balancebefore: this.objbill.client.debtvalue
          });
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
}
