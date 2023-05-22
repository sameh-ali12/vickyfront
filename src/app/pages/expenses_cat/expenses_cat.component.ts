import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExpensesCatService } from "./expensescat.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";

@Component({
  selector: "app-expensescat",
  templateUrl: "expenses_cat.component.html",
})
export class ExpensesCatComponent implements OnInit {
  catForm: FormGroup;
  submitted = false;
  expensescats: any;
  err: boolean;
  obj: { name: any; user: string };

  constructor(
    private admin: AdminLayoutComponent,
    private expensescatservice: ExpensesCatService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getallexpensescat();
    this.catForm = this.formBuilder.group({
      name: ["", Validators.required],
    });
  }

  get f() {
    return this.catForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    var res;
    this.admin.active = true;
    if (this.catForm.invalid) {
      return;
    }
    this.obj = {
      name: this.catForm.value.name,
      user: localStorage.getItem("userid"),
    };
    this.expensescatservice.addexpensescat(this.obj).subscribe({
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
    this.getallexpensescat();
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.catForm.reset();
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
