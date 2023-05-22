import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()
export class ForgetPasswordService   {
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {}



 

  forgetpassword(email) {
    return this.http.post(this.globals.url + "user/forgetpassword",email);
  }

  // this.route.snapshot.paramMap.get("animal")
}


