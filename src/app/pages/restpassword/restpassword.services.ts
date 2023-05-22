import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot, ActivatedRoute, Params } from "@angular/router";
@Injectable()
export class RestPasswordService   {
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  

  restpassword(newpass,token) {
    return this.http.put(this.globals.url + "user/restpassword/"+token,newpass);
  }
}

