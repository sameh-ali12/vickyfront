import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalesManService } from "../salesman/salesman.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { ClientsService } from "../clients/clients.services";
import { SellForClientService } from "../sell_for_clients/sell_for_client.services";
import { TreasuryService } from "../treasuries/treasuries.services";
import { SuppliersService } from "../suppliers/suppliers.services";
@Component({
  selector: "app-sellforclients",
  templateUrl: "sell_for_clients.component.html",
})
export class SellForClientsComponent implements OnInit {
  downloadForm: FormGroup;
  submitted = false;
  submitted2 = false;
  submitted3 = false;
  searchForm: FormGroup;
  totalsellclientsForm: FormGroup;
  salesman: [] = [];
  sales: any;
  carstore: any;
  bigunit: any;
  smallunit: any;
  quntity: any;
  countunit: any;
  stores: any;
  enterdproducts: any[] = [];
  obj: { user: string; sales: any; details: any[]; date: any };
  err: boolean = false;
  message: any;
  clients: any;
  treasuries: any;
  totalamount: number = 0;
  suppliers: any;
  viewclient: boolean = false;
  viewsuppliers: boolean = false;
  products: any[];
  currentproduct: any;

  constructor(
    private admin: AdminLayoutComponent,
    private salesmanservice: SalesManService,
    private formBuilder: FormBuilder,
    private clientsservice: ClientsService,
    private sellforclientservice: SellForClientService,
    private treasuryservice: TreasuryService,
    private suppliersservice: SuppliersService
  ) {}

