import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()
export class BuyFromSuppliersService   {
  token: string;
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {
    this.token =  localStorage.getItem('token');
  }

  addbuybill(obj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.post(this.globals.url + "buyfromsuppliers",obj,httpOptions);
  }

  getbuybill(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getbuyfromsupplierbill/"+id+"/"+localStorage.getItem('userid'),httpOptions);
  }
  
  updatebill(id,obj){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.put(this.globals.url + "rebackbuyfromsuppliers/"+id,obj,httpOptions);
  }
  
  getbuybillswithsupplieranddate(supplier,from,to) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getbuybillswithsupplieranddate/"+localStorage.getItem('userid')+"/"+supplier+"/"+from+"/"+to,httpOptions);
  }
  

  getrebackbuybillswithsupplieranddate(supplier,from,to) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getrebackbuybillswithsupplieranddate/"+localStorage.getItem('userid')+"/"+supplier+"/"+from+"/"+to,httpOptions);
  }
}


