import { Component, OnInit } from "@angular/core";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { TreasuryService } from "../treasuries/treasuries.services";
import { PartnerFinancialSuppliesService } from "../partner_financialـsupplies/partner_financialـsupplies.services";
@Component({
  selector: "app-accepttransferpartner",
  templateUrl: "accept_transfer_partner.component.html",
})
export class AcceptTransferPartnerComponent implements OnInit {
  transferorders: any;
  treasury: any;
  treasuries: any;
  err: boolean;
  message: any;
  constructor(
    private partnerfinancialsuppliesservice: PartnerFinancialSuppliesService,
    private admin: AdminLayoutComponent,
    private treasuryservice: TreasuryService
  ) {}
  ngOnInit() {
    this.gettransfers();
    this.getalltreasuries();
  }

  gettransfers() {
    var res;
    this.admin.active = true;
    this.partnerfinancialsuppliesservice.gettransferunderprocess().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.transferorders = res.obj;
          console.log(this.transferorders);
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
  accept(order) {

var res;
    this.treasuryservice
    .gettreasury(order.fromtreasury._id)
    .subscribe({
      next: (data) => {
        res = data;
        console.log(res);
        if (res.code == 100) {
          this.admin.active = false;
          if (res.obj[0].value < order.value) {
            this.err = true;
            this.message = "المبلغ المطلوب توريده غير موجود في الخزينه";
          } else {
            order.dateaction = Date.now();
            order.status = "accept";
            order.reading = true;
            order.totreasury = this.treasury;
            if (this.treasury != null) {
              this.updateorder(order._id, order, "تم الموافقه علي طلب التوريد");
            } else {
              this.err = true;
              this.message="يرجي اختيار الخزينه";
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
  refuse(order) {
    order.dateaction = Date.now();
    order.status = "refuse";
    order.reading = true;
      this.updateorder(order._id, order, "تم رفض  طلب التوريد");
  }

  updateorder(id, obj, msg) {
    var res;
    this.partnerfinancialsuppliesservice.updatetransfer(id, obj).subscribe({
      next: (data) => { 
        res = data;
        if (res.code == 100) {
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

    this.gettransfers();
  }
}
