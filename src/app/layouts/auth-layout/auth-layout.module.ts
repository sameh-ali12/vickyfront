import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { ForgetPasswordComponent } from '../../pages/forgetpassword/forgetpassword.component';
import {RestPasswordComponent} from '../../pages/restpassword/restpassword.component';
import {PrintComponent} from '../../pages/print_page/print_page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgbModule,ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    RestPasswordComponent,
    PrintComponent
  ]
})
export class AuthLayoutModule { }
