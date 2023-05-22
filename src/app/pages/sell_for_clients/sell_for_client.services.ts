import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()
export class SellForClientService   {
  token: string;
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {
    this.token =  localStorage.getItem('token');
  }

  addsellbill(obj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    console.log(this.globals.url + "sellbill");
    return this.http.post(this.globals.url + "sellbill",obj,httpOptions);
  }

  addsellbillfromstore(obj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.post(this.globals.url + "sellbillfromstore",obj,httpOptions);
  }

  getsellbill(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "sellbill/"+id+"/"+localStorage.getItem('userid'),httpOptions);
  }
  
  updatebill(id,obj){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.put(this.globals.url + "sellbill/"+id,obj,httpOptions);
  }

  ////reports

  getsellbillswithallclientssanddate(from,to) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getsellbillswithallclientssanddate/"+localStorage.getItem('userid')+"/"+from+"/"+to,httpOptions);
  }

  getsellbillswithallclientsandallsalesanddate(from,to) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getsellbillswithallclientsandallsalesanddate/"+localStorage.getItem('userid')+"/"+from+"/"+to,httpOptions);
  }

  getsellbillswithallclientsandstoreanddate(from,to) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getsellbillswithallclientsandstoreanddate/"+localStorage.getItem('userid')+"/"+from+"/"+to,httpOptions);
  }
  
  getsellbillswithoneclientandonesalesanddate(sales,client,from,to) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getsellbillswithoneclientandonesalesanddate/"+localStorage.getItem('userid')+"/"+sales+"/"+client+"/"+from+"/"+to,httpOptions);
  }

  getsellbillswithoneclientandallstoreanddate(client,from,to) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getsellbillswithoneclientandallstoreanddate/"+localStorage.getItem('userid')+"/"+client+"/"+from+"/"+to,httpOptions);
  }


  //////
  getsellbillswithoneclientandallsalesanddate(client,from,to) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getsellbillswithoneclientandallsalesanddate/"+localStorage.getItem('userid')+"/"+client+"/"+from+"/"+to,httpOptions);
  }



  getsellbillswithoneclientandallanddate(client,from,to) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getsellbillswithoneclientandallanddate/"+localStorage.getItem('userid')+"/"+client+"/"+from+"/"+to,httpOptions);
  }


  getsellbillswitallclientandonesalesanddate(sales,from,to) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getsellbillswitallclientandonesalesanddate/"+localStorage.getItem('userid')+"/"+sales+"/"+from+"/"+to,httpOptions);
  }



////

  getrebacksellbillswithclientanddate(client,from,to) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getrebacksellbillswithclientanddate/"+localStorage.getItem('userid')+"/"+client+"/"+from+"/"+to,httpOptions);
  }

}


