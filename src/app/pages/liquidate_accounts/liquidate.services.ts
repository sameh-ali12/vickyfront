import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()
export class LiquidateService   {
  token: string;
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {
    this.token =  localStorage.getItem('token');

  }





  
  getliquidation(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "userallinfo/"+localStorage.getItem('userid'),httpOptions);
  }

  addliquidation(obj){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.post(this.globals.url + "addliquidation",obj,httpOptions);
  }

  ////reports
  
  liquidationwithparnter(partner){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "liquidationwithparnter"+"/"+partner+"/"+localStorage.getItem('userid'),httpOptions);
  }

    
  liquidationwithparnteranddate(partner,from,to){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "liquidationwithparnteranddate"+"/"+partner+"/"+localStorage.getItem('userid')+"/"+from+"/"+to,httpOptions);
  }

}


