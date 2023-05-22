import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()
export class ItinerariesService   {
  token: string;
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {
    this.token =  localStorage.getItem('token');

  }




  additierary(obj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.post(this.globals.url + "itineraries",obj,httpOptions);
  }
  getitineraries(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "itineraries/"+localStorage.getItem('userid'),httpOptions);
  }

  edititinerary(id,body){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.put(this.globals.url + "edititinerary/"+id,body,httpOptions);
  }
}


