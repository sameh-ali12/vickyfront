import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { ReactiveFormsModule } from "@angular/forms";
import { Globals } from "./globals";
import { AddLoginService } from "../app/pages/login/login.services";
import { ForgetPasswordService } from "../app/pages/forgetpassword/forgetpassword.services";
import { RestPasswordService } from "../app/pages/restpassword/restpassword.services";
import { ProductsService } from "../app/pages/products/products.services";
import { StoresService } from "../app/pages/stores/stores.services";
import { ItinerariesService } from "../app/pages/itineraries/itineraries.services";
import { ClientsService } from "../app/pages/clients/clients.services";
import { SalesManService } from "../app/pages/salesman/salesman.services";
import { ExpensesCatService } from "./pages/expenses_cat/expensescat.services";
import { ExpensesService } from "./pages/expenses/expenses.services";
import { TreasuryService } from "../app/pages/treasuries/treasuries.services";
import { SuppliersService } from "../app/pages/suppliers/suppliers.services";
import { BankCheckService } from "../app/pages/bank_check/bank_check.services";
import { PartnerSellService } from "../app/pages/partner_sell/partner_sell.services";
import {PartnerFinancialSuppliesService} from "../app/pages/partner_financialـsupplies/partner_financialـsupplies.services";
import {CarUploadService} from "../app/pages/car_upload/car_upload.services";
import {SellForClientService} from "../app/pages/sell_for_clients/sell_for_client.services";
import {BuyFromSuppliersService} from "../app/pages/buy_from_suppliers/buy_from_suppliers.services";
import {PaymentForSuppliersService} from "../app/pages/payment_for_suppliers/payment_for_suppliers.services";
import {PaymentFormClientsService} from "../app/pages/payment_form_clients/payment_form_clients.services";
import {LiquidateService} from "../app/pages/liquidate_accounts/liquidate.services";
import {TransferProductsBetweenStoresService} from "../app/pages/transferproductsbetweenstores/transferproductsbetweenstores.services";
import {Rp_PartnerService} from "../app/pages/rp_partners/rp_partner.services";
import {Rp_TransferService} from "../app/pages/rp_transfer/rp_transfer.services";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
    
    
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [
    Globals,
    AddLoginService,
    ForgetPasswordService,
    RestPasswordService,
    ProductsService,
    StoresService,
    ItinerariesService,
    ClientsService,
    SalesManService,
    ExpensesCatService,
    ExpensesService,
    TreasuryService,
    SuppliersService,
    BankCheckService,
    PartnerSellService,
    PartnerFinancialSuppliesService,
    CarUploadService,
    SellForClientService,
    BuyFromSuppliersService,
    PaymentForSuppliersService,
    PaymentFormClientsService,
    LiquidateService,
    TransferProductsBetweenStoresService,
    Rp_PartnerService,
    Rp_TransferService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
