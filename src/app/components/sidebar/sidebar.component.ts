import { Component, OnInit } from "@angular/core";

export const ROUTES = [

  
  // {
  //   title: "الشراكه",
  //   icon: "fas fa-handshake",
  //   obj: [
  //     {
  //       path: "/partnersell",
  //       title: "المبيعات",
  //     },
  //     {
  //       path: "/partnerfinancialsupplies",
  //       title: "توريدات ماليه",
  //     },

  //     {
  //       path: "/patneracceptrefusesellbuyorders",
  //       title: "قبول طلبات الشراء",
  //     },

  //     {
  //       path: "/accepttransferpartner",
  //       title: "قبول طلبات التوريدات",
  //     },
  //     {
  //       path: "/liquidateaccounts",
  //       title: "تصفيه حسابات شهريه",
  //     },
  //     {
  //       path: "/",
  //       title: "التقارير",
  //       obj: [
  //         {
  //           path: "/rp_parnters",
  //           title: " فواتير المشتريات والمبيعات ",
  //         },
  //         {
  //           path: "/rp_transfer",
  //           title: "التحويلات الصادرة و الورادة",
  //         },
  //         {
  //           path: "/rp_liquidateaccounts",
  //           title: " تقارير التصفيات الكاملة",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    title: "الأصناف",
    icon: "fab fa-product-hunt",
    obj: [
      {
        path: "/products",
        title: "اضافه الاصناف",
      },
      {
        path: "/rp_productaction",
        title: "تقرير حركه الاصناف",
      }
    ],
  },
  {
    title: "المخازن",
    icon: "fas fa-chart-pie",
    obj: [
      {
        path: "/stores",
        title: "اضافه مخازن",
      },
      {
        path: "/carupload",
        title: "تحميل السيارات",
      },
      {
        path: "/transferproductssales",
        title: "تحويل بضاعه بين السيارات",
      },
      {
        path: "/transferproductsbetweenstores",
        title: "تحويل بضاعه بين المخازن",
      },
      {
        path: "/cardownload",
        title: "تنزيل بضاعه من السيارت",
      },
      {
        path: "/rpcarload",
        title: "تقرير جرد سيارة",
      },
      {
        path: "/rp_carupload",
        title: "تقرير التحميل من المخازن ",
      },
      {
        path: "/rp_cardownload",
        title: "تقرير التنزيل من المخزن",
      },
      {
        path: "/rp_transfer_products",
        title: "تقرير تحويل البضاعه بين المخازن",
      },
      {
        path: "/rp_store_inventory",
        title: "تقرير جرد المخازن ",
      },
      
      {
        path: "/rp_storeaction",
        title: "تقرير حركه المخازن ",
      }
    ],
  },
  {
    title: "العملاء",
    icon: "fas fa-user-plus",
    obj: [
      {
        path: "/itineraries",
        title: "خطوط السير",
      },
      {
        path: "/clients",
        title: "بيانات العملاء",
      },
      {
        path: "/paymentformclients",
        title: "سداد مديونيه عملاء",
      },
      {
        path: "/discounttoclients",
        title: "خصومات لمديونيه عملاء",
      },
      {
        path: "/rp_clients",
        title: "تقرير العملاء",
      },
      {
        path: "/rp_debtـclients",
        title: "تقارير مديونيه العملاء",
      },
      {
        path: "/rp_payment_from_clients",
        title: "تقارير سداد مديونيه العملاء",
      },
      {
        path: "/rp_discount_for_clients",
        title: "تقارير  خصومات العملاء",
      },
      {
        path: "/rp_clientaction",
        title: "كشف حساب العملاء",
      }
    ]
  },

  {
    title: "المندوبين",
    icon: "fas fa-car",

    obj: [
      {
        path: "/salesman",
        title: "اضافه مناديب",
      }
    ],
  },
  {
    title: "المصروفات",
    icon: "fas fa-long-arrow-alt-left",
    obj: [
      {
        path: "/expensescat",
        title: "اضافه فئه",
      },
      {
        path: "/expenses",
        title: "اضافه مصروفات",
      },
      {
        path: "/rp_expenses",
        title: "تقارير المصروفات",
      },
    ],
  },
  {
    title: "الخزائن",
    icon: "fas fa-university",
    obj: [
      {
        path: "/treasuries",
        title: "اضافه خزنه",
      },
      {
        path: "/rp_treasuryaction",
        title: "تقرير حركه خزينه",
      }
      ,
      {
        path: "/profit_loss",
        title: "تقرير الربح والخساره"
      }
      
    ],
  },
  {
    title: "الموردين",
    icon: "fab fa-accusoft",
    obj: [
      {
        path: "/suppliers",
        title: "اضافه موردين",
      },
      {
        path: "/paymentforsuppliers",
        title: "سداد مديوينه موردين",
      },
      {
        path: "/rppaymentforsuppliers",
        title: "تقارير سداد المديونيه",
      },
    ],
  },
  {
    title: "المشتريات",
    icon: "fas fa-chart-line",

    obj: [
      {
        path: "/buyfromsuppliers",
        title: "فاتوره مشتريات",
      },
      {
        path: "/rebackbuyfromsupplier",
        title: "مرتجع فاتوره مشتريات",
      },
      {
        path: "/rpbuyfromsuppliers",
        title: "تقرير المشتريات",
      },
      {
        path: "/rprebackbuyfromsuppliers",
        title: "تقرير مرتجع المشتريات",
      }
    ],
  },
  {
    title: "المبيعات",
    icon: "fas fa-cart-arrow-down",

    obj: [
      {
        path: "/sellforclients",
        title: "فواتير المبيعات للمندوبين",
      },
      {
        path: "/sellForclientsfromstore",
        title: "فواتير المبيعات من المخازن",
      },
      {
        path: "/rebacksellforclients",
        title: "مرتجع فاتوره بيع",
      },
      {
        path: "/rpselltoclients",
        title: "تقارير فواتير المبيعات",
      },
      {
        path: "/rprebackselltoclient",
        title: "تقرير مرتجع البيع",
      },
    ],
  },
  {
    title: "شيكات",
    icon: "fas fa-print",
    obj: [
      {
        path: "/bankcheck",
        title: "اضافه شيك",
      },
      {
        path: "/rebackbankcheck",
        title: "استرجاع شيك",
      },
      {
        path: "/cashbankcheck",
        title: "صرف شيك",
      },
      {
        path: "/rpbankcheck",
        title: "تقارير الشيكات العامة",
      }
    ],

  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  name: any;

  constructor() {
    $(document).ready(function(){
      //jquery for toggle sub menus
      $('.sub-btn').click(function(){
        $(this).next('.sub-menu').slideToggle();
      });
 
      //jquery for expand and collapse the sidebar
      $('.menu-btn').click(function(){
        $('.side-bar').addClass('active');
        $('.menu-btn').css("visibility", "hidden");
      });
 
      $('.close-btn').click(function(){
        $('.side-bar').removeClass('active');
        $('.menu-btn').css("visibility", "visible");
      });
    });
  }

  
  ngOnInit() {
    

    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    console.log(this.menuItems);
    this.name = localStorage.getItem("name");
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
  
}
