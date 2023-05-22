import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()
export class Rp_PartnerService   {
  token: string;
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {
    this.token =  localStorage.getItem('token');

  }
  ///sell bills .
  getallpartnersell(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getallpartnersell/"+localStorage.getItem('userid'),httpOptions);
  }
  getpartnersellwithstatus(status){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnersellwithstatus/"+localStorage.getItem('userid')+"/"+status,httpOptions);
  }

  getpartnersellwithdate(fromdate,todate){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnersellwithdate/"+localStorage.getItem('userid')+"/"+fromdate+"/"+todate,httpOptions);
  }

  getpartnersellwithstatusanddate(fromdate,todate,status){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnersellwithstatusanddate/"+localStorage.getItem('userid')+"/"+status+"/"+fromdate+"/"+todate,httpOptions);
  }

  getpartnersellwithdateandstatusandpartner(to,fromdate,todate,status){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnersellwithdateandstatusandpartner/"+localStorage.getItem('userid')+"/"+to+"/"+status+"/"+fromdate+"/"+todate,httpOptions);
  }

  getpartnersellwithandstatusandpartner(to,status){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnersellwithandstatusandpartner/"+localStorage.getItem('userid')+"/"+to+"/"+status,httpOptions);
  }

  getpartnersellwithdateandpartner(to,fromdate,todate){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnersellwithdateandpartner/"+localStorage.getItem('userid')+"/"+to+"/"+fromdate+"/"+todate,httpOptions);
  }


  getpartnersellwithpartner(to){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnersellwithpartner/"+localStorage.getItem('userid')+"/"+to,httpOptions);
  }

  // buy bills 
  
  getallpartnerbuy(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getallpartnerbuy/"+localStorage.getItem('userid'),httpOptions);
  }

  getpartnerbuywithstatus(status){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnerbuywithstatus/"+localStorage.getItem('userid')+"/"+status,httpOptions);
  }

  getpartnerbuywithdate(fromdate,todate){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnerbuywithdate/"+localStorage.getItem('userid')+"/"+fromdate+"/"+todate,httpOptions);
  }

  getpartnerbuywithstatusanddate(fromdate,todate,status){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnerbuywithstatusanddate/"+localStorage.getItem('userid')+"/"+status+"/"+fromdate+"/"+todate,httpOptions);
  }

  getpartnerbuywithdateandstatusandpartner(from,fromdate,todate,status){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnerbuywithdateandstatusandpartner/"+localStorage.getItem('userid')+"/"+from+"/"+status+"/"+fromdate+"/"+todate,httpOptions);
  }

  getpartnerbuywithandstatusandpartner(from,status){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnerbuywithandstatusandpartner/"+localStorage.getItem('userid')+"/"+from+"/"+status,httpOptions);
  }

  getpartnerbuywithdateandpartner(from,fromdate,todate){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnerbuywithdateandpartner/"+localStorage.getItem('userid')+"/"+from+"/"+fromdate+"/"+todate,httpOptions);
  }

  getpartnerbuywithpartner(from){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "getpartnerbuywithpartner/"+localStorage.getItem('userid')+"/"+from,httpOptions);
  }
  
}



