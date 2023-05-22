import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductsService } from "./products.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Router } from "@angular/router";
import { Globals } from "../../globals";
@Component({
  selector: "app-products",
  templateUrl: "products.component.html",
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  err: boolean;
  products: any;
  obj: {};
  printmode: boolean;
  editmode: boolean;
  selectedid: any;

  constructor(
    private admin: AdminLayoutComponent,
    private productsservice: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private globals: Globals
  ) {}

  ngOnInit() {
    this.getallproduct();
    this.productForm = this.formBuilder.group({
      name: ["", Validators.required],
      sellprice: ["", Validators.required],
      buyprice: ["", Validators.required],
      bigunit: ["", Validators.required],
      smallunit: ["", Validators.required],
      countunit: ["", Validators.required]
    });
  }
  get f() {
    return this.productForm.controls;
  }

  onSubmit() {

    // if(localStorage.getItem('role')=="admin"){

      
    //   var res;
    //   this.admin.active = true;
    //   this.submitted = true;
    //   if (this.productForm.invalid) {
    //     this.admin.active = false;
    //     return;
    //   }
    //   if(this.editmode == true){
    //     this.obj = {
    //       _id:this.selectedid,
    //       name: this.productForm.value.name,
    //       sellprice: this.productForm.value.sellprice,
    //       buyprice: this.productForm.value.buyprice,
    //       bigunit: this.productForm.value.bigunit,
    //       smallunit: this.productForm.value.smallunit,
    //       countunit: this.productForm.value.countunit,
    //       user: localStorage.getItem("userid")
    //     };

    //     this.productsservice.editproduct(this.obj).subscribe({
    //       next: (data) => {
    //         res = data;
    //         if (res.code == 100) {
    //           this.admin.active = false;
    //           this.err = false;
    //         } else {
    //           this.admin.active = false;
    //           this.err = true;
    //         }
    //       },
    //       error: (error) => {
    //         alert(error);
    //         this.admin.active = false;
    //         this.err = true;
    //       },
    //     });

    //     this.editmode = false;


    //   }
    //  else{
    //   this.obj = {
    //     name: this.productForm.value.name,
    //     sellprice: this.productForm.value.sellprice,
    //     buyprice: this.productForm.value.buyprice,
    //     bigunit: this.productForm.value.bigunit,
    //     smallunit: this.productForm.value.smallunit,
    //     countunit: this.productForm.value.countunit,
    //     user: localStorage.getItem("userid")
    //   };
  
    //   this.productsservice.addproduct(this.obj).subscribe({
    //     next: (data) => {
    //       res = data;
    //       if (res.code == 100) {
    //         this.admin.active = false;
    //         this.err = false;
    //       } else {
    //         this.admin.active = false;
    //         this.err = true;
    //       }
    //     },
    //     error: (error) => {
    //       alert(error);
    //       this.admin.active = false;
    //       this.err = true;
    //     },
    //   });
    //  }
     
    //   this.onReset();
    //   this.getallproduct();
    // }
    // else{
    //   alert('اضافه الاصناف للآدمن فقط !');
    // }




      
      var res;
      this.admin.active = true;
      this.submitted = true;
      if (this.productForm.invalid) {
        this.admin.active = false;
        return;
      }
      if(this.editmode == true){
        this.obj = {
          _id:this.selectedid,
          name: this.productForm.value.name,
          sellprice: this.productForm.value.sellprice,
          buyprice: this.productForm.value.buyprice,
          bigunit: this.productForm.value.bigunit,
          smallunit: this.productForm.value.smallunit,
          countunit: this.productForm.value.countunit,
          user: localStorage.getItem("userid")
        };

        this.productsservice.editproduct(this.obj).subscribe({
          next: (data) => {
            res = data;
            if (res.code == 100) {
              this.admin.active = false;
              this.err = false;
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

        this.editmode = false;


      }
     else{
      this.obj = {
        name: this.productForm.value.name,
        sellprice: this.productForm.value.sellprice,
        buyprice: this.productForm.value.buyprice,
        bigunit: this.productForm.value.bigunit,
        smallunit: this.productForm.value.smallunit,
        countunit: this.productForm.value.countunit,
        user: localStorage.getItem("userid")
      };
  
      this.productsservice.addproduct(this.obj).subscribe({
        next: (data) => {
          res = data;
          if (res.code == 100) {
            this.admin.active = false;
            this.err = false;
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
     
      this.onReset();
      this.getallproduct();
    
    
  
  }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
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
        console.log(error);
        this.admin.active = false;
        this.err = true;
      },
    });
  }


  print() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("products") as HTMLElement;
    this.gotoanther();
  }


  gotoanther() {
    setTimeout (() => {
      this.router.navigateByUrl("print");
      },0.1);
  }

  edit(item){
    this.editmode = true;
    this.selectedid = item._id;
    this.productForm.patchValue({
      name:item.name,
      sellprice: item.sellprice,
      buyprice: item.buyprice,
      bigunit: item.bigunit,
      smallunit: item.smallunit,
      countunit: item.countunit
    });
  }


  
}
