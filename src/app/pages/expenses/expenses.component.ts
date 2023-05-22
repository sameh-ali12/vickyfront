import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExpensesService } from "../expenses/expenses.services";
import { ExpensesCatService } from "../../pages/expenses_cat/expensescat.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { TreasuryService } from "../treasuries/treasuries.services";
@Component({
  selector: "app-expenses",
  templateUrl: "expenses.component.html",
})
export class ExpensesComponent implements OnInit {
  expensesForm: FormGroup;
  submitted = false;
  expenses: any;
  err: boolean;
  expensescats: any;
  treasuries: any;
  obj: { value: any; cat: any; fromtreasury: any; notes: any; user: string,date:any };
  message: string;
  constructor(
    private treasuryservice: TreasuryService,
    private expensescatservice: ExpensesCatService,
    private admin: AdminLayoutComponent,
    private expensesservice: ExpensesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getallexpensescat();
    this.getallexpenses();
    this.getalltreasuries();
    this.expensesForm = this.formBuilder.group({
      value: ["", Validators.required],
      cat: ["", Validators.required],
      treasury: ["", Validators.required],
      notes: [""],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.expensesForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.expensesForm.invalid) {
      return;
    }

    var res2;
    this.treasuryservice
      .gettreasury(this.expensesForm.value.treasury)
      .subscribe({
        next: (data) => {
          res2 = data;
          console.log(res2);
          if (res2.code == 100) {
            this.admin.active = false;
            if (res2.obj[0].value < this.expensesForm.value.value) {
              this.err = true;
              this.message = "المبلغ المطلوب توريده غير موجود في الخزينه";
            } else {
              var res;
              this.admin.active = true;
              this.obj = {
                value: this.expensesForm.value.value,
                cat: this.expensesForm.value.cat,
                fromtreasury: this.expensesForm.value.treasury,
                notes: this.expensesForm.value.notes,
                user: localStorage.getItem("userid"),
                date:Date.now()
              };
              this.expensesservice.addexpenses(this.obj).subscribe({
                next: (data) => {
                  res = data;
                  if (res.code == 100) {
                    this.admin.active = false;
                    this.err = true;
                    this.message = "تمت الاضافه";
                    this.getallexpenses();
                    this.onReset();
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

  onReset() {
    this.submitted = false;
    this.expensesForm.reset();
  }
  getallexpenses() {
    var res;
    this.admin.active = true;
    this.expensesservice.getallexpenses().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.expenses = res.obj;
          console.log(this.expenses);
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

  getallexpensescat() {
    var res;
    this.admin.active = true;
    this.expensescatservice.getallexpensescat().subscribe({
      next: (data) => {
        res = data;
        if (res.code == 100) {
          this.admin.active = false;
          this.err = false;
          this.expensescats = res.obj;
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
}