  ngOnInit() {
    this.getallsales();
    this.getclients();
    this.getalltreasuries();
    this.getallsuppliers();
    this.searchForm = this.formBuilder.group({
      sales: ["", Validators.required],
    });
    this.downloadForm = this.formBuilder.group({
      product: ["", Validators.required],
      unit: ["", Validators.required],
      quntity: ["", Validators.required],
      price: ["", Validators.required],
    });

    this.totalsellclientsForm = this.formBuilder.group({
      billno: [""],
      totalamount: [0],
      cash: [0, Validators.required],
      remain: [Number],
      client: [""],
      supplier: [""],
      treasury: ["", Validators.required],
      notes: [""],
      discount: [0],
      balancebefore: [0],
      balanceafter: [0],
      to: [""],
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

 var existproduct = this.enterdproducts.filter((x) => x.productid === this.currentproduct.productid._id);
 console.log(existproduct);
 if(existproduct.length > 0 ){
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
        price: this.downloadForm.value.price,
        productname: this.currentproduct.productid.name,
        unitname: jQuery("#unitname option:selected").text(),
        fullobj:this.currentproduct,
        carquantity:this.quntity,
        balancecarbefore:this.quntity,
        balancecarafter:this.quntity - quntity
      });
      this.totalamount =
        this.totalamount +
        this.downloadForm.value.price * this.downloadForm.value.quntity;

      this.totalsellclientsForm.patchValue({
        totalamount: this.totalamount,
        remain:
          this.totalamount -
          this.totalsellclientsForm.value.cash -
          this.totalsellclientsForm.value.discount,
      });
      for (let index = 0; index < this.carstore.length; index++) {
        if (this.carstore[index].productid._id == this.currentproduct.productid._id) {
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


      console.log(this.products);
      this.clearPanel();
      this.onReset();
    }
  }

  remove(index2) {
    this.products = [];
    this.totalamount =  this.totalamount - (this.enterdproducts[index2].quntity *  this.enterdproducts[index2].price);
    this.totalsellclientsForm.patchValue({
      totalamount: this.totalamount,
      remain: this.totalamount - this.totalsellclientsForm.value.cash,
        });
    if(this.totalsellclientsForm.value.to == 1){
      // this.clearPanelclient();
      this.totalsellclientsForm.patchValue({
        balanceafter: this.totalsellclientsForm.value.balanceafter + this.totalsellclientsForm.value.remain
          });
    }else{
      // this.clearPanelsupplier();
      this.totalsellclientsForm.patchValue({
        balanceafter: this.totalsellclientsForm.value.balanceafter + this.totalsellclientsForm.value.remain
          });
    }
    var flag = false;
    for (let index = 0; index < this.carstore.length; index++) {
      console.log(this.carstore[index]);
      console.log(this.enterdproducts[index2]);
      if (this.carstore[index].productid._id == this.enterdproducts[index2].productid) {
        this.carstore[index].quntity = this.carstore[index].quntity + this.enterdproducts[index2].realquntity;
        flag = true;
      }
    }
    if(flag == false){
      this.enterdproducts[index2].fullobj.quntity =  this.enterdproducts[index2].realquntity;
      this.carstore.push(this.enterdproducts[index2].fullobj);
  }
  for (let index = 0; index < this.carstore.length; index++) {
    this.products.push({
      _id: this.carstore[index].productid._id,
      name: this.carstore[index].productid.name,
      quntity: this.carstore[index].quntity
    });
  }
    this.enterdproducts.splice(index2, 1);
     this.clearPanel();
}

  keyword = "name";
  getallsuppliers() {
    this.suppliers = [];
    var res;
    this.admin.active = true;
    this.suppliersservice.getallsuppliers().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.suppliers = res.obj;
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

  onchangeto(value) {
    console.log(value);
    if (value == 1) {
      this.viewclient = true;
      this.viewsuppliers = false;
    }
    else{
      this.viewclient = false;
       this.viewsuppliers = true;
    }
  }

  onChangeSupplier(value) {
    var currentsupplier = this.suppliers.find((x) => x._id === value._id);
    this.totalsellclientsForm.patchValue({
      supplier:currentsupplier._id,
      balancebefore:currentsupplier.value,
      balanceafter:currentsupplier.value - this.totalsellclientsForm.value.remain
    });
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


  @ViewChild('auto') auto;
  clearPanel(): void {
    this.auto.clear();
  }



  @ViewChild('autoclient') autoclient;
  clearPanelclient(): void {
    this.autoclient.clear();
  }

  @ViewChild('autosupplier') autosupplier;
  clearPanelsupplier(): void {
    this.autosupplier.clear();
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
    var currentproduct = this.carstore.find((x) => x.productid._id === value._id);
    this.currentproduct = currentproduct;
    this.downloadForm.patchValue({
      product:currentproduct._id
    });
    console.log(this.currentproduct);
    this.bigunit = currentproduct.productid.bigunit;
    this.smallunit = currentproduct.productid.smallunit;
    this.countunit = currentproduct.productid.countunit;
    this.quntity = currentproduct.quntity;
    console.log(currentproduct.productid.bigunit);
  }

  onChangeunit(target) {
    if (target == "bigunit") {
      this.downloadForm.patchValue({
        price: this.currentproduct.productid.sellprice
      });
    } else {
      this.downloadForm.patchValue({
        price: this.currentproduct.productid.sellprice / this.currentproduct.productid.countunit
      });
    }
  }


  onChangeClient(value) {
    var currentclient = this.clients.find((x) => x._id === value._id);
    this.totalsellclientsForm.patchValue({
      client:currentclient._id,
      balancebefore: currentclient.debtvalue,
      balanceafter:
        currentclient.debtvalue + this.totalsellclientsForm.value.remain,
    });
  }

  getclients() {
    this.clients =[];
    var res;
    this.admin.active = true;
    this.clientsservice.getallclients().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.clients = res.obj;
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
    var obj = {};
    if(this.totalsellclientsForm.value.to == 1){
       obj = {
        billno: this.totalsellclientsForm.value.billno,
        totalamount: this.totalsellclientsForm.value.totalamount,
        cashed: this.totalsellclientsForm.value.cash,
        treasury: this.totalsellclientsForm.value.treasury,
        sales: this.searchForm.value.sales,
        note: this.totalsellclientsForm.value.notes,
        client: this.totalsellclientsForm.value.client,
        details: this.enterdproducts,
        user: localStorage.getItem("userid"),
        discount: this.totalsellclientsForm.value.discount,
        balancebefore: this.totalsellclientsForm.value.balancebefore,
        balanceafter: this.totalsellclientsForm.value.balanceafter,
        date: Date.now(),
      };
    }
    else{
      if(this.totalsellclientsForm.value.to == 2){
         obj = {
          billno: this.totalsellclientsForm.value.billno,
          totalamount: this.totalsellclientsForm.value.totalamount,
          cashed: this.totalsellclientsForm.value.cash,
          treasury: this.totalsellclientsForm.value.treasury,
          sales: this.searchForm.value.sales,
          note: this.totalsellclientsForm.value.notes,
          supplier: this.totalsellclientsForm.value.supplier,
          forsupplier:true,
          details: this.enterdproducts,
          user: localStorage.getItem("userid"),
          discount: this.totalsellclientsForm.value.discount,
          balancebefore: this.totalsellclientsForm.value.balancebefore,
          balanceafter: this.totalsellclientsForm.value.balanceafter,
          date: Date.now()
      }
    }
  }

    console.log(obj);
    this.sellforclientservice.addsellbill(obj).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.onrestotalsellclientsForm();
          this.onResetSearch();
          this.admin.active = false;
          this.err = true;
          this.message = "تم ادخال الفاتوره رقم" + res.obj.billno;
          alert(this.message);
          this.enterdproducts = [];
          this.salesman = [];
          this.carstore = [];
          window.location.reload();
                } else {
          this.admin.active = false;
          this.err = true;
          this.message = "حدث خطأ";
        }
      },
      error: (error) => {
        alert("حدث خطأ اثناء ادراج الفاتوره");
        this.admin.active = false;
      },
    });
    this.totalamount = 0 ;

  }


  onrestotalsellclientsForm() {
    this.submitted3 = false;
    this.totalsellclientsForm.reset();
  }
  onChangeCash(target) {
    this.totalsellclientsForm.patchValue({
      remain:
        this.totalsellclientsForm.value.totalamount -
        target -
        this.totalsellclientsForm.value.discount,
    });
  }

  onChangesDiscount(target) {
    this.totalsellclientsForm.patchValue({
      remain:
        this.totalsellclientsForm.value.totalamount -
        target -
        this.totalsellclientsForm.value.cash,
    });
  }
}
