import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()
export class PaymentForSuppliersService   {
  token: string;
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {
    this.token =  localStorage.getItem('token');

  }




  addpayment(obj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.post(this.globals.url + "addpaymentforsuppliers",obj,httpOptions);
  }


  paymenttosupplierwithdate(supplier,from,to) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "paymenttosuppliersanddate/"+supplier+"/"+from+"/"+to,httpOptions);
  }




}


