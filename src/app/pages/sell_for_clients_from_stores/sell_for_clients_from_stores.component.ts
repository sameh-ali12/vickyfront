import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
 import { PartnerSellService } from "../partner_sell/partner_sell.services";
import { ProductsService } from "../products/products.services";
import { StoresService } from "../stores/stores.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
declare var jQuery: any;
import { AddLoginService } from "../login/login.services";
import { TreasuryService } from "../treasuries/treasuries.services";
import { DecimalPipe } from "@angular/common";
import { ClientsService } from "../clients/clients.services";
import { SellForClientService } from "../sell_for_clients/sell_for_client.services";
import { SuppliersService } from "../suppliers/suppliers.services";
@Component({
  selector: "app-sellForclientsfromstore",
  templateUrl: "sell_for_clients_from_stores.component.html",
})
export class SellForClientsFromStoreComponent implements OnInit {
  sellForm: FormGroup;
  totalsellclientsForm: FormGroup;
  submitteditem = false;
  products: any;
  stores: any;
  totalamount: any = 0;
  totalcashed: number = 0;
  selectedproduct: {
    _id:any,
    name:any,
    bigunit: any;
    smallunit: any;
    sellprice: any;
    countunit: any;
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
    date:any
  };
  message: string;
  storeproducts: any;
  clients: any;
  submitted3 = false;
  suppliers: any;
  viewclient: boolean = false;
  viewsuppliers: boolean = false;
  constructor(
    private admin: AdminLayoutComponent,
    private storesservice: StoresService,
    private productsservice: ProductsService,
    private formBuilder: FormBuilder,
    private sellforclientservice: SellForClientService,
    private clientsservice: ClientsService,
    private treasuryservice: TreasuryService,
    private suppliersservice: SuppliersService

  ) {}

  ngOnInit() {
    this.getallproduct();
    this.getallstores();
    this.getclients();
    this.getalltreasuries();
    this.getallsuppliers();
    this.selectedproduct = {
      _id:"",
      name:"",
      bigunit: "",
      smallunit: "",
      sellprice: "",
      countunit: "",
    };
    this.sellForm = this.formBuilder.group({
      product: [""],
      unit: ["", Validators.required],
      price: ["", Validators.required],
      quntity: ["", Validators.required],
      store: ["", Validators.required],
    });
    this.totalsellclientsForm = this.formBuilder.group({
      billno: [""],
      totalamount: [Number],
      cash: [0, Validators.required],
      discount: [0],
      client: [""],
      treasury: ["", Validators.required],
      notes: [""],
      remain: [Number],
      balancebefore:[0],
      balanceafter:[0],
      to:[""],
      supplier:[""]
    });
  }
  get f() {
    return this.sellForm.controls;
  }
  get h() {
    return this.totalsellclientsForm.controls;
  }
  keyword = "name";
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

