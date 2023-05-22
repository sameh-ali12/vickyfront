import { Routes } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component';
import {ForgetPasswordComponent} from '../../pages/forgetpassword/forgetpassword.component';
import {RestPasswordComponent} from '../../pages/restpassword/restpassword.component';
import {PrintComponent} from '../../pages/print_page/print_page.component';

export const AuthLayoutRoutes: Routes = [
    {path: 'login',component: LoginComponent},
    {path: 'forgetpassword',component: ForgetPasswordComponent},
    {path: 'restpassword/:token',component: RestPasswordComponent},
    {path: 'print',component: PrintComponent}

    

];
