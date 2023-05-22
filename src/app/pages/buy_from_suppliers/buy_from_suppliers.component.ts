import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { StoresService } from "../stores/stores.services";
import { TreasuryService } from "../treasuries/treasuries.services";
import { ProductsService } from "../products/products.services";
import { SuppliersService } from "../suppliers/suppliers.services";
import { BuyFromSuppliersService } from "./buy_from_suppliers.services";
import { ClientsService } from "../clients/clients.services";

@Component({
  selector: "app-buyfromsuppliers",
  templateUrl: "buy_from_suppliers.component.html",
})
export class BuyFromSuppliersComponent implements OnInit {
  downloadForm: FormGroup;
  submitted = false;
  submitted3 = false;
  searchForm: FormGroup;
  totalbuyForm: FormGroup;
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
  products: any;
  suppliers: any;
  viewclient: boolean = false;
  viewsuppliers: boolean = false;
  selectedprod: any;
  selectedclient: any;
  selectedsupplier: any;
  currentstore: any;

  constructor(
    private admin: AdminLayoutComponent,
    private formBuilder: FormBuilder,
    private storesservice: StoresService,
    private treasuryservice: TreasuryService,
    private productsservice: ProductsService,
    private suppliersservice: SuppliersService,
    private buyFromsuppliersservice: BuyFromSuppliersService,
    private clientsservice: ClientsService
  ) {}