  onChangeproduct(target) {
    var res;
    this.productsservice.getsingleproduct(target._id).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.selectedproduct = res.obj[0];
          this.selectedproduct.sellprice = res.obj[0].sellprice;
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
  onChangeunit(target) {
    if (target == "bigunit") {
      this.sellForm.patchValue({
        price: this.selectedproduct.sellprice,
      });
    } else {
      this.sellForm.patchValue({
        price: this.selectedproduct.sellprice / this.selectedproduct.countunit,
      });
    }
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

  submittall() {
    this.submitted3 = true;
    // stop here if form is invalid
    if (this.totalsellclientsForm.invalid) {
      return;
    }
    var res;
    this.admin.active = true;
    var obj;
    console.log(this.totalsellclientsForm.value.to);
    if(this.totalsellclientsForm.value.to == 1){
       obj = {
        billno: this.totalsellclientsForm.value.billno,
        totalamount: this.totalsellclientsForm.value.totalamount,
        cashed: this.totalsellclientsForm.value.cash,
        treasury: this.totalsellclientsForm.value.treasury,
        note: this.totalsellclientsForm.value.note,
        client: this.totalsellclientsForm.value.client,
        details: this.enterdproducts,
        user: localStorage.getItem("userid"),
        directfromstore:true,
        discount:this.totalsellclientsForm.value.discount,
        balancebefore:this.totalsellclientsForm.value.balancebefore,
        balanceafter:this.totalsellclientsForm.value.balanceafter,
        date:Date.now()
      };
    }
    else{
       obj = {
        billno: this.totalsellclientsForm.value.billno,
        totalamount: this.totalsellclientsForm.value.totalamount,
        cashed: this.totalsellclientsForm.value.cash,
        treasury: this.totalsellclientsForm.value.treasury,
        note: this.totalsellclientsForm.value.note,
        supplier: this.totalsellclientsForm.value.supplier,
        forsupplier:true,
        details: this.enterdproducts,
        user: localStorage.getItem("userid"),
        directfromstore:true,
        discount:this.totalsellclientsForm.value.discount,
        balancebefore:this.totalsellclientsForm.value.balancebefore,
        balanceafter:this.totalsellclientsForm.value.balanceafter,
        date:Date.now()
      };
    }
    console.log(obj);
    this.sellforclientservice.addsellbillfromstore(obj).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = true;
          console.log(res.obj);
          this.message = "تم ادخال الفاتوره " + res.obj.billno;
          alert(this.message);
          this.enterdproducts = [];
           window.location.reload();
          // this.clearPanelclient();
          // this.clearPanelsupplier();
          // this.ngOnInit();
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
      },
    });
    this.onResetSellTotal();
    this.totalamount = 0 ; 
  
  }

  getallsuppliers() {
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

  onChangeClient(value) {
    var currentclient = this.clients.find((x) => x._id === value._id);  
    this.totalsellclientsForm.patchValue({
      client:currentclient._id,
      balancebefore:  currentclient.debtvalue,
      balanceafter: currentclient.debtvalue + this.totalsellclientsForm.value.remain
    })
  }



  onResetSellTotal() {
    this.submitted3 = false;
    this.totalsellclientsForm.reset();
  }

  onSubmitItem() {
    this.submitteditem = true;
    // stop here if form is invalid
    if (this.sellForm.invalid) {
      return;
    }

    var existproduct = this.enterdproducts.filter((x) => x.productid === this.selectedproduct._id && x.fromstore ===  this.sellForm.value.store);
    console.log(existproduct)
    if(existproduct.length > 0 ){
      alert(" لا يمكن اضافه نفس الصنف لنفس الفاتوره من نفس المخزن");
      return;
    }
    var quntity;
    var viewquntity;
    // display form values on success
    if (this.sellForm.value.unit == "bigunit") {
      quntity = this.sellForm.value.quntity * this.selectedproduct.countunit;
      viewquntity = this.sellForm.value.quntity
    } else {
      quntity = this.sellForm.value.quntity;
      viewquntity =  this.sellForm.value.quntity
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
            if (this.storeproducts.products[index].productid == this.selectedproduct._id){
              flag = true;
              if (quntity > this.storeproducts.products[index].quantity) {
                this.err = true;
                this.message = "خطأ في ادخال الكمية";
              } else {
                // display form values on success
                this.enterdproducts.push({
                  productid: this.selectedproduct._id,
                  unit: this.sellForm.value.unit,
                  price: this.sellForm.value.price,
                  realquntity: quntity,
                  quntity:this.sellForm.value.quntity,
                  fromstore: this.sellForm.value.store,
                  productname: this.selectedproduct.name,
                  unitname: jQuery("#unitname option:selected").text(),
                  storename: jQuery("#storename option:selected").text(),
                  storequantity:this.storeproducts.products[index].quantity,
                  fullobj:this.selectedproduct,
                  balancestorebefore: this.storeproducts.products[index].quantity,
                  balancestoreafter: this.storeproducts.products[index].quantity - quntity
                });

          
                this.totalamount =
                  this.totalamount +
                  this.sellForm.value.price * this.sellForm.value.quntity;
                this.totalsellclientsForm.patchValue({
                  totalamount: this.totalamount,
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

  getclients() {
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
    this.totalamount =
      this.totalamount -
      this.enterdproducts[index].price * this.enterdproducts[index].quntity;
    this.totalsellclientsForm.patchValue({
      total: this.totalamount,
      remain: this.totalamount - this.totalcashed,
    });

    this.enterdproducts.splice(index, 1);
  }

  onChangecash(target) {
      this.totalcashed = target;
      this.totalsellclientsForm.patchValue({
        remain: this.totalsellclientsForm.value.totalamount  - target - this.totalsellclientsForm.value.discount
      });
    
  }

  
  onChangediscount(target) {
      this.totalsellclientsForm.patchValue({
        remain: this.totalsellclientsForm.value.totalamount - this.totalsellclientsForm.value.cash - target
      });
    }
}
