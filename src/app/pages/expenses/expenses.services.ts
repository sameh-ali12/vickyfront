import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()
export class ExpensesService   {
  token: string;
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {
   this.token =  localStorage.getItem('token');
  }

  addexpenses(obj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.post(this.globals.url + "expenses",obj,httpOptions);
  }


  getallexpenses() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "expenses/"+localStorage.getItem('userid'),httpOptions);
  }


  expenseswithcatanddate(cat,from,to) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "expenseswithcatanddate/"+localStorage.getItem('userid')+"/"+cat+"/"+from+"/"+to,httpOptions);
  }

}


