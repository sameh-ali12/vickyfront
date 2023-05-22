import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalesManService } from "../salesman/salesman.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
@Component({
  selector: "app-transferproductscars",
  templateUrl: "transfer_products_car.component.html",
})
export class TransferProductsCarsComponent implements OnInit {
  downloadForm: FormGroup;
  submitted = false;
  submitted2 = false;
  submitted3 = true;
  searchForm: FormGroup;
  salesman: [] = [];
  sales: any;
  carstore: any;
  bigunit: any;
  smallunit: any;
  quntity: any;
  countunit: any;
  enterdproducts: any[] = [];
  obj: { user: string; sales: any; details: any[]; date: any };
  err: boolean = false;
  message: any;
  totalamount: number = 0;
  products: any[];
  currentproduct: any;
  toForm: FormGroup;
  currentsales: any;

  constructor(
    private admin: AdminLayoutComponent,
    private salesmanservice: SalesManService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getallsales();

    this.searchForm = this.formBuilder.group({
      sales: ["", Validators.required],
    });
    this.toForm = this.formBuilder.group({
      sales: ["", Validators.required],
    });
    this.downloadForm = this.formBuilder.group({
      product: ["", Validators.required],
      unit: ["", Validators.required],
      quntity: ["", Validators.required],
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
    return this.toForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.downloadForm.invalid) {
      return;
    }

    var existproduct = this.enterdproducts.filter(
      (x) => x.productid === this.currentproduct.productid._id
    );
    console.log(existproduct);
    if (existproduct.length > 0) {
      alert("لا يمكن اضافه نفس الصنف لنفس الفاتوره");
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
        productid: this.currentproduct.productid._id,
        unit: this.downloadForm.value.unit,
        quntity: this.downloadForm.value.quntity,
        realquntity: quntity,
        productname: this.currentproduct.productid.name,
        unitname: jQuery("#unitname option:selected").text(),
        fullobj: this.currentproduct,
        balancefromcarbefore:this.quntity,
        balancefromafter:this.quntity -  quntity,
        balancetocarbefore:0,
        balancetoafter:quntity

      });
      this.totalamount =
        this.totalamount +
        this.downloadForm.value.price * this.downloadForm.value.quntity;
      for (let index = 0; index < this.carstore.length; index++) {
        if (
          this.carstore[index].productid._id ==
          this.currentproduct.productid._id
        ) {
          this.carstore[index].quntity = this.carstore[index].quntity - quntity;
          if (this.carstore[index].quntity == 0) {
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
      this.clearPanel();
      this.onReset();

    }
  }

  remove(index2) {
    this.products = [];
    var flag = false;
    for (let index = 0; index < this.carstore.length; index++) {
      console.log(this.carstore[index]);
      console.log(this.enterdproducts[index2]);
      if (
        this.carstore[index].productid._id ==
        this.enterdproducts[index2].productid
      ) {
        this.carstore[index].quntity =
          this.carstore[index].quntity +
          this.enterdproducts[index2].realquntity;
        flag = true;
      }
    }
    if (flag == false) {
      this.enterdproducts[index2].fullobj.quntity = this.enterdproducts[
        index2
      ].realquntity;
      this.carstore.push(this.enterdproducts[index2].fullobj);
    }
    for (let index = 0; index < this.carstore.length; index++) {
      this.products.push({
        _id: this.carstore[index].productid._id,
        name: this.carstore[index].productid.name,
        quntity: this.carstore[index].quntity,
      });
    }
    this.enterdproducts.splice(index2, 1);
    this.clearPanel();
  }

  keyword = "name";
  onSubmitsearch() {
    this.submitted2 = true;
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }
    this.getcarstore(this.searchForm.value.sales._id);
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
    var currentproduct = this.carstore.find(
      (x) => x.productid._id === value._id
    );
    this.currentproduct = currentproduct;
    this.downloadForm.patchValue({
      product: currentproduct._id,
    });
    console.log(this.currentproduct);
    this.bigunit = currentproduct.productid.bigunit;
    this.smallunit = currentproduct.productid.smallunit;
    this.countunit = currentproduct.productid.countunit;
    this.quntity = currentproduct.quntity;
  }

  onSubmitto() {
    this.submitted3 = true;
    // stop here if form is invalid
    if (this.toForm.invalid || this.enterdproducts.length == 0) {
      return;
    }

    for (let index = 0; index < this.enterdproducts.length; index++) {
      const element = this.enterdproducts[index];
      var flag = false;
      for (
        let index = 0;
        index < this.toForm.value.sales.carstore.length;
        index++
      ) {
        if (
          element.productid == this.toForm.value.sales.carstore[index].productid
        ) {
          flag = true;
          this.toForm.value.sales.carstore[index].quntity =
            this.toForm.value.sales.carstore[index].quntity +
            element.realquntity;
        }
      }
      if (flag != true) {
        this.toForm.value.sales.carstore.push({
          productid: element.productid,
          quntity: element.realquntity,
        });
      }
    }
    this.searchForm.value.sales.carstore = this.carstore;

    var res;
    this.admin.active = true;
    var obj = {
      user: localStorage.getItem("userid"),
      date: Date.now(),
      fromsales: this.searchForm.value.sales._id,
      tosales: this.toForm.value.sales._id,
      details: this.enterdproducts
    };
    this.salesmanservice.transferproducts(obj).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.toForm.reset();
          this.searchForm.reset();
          this.downloadForm.reset();
          this.enterdproducts = [];
          this.products = [];
          this.err = true;
          this.message = "تم التحويل";
        } else {
          alert("حدث خطآ");
          this.admin.active = false;
        }
      },
      error: (error) => {
        alert(error);
        this.admin.active = false;
      },
    });
  }

  async onChangesales(value) {
    this.admin.active = true;
    this.currentsales =  await this.sales.filter((x) => x._id == this.toForm.value.sales._id);

    var x = this.currentsales[0].carstore;
    for (const index in this.enterdproducts) {
      for (const index2 in x) {
        if (this.enterdproducts[index].productid == x[index2].productid) {
          this.enterdproducts[index].balancetocarbefore = x[index2].quntity;
          this.enterdproducts[index].balancetoafter = x[index2].quntity + this.enterdproducts[index].realquntity;
        }
      }
    }
    this.admin.active = false;
  }
}