  ngOnInit() {
    this.getallproduct();
    this.getalltreasuries();
    this.getallsuppliers();
    this.getallstores();
    this.getclients();
    this.downloadForm = this.formBuilder.group({
      // product: ["", Validators.required],
      unit: ["", Validators.required],
      quntity: ["", Validators.required],
      price: ["", Validators.required],
    });

    this.totalbuyForm = this.formBuilder.group({
      // billno: ["", Validators.required],
      totalamount: [""],
      cash: [0, Validators.required],
      remain: [0],
      supplier: [""],
      treasury: ["", Validators.required],
      store: ["", Validators.required],
      balancebefore: [0],
      balanceafter: [0],
      notes: [""],
      to: [""],
      client: [""]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.downloadForm.controls;
  }

  get h() {
    return this.totalbuyForm.controls;
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
    this.enterdproducts.push({
      productid: this.selectedprod._id,
      unit: this.downloadForm.value.unit,
      quntity: this.downloadForm.value.quntity,
      realquntity: quntity,
      price: this.downloadForm.value.price,
      productname: this.selectedprod.name,
      unitname: jQuery("#unitname option:selected").text(),
      balancestorebefore: 0,
      balancestoreafter: quntity
    });
    this.totalamount +=
      this.downloadForm.value.quntity * this.downloadForm.value.price;
    console.log(this.totalamount);
    this.totalbuyForm.patchValue({
      totalamount: this.totalamount,
      remain: this.totalamount - this.totalbuyForm.value.cash,
    });
    this.onReset();
    this.clearPanel();
    this.clearPanelclient();
    this.clearPanelsupplier();

  }

  onReset() {
    this.submitted = false;
    this.downloadForm.reset();
  }
  onChangeproduct(value) {}

  onChangeSupplier(value) {
    var currentsupplier = this.suppliers.find((x) => x._id === value._id);
    this.selectedsupplier = currentsupplier;
    this.totalbuyForm.patchValue({
      balancebefore: currentsupplier.value,
      balanceafter: currentsupplier.value + this.totalbuyForm.value.remain,
    });
  }

  onChangeClient(value) {
    var currentclient = this.clients.find((x) => x._id === value._id);
    this.selectedclient= currentclient;
    this.totalbuyForm.patchValue({
      balancebefore: currentclient.debtvalue,
      balanceafter: currentclient.debtvalue - this.totalbuyForm.value.remain,
    });
  }

  onchangeto(value) {
    console.log(value);
    if (value == 1) {
      this.viewclient = true;
      this.viewsuppliers = false;
    } else {
      this.viewclient = false;
      this.viewsuppliers = true;
    }
  }

  remove(index) {
    this.totalamount =  this.totalamount - (this.enterdproducts[index].quntity *  this.enterdproducts[index].price);
    this.totalbuyForm.patchValue({
      totalamount: this.totalamount,
      remain: this.totalamount - this.totalbuyForm.value.cash,
        });
    if(this.totalbuyForm.value.to == 1){
      // this.clearPanelclient();
      this.totalbuyForm.patchValue({
        balanceafter: this.totalbuyForm.value.balanceafter + this.totalbuyForm.value.remain
          });
    }else{
      // this.clearPanelsupplier();
      this.totalbuyForm.patchValue({
        balanceafter: this.totalbuyForm.value.balanceafter + this.totalbuyForm.value.remain
          });
    }
    this.enterdproducts.splice(index, 1);
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
    if (this.totalbuyForm.invalid) {
      return;
    }


    var res1;
    this.admin.active = true;
    /////if treasury havn't this cash
    if (this.totalbuyForm.value.cash != 0) {
      this.treasuryservice
        .gettreasury(this.totalbuyForm.value.treasury)
        .subscribe({
          next: (data) => {
            res1 = data;
            if (res1.code == 100) {
              this.admin.active = false;
              if (this.totalbuyForm.value.cash > res1.obj[0].value) {
                this.err = true;
                this.message = "المبلغ المدفوع ليس موجود في الخزينه";
                return;
              } else {
                this.addnewbill();
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
          },
        });
    } else {
      this.addnewbill();
    }
  }
  onResttotalbuyForm() {
    this.submitted3 = false;
    this.totalbuyForm.reset();
  }
  onChangeCash(target) {
    this.totalbuyForm.patchValue({
      remain: this.totalamount - target,
      // balanceafter:this.totalbuyForm.value.balancebefore + this.totalamount + target
    });
  }
  getallproduct() {
    var res;
    this.productsservice.getallproducts().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.products = res.obj;
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

  keyword = "name";
  selectEvent(item) {
    // do something with selected item
    this.selectedprod = item;
    var currentproduct = this.products.find((x) => x._id === item._id);
    console.log(currentproduct);
    this.bigunit = currentproduct.bigunit;
    this.smallunit = currentproduct.smallunit;
    this.countunit = currentproduct.countunit;
  }





  @ViewChild("auto") auto;
  clearPanel(): void {
    this.auto.clear();
  }


  @ViewChild("autosupplier") autosupplier;
  clearPanelsupplier(): void {
    this.autosupplier.clear();
  }


  @ViewChild("autoclients") autoclients;
  clearPanelclient(): void {
    this.autoclients.clear();
  }


  
  addnewbill() {
    var date = new Date();
    if (this.enterdproducts.length > 0) {
      /////adding bill normal
      var res;
      this.admin.active = true;

      for (const index1 in this.currentstore[0].products) {
        for (const index2 in this.enterdproducts) {
          if(this.currentstore[0].products[index1].productid == this.enterdproducts[index2].productid){
            this.enterdproducts[index2].balancestorebefore = this.currentstore[0].products[index1].quantity;
            this.enterdproducts[index2].balancestoreafter = this.currentstore[0].products[index1].quantity + this.enterdproducts[index2].realquntity;
          }
        }
      }

      var obj;
      console.log(this.totalbuyForm.value.to);
      if (this.totalbuyForm.value.to == 1) {
        obj = {
           billno: "",
          totalamount: this.totalbuyForm.value.totalamount,
          cashed: this.totalbuyForm.value.cash,
          treasury: this.totalbuyForm.value.treasury,
          note: this.totalbuyForm.value.note,
          store: this.totalbuyForm.value.store,
          details: this.enterdproducts,
          user: localStorage.getItem("userid"),
          date: date,
          balancebefore: this.totalbuyForm.value.balancebefore,
          balanceafter: this.totalbuyForm.value.balanceafter,
          client: this.selectedclient._id,
          forclient: true,
        };
      } else {
        if (this.totalbuyForm.value.to == 2) {
          obj = {
            billno: "",
            totalamount: this.totalbuyForm.value.totalamount,
            cashed: this.totalbuyForm.value.cash,
            treasury: this.totalbuyForm.value.treasury,
            note: this.totalbuyForm.value.note,
            store: this.totalbuyForm.value.store,
            details: this.enterdproducts,
            user: localStorage.getItem("userid"),
            supplier: this.selectedsupplier._id,
            date: date,
            balancebefore: this.totalbuyForm.value.balancebefore,
            balanceafter: this.totalbuyForm.value.balanceafter,
          };
        }
      }
      this.buyFromsuppliersservice.addbuybill(obj).subscribe({
        next: (data) => {
          res = data;
          if (res.code == 100) {
            this.err = true;
             this.message = "تم ادراج فاتوره رقم "+res.obj.billno ; 
             alert(this.message);
            this.onResttotalbuyForm();
            this.admin.active = false;
            // this.enterdproducts = [];
            // this.totalamount = 0;
            // this.selectedclient = {};
            // this.selectedsupplier = {};
            // this.clearPanelsupplier();
            // this.clearPanelclient();
            window.location.reload();
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
    } else {
      this.err = true;
      this.message = " يرجي ادخال  منتجات الفاتوره";
    }
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
  
  onChangestore(store) {
    this.currentstore = this.stores.filter((x) => x._id == store);
  }

}
