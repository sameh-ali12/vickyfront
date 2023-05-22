import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()
export class BankCheckService   {
  token: string;
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {
   this.token =  localStorage.getItem('token');
  }

  addcheck(obj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.post(this.globals.url + "checks",obj,httpOptions);
  }


  getallchecks(status) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "checks/"+localStorage.getItem('userid')+"/"+status,httpOptions);
  }

  allcheckforclient(status,client) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "checks/"+localStorage.getItem('userid')+"/"+status+"/"+client,httpOptions);
  }

  allcheckforclientandcheckno(status,client,checkno) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "checks/"+localStorage.getItem('userid')+"/"+status+"/"+client+"/"+checkno,httpOptions);
  }
  
  updatecheck(obj,id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.put(this.globals.url + "checks/"+id,obj,httpOptions);
  }

  getallcheckforallclientsandalltreasury(status) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getallcheckforallclientsandalltreasury/"+localStorage.getItem('userid')+"/"+status,httpOptions);
  }

  getallcheckforclientsandalltreasury(status,client) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getallcheckforclientsandalltreasury/"+localStorage.getItem('userid')+"/"+status+"/"+client,httpOptions);
  }

  getallcheckforclientsandtreasury(status,client,treasury) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getallcheckforclientsandtreasury/"+localStorage.getItem('userid')+"/"+status+"/"+client+"/"+treasury,httpOptions);
  }


  getallcheckforallclientsandtreasury(status,treasury) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getallcheckforallclientsandtreasury/"+localStorage.getItem('userid')+"/"+status+"/"+treasury,httpOptions);
  }



}


