import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TreasuryService } from "./treasuries.services";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { Globals } from "src/app/globals";
import { Router } from "@angular/router";

@Component({
  selector: "app-treasuries",
  templateUrl: "treasuries.component.html",
})
export class TreasuriesComponent implements OnInit {
  treasuryForm: FormGroup;
  submitted = false;
  treasuries: any;
  err: boolean;
  obj: { name: any; note: any; user: any; value: any };
  printmode: boolean;
  editmode: boolean;
  id: any;

  constructor(
    private admin: AdminLayoutComponent,
    private treasuryservice: TreasuryService,
    private formBuilder: FormBuilder,
    private globals: Globals,
    private router: Router
  ) {}

  ngOnInit() {
    this.getalltreasury();
    this.treasuryForm = this.formBuilder.group({
      name: ["", Validators.required],
      note: [""],
      value: [0],
    });
  }

  get f() {
    return this.treasuryForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.treasuryForm.invalid) {
      return;
    }
    var res;
    this.admin.active = true;
    this.obj = {
      name: this.treasuryForm.value.name,
      note: this.treasuryForm.value.note,
      user: localStorage.getItem("userid"),
      value: this.treasuryForm.value.value,
    };
    if (this.editmode == true) {
      this.treasuryservice.updatetreasury(this.id,this.obj).subscribe({
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
    } else {
      this.treasuryservice.addtreasury(this.obj).subscribe({
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
    this.editmode = false;
    this.id = "";
    this.getalltreasury();
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.treasuryForm.reset();
  }
  
  getalltreasury() {
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

  printall() {
    this.printmode = true;
    this.globals.printobj = document.getElementById("alldoc") as HTMLElement;
    this.gotoanther();
  }

  gotoanther() {
    setTimeout(() => {
      this.router.navigateByUrl("print");
    }, 0.1);
  }

  edit(treasury) {
    console.log(treasury);
    this.editmode = true;
    this.id = treasury._id;
    this.treasuryForm.patchValue({
      name: treasury.name,
      note: treasury.note,
      value: treasury.value,
    });
  }
}
