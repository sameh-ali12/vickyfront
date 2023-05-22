import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import {LiquidateAccountsComponent} from "../../pages/liquidate_accounts/liquidate_accounts.component";
import {ProductsComponent} from "../../pages/products/products.component";
import {PartnerSellComponent} from "../../pages/partner_sell/partner_sell.component";
import { PartnerFinancialSuppliesComponent } from "../../pages/partner_financialـsupplies/partner_financialـsupplies.component";
import { PatnerAcceptRefuseSellBuyOrdersComponent } from "../../pages/patner_accept_refuse_sell_buy_orders/patner_accept_refuse_sell_buy_orders.component";
import {StoresComponent} from "../../pages/stores/stores.component";
import {ClientsComponent} from "../../pages/clients/clients.component";
import {SalesManComponent} from "../../pages/salesman/salesman.component";
import {ExpensesCatComponent} from "../../pages/expenses_cat/expenses_cat.component";
import {ExpensesComponent} from "../../pages/expenses/expenses.component";
import {TreasuriesComponent} from "../../pages/treasuries/treasuries.component";
import {SuppliersComponent} from "../../pages/suppliers/suppliers.component";
import {PaymentForSuppliersComponent} from "../../pages/payment_for_suppliers/payment_for_suppliers.component";
import {BuyFromSuppliersComponent} from "../../pages/buy_from_suppliers/buy_from_suppliers.component";
import {SellForClientsComponent} from "../../pages/sell_for_clients/sell_for_clients.component";
import {BankCheckComponent} from "../../pages/bank_check/bank_check.component";
import {RebackBankCheckComponent} from "../../pages/reback_bank_check/reback_bank_check.component";
import {CashBankCheckComponent} from "../../pages/cash_bank_check/cash_bank_check.component";
import {CarUploadComponent} from "../../pages/car_upload/car_upload.component";
import {CarDownloadComponent} from "../../pages/car_download/car_download.component";
import {AcceptTransferPartnerComponent} from "../../pages/accept_transfer_partner/accept_transfer_partner.component";
import {ItinerariesComponent} from "../../pages/itineraries/itineraries.component";
import {RebackSellForClientsComponent} from "../../pages/reback_sell_for_client/reback_sell_for_client.component";
import {RebackBuyFromSupplierComponent} from "../../pages/reback_buy_form_supplier/reback_buy_form_supplier.component";
import {PaymentFormClientsComponent} from "../../pages/payment_form_clients/payment_form_clients.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {SellForClientsFromStoreComponent} from "../../pages/sell_for_clients_from_stores/sell_for_clients_from_stores.component";
import {TransferProductsBetweenStoresComponent} from "../../pages/transferproductsbetweenstores/transferproductsbetweenstores.component";
import {DiscountToClientsComponent} from "../../pages/discount_to_clients/discount_to_clients.component";
import {Rp_PartnerComponent} from "../../pages/rp_partners/rp_partner.component";
import {Rp_TransferComponent} from "../../pages/rp_transfer/rp_transfer.component";
import {RP_LiquidateAccountsComponent} from "../../pages/rp_liquidate_accounts/rp_liquidate_accounts.component";
import {Rp_CarUploadComponent} from "../../pages/rp_carupload/rp_carupload.component";
import {Rp_CarDownloadComponent} from "../../pages/rp_cardownload/rp_cardownload.component";
import {Rp_Transfer_ProductsComponent} from "../../pages/rp_transfer_products/rp_transfer_products.component";
import {Rp_Store_InventoryComponent} from "../../pages/rp_store_inventory/rp_store_inventory.component";
import {RP_StoreActionComponent} from "../../pages/rp_store_action/rp_store_action.component";
import {Rp_ClientsComponent} from "../../pages/rp_clients/rp_clients.component";
import {Rp_Payment_From_ClientsComponent} from "../../pages/rp_payment_from_clients/rp_payment_from_clients.component";
import {Rp_Discount_for_ClientsComponent} from "../../pages/rp_discount_for_clients/rp_discount_for_clients.component";
import {Rp_Debt_ClientsComponent} from "../../pages/rp_debtـclients/rp_debtـclients.component";
import {Rp_ExpensesComponent} from "../../pages/rp_expenses/rp_expenses.component";
import {Rp_PaymentForSuppliersComponent} from "../../pages/rp_payment_for_suppliers/rp_payment_for_suppliers.component";
import {RpBuyFromSuppliersComponent} from "../../pages/rp_buy_from_suppliers/rp_buy_from_suppliers.component";
import {RpReBackBuyFromSuppliersComponent} from "../../pages/rp_reback_buy_from_suppliers/rp_reback_buy_from_suppliers.component";
import {RpSellToClientComponent} from "../../pages/rp_sell_to_clients/rp_sell_to_clients.component";
import {RpReBackBuyToClientComponent} from "../../pages/rp_reback_sell_to_client/rp_reback_sell_to_client.component";
import {RpBankCheckComponent} from "../../pages/rp_bank_check/rp_bank_check.component";
import {Rp_CarloadComponent} from "../../pages/rp_carload/rp_carload.component";
import {RP_TreasuryActionComponent} from "../../pages/rp_treasury_action/rp_treasury_action.component";
import {RP_ClientActionComponent} from "../../pages/rp_client_action/rp_client_action.component";
import {TransferProductsCarsComponent} from "../../pages/transfer_products_car/transfer_products_car.component";
import {RP_SalesActionComponent} from "../../pages/rp_sales_action/rp_sales_action.component";
import {RP_ProductActionComponent} from "../../pages/rp_product_action/rp_product_action.component";
import { NgSelectModule } from '@ng-select/ng-select';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {RoundPipe} from "./round.pipe";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    AutocompleteLibModule
  ],
  declarations: [
    DashboardComponent,
    PartnerSellComponent,
    PartnerFinancialSuppliesComponent,
    PatnerAcceptRefuseSellBuyOrdersComponent,
    ProductsComponent,
    LiquidateAccountsComponent,
    StoresComponent,
    ClientsComponent,
    SalesManComponent,
    ExpensesCatComponent,
    ExpensesComponent,
    TreasuriesComponent,
    SuppliersComponent,
    PaymentForSuppliersComponent,
    BuyFromSuppliersComponent,
    SellForClientsComponent,
    BankCheckComponent,
    RebackBankCheckComponent,
    CashBankCheckComponent,
    CarUploadComponent,
    CarDownloadComponent,
    AcceptTransferPartnerComponent,
    ItinerariesComponent,
    RebackSellForClientsComponent,
    RebackBuyFromSupplierComponent,
    PaymentFormClientsComponent,
    SellForClientsFromStoreComponent,
    TransferProductsBetweenStoresComponent,
    DiscountToClientsComponent,
    Rp_PartnerComponent,
    Rp_TransferComponent,
    RP_LiquidateAccountsComponent,
    Rp_CarUploadComponent,
    Rp_CarDownloadComponent,
    Rp_Transfer_ProductsComponent,
    Rp_Store_InventoryComponent,
    RP_StoreActionComponent,
    Rp_ClientsComponent,
    Rp_Payment_From_ClientsComponent,
    Rp_Discount_for_ClientsComponent,
    Rp_Debt_ClientsComponent,
    Rp_ExpensesComponent,
    Rp_PaymentForSuppliersComponent,
    RpBuyFromSuppliersComponent,
    RpReBackBuyFromSuppliersComponent,
    RpSellToClientComponent,
    RpReBackBuyToClientComponent,
    RpBankCheckComponent,
    Rp_CarloadComponent,
    RP_TreasuryActionComponent,
    RP_ClientActionComponent,
    TransferProductsCarsComponent,
    RoundPipe,
    RP_ProductActionComponent,
    RP_SalesActionComponent
  ]
})
export class AdminLayoutModule {}
