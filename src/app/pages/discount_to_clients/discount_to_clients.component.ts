import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AdminLayoutComponent} from "../../layouts/admin-layout/admin-layout.component";
import {ClientsService} from "../clients/clients.services";
import { PaymentFormClientsService } from "../payment_form_clients/payment_form_clients.services";
@Component({
  selector: "app-discounttoclients",
  templateUrl: "discount_to_clients.component.html",
})
export class DiscountToClientsComponent implements OnInit {
  discountForm: FormGroup;
  submitted = false;
  err: boolean;
  suppliers: any;
  treasuries: any;
  message: string;
  clients: any;
  dept: number = 0;
  selectedclient: any;

  constructor(
    private formBuilder: FormBuilder,
     private paymentformclientsservice:PaymentFormClientsService,
     private admin:AdminLayoutComponent,
     private clientsservice:ClientsService
     
  ) {}

  ngOnInit() {
    this.getclients();
    this.discountForm = this.formBuilder.group({
      client: [""],
      value: ["", Validators.required],
      notes: [""],
      balancebefore:[""],
      balanceafter:[""]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.discountForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.discountForm.invalid) {
      return;
    }
var obj = {
  value: this.discountForm.value.value,
  note:this.discountForm.value.notes,
  user: localStorage.getItem("userid"),
  client:  this.selectedclient._id,
  daterecived:Date.now(),
  balancebefore:this.discountForm.value.balancebefore,
  balanceafter:this.discountForm.value.balanceafter
}

var res;
this.admin.active = true;
this.paymentformclientsservice.adddiscount(obj).subscribe({
  next: (data) => {
    res = data;
    if (res.code == 100) {
      this.admin.active = false;
      this.err = true;
      this.message ="تم خصم المبلغ من مديونيه العميل";
      alert(this.message);
      window.location.reload();
      // this.ngOnInit();
      // this.dept = 0;
      // this.clearPanel();
        } else {
      this.admin.active = false;
      this.err = true;
      this.message = "حدث خطأ";
    }
  },
  error: (error) => {
    console.log(error);
    alert(error);
    this.admin.active = false;
    this.err = true;
    this.message = "حدث خطأ";
  },
});
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.discountForm.reset();
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
          console.log(this.clients);
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
  


  keyword = "name";
  selectEvent(item) {
    this.selectedclient = item;
    var client = this.clients.find((x) => x._id === item._id);
    this.dept = client.debtvalue 
    this.discountForm.patchValue({
      balancebefore: this.dept
    });
  }

  onChangeCash(val){
    this.discountForm.patchValue({
      balanceafter: this.discountForm.value.balancebefore - val
    });
  }
   


 
}
