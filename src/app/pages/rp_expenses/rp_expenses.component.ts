import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Globals } from "../../globals";
import { Router } from "@angular/router";
import { ExpensesService } from "../expenses/expenses.services";
import { ExpensesCatService } from "../../pages/expenses_cat/expensescat.services";

@Component({
  selector: "app-rp_expenses",
  templateUrl: "rp_expenses.component.html"
})

export class Rp_ExpensesComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean;
  printmode: boolean = true;
  obj: any;
  expensescats: any;
  totalvalue = 0;
  constructor(
    private expensescatservice: ExpensesCatService,
    private admin: AdminLayoutComponent,
    private expensesservice: ExpensesService,
   private formBuilder: FormBuilder,
    private globals: Globals,
    private router: Router
  ) {}
  ngOnInit() {
    this.getallexpensescat();
    this.searchForm = this.formBuilder.group({
      cat: ["", Validators.required],
      from: ["", Validators.required],
      to: ["", Validators.required]
    });
  }
  get s() {
    return this.searchForm.controls;
  }
  onSubmitsearch() {
    this.printmode = false;
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    var res;
    this.admin.active = true;
    this.expensesservice.expenseswithcatanddate(this.searchForm.value.cat,this.searchForm.value.from,this.searchForm.value.to).subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.obj = res.obj;
          this.findsum(this.obj);
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

  findsum(data) {
    for (let j = 0; j < data.length; j++) {
      this.totalvalue += data[j].value;
    }
  }

  onRest() {
    this.searchForm.reset();
    this.ngOnInit();
    this.printmode = true;
  }

  getallexpensescat() {
    var res;
    this.admin.active = true;
    this.expensescatservice.getallexpensescat().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.expensescats = res.obj;
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



  printall() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("clients") as HTMLElement;
    this.gotoanther();
  }

  gotoanther() {
    setTimeout(() => {
      this.router.navigateByUrl("print");
    }, 0.1);
  }
}
