import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()


export class AddLoginService implements CanActivate {
  token: string;
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {
    this.token =  localStorage.getItem('token');
  }


  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
     const token = localStorage.getItem('token');
    if (!this.isAuthenticated()) {
      this.router.navigateByUrl("/login");
      return false;
    }
    return true;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }

  login(user) {
    return this.http.post(this.globals.url + "user/sign-in", user);
  }

  getallowedusers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "user/"+localStorage.getItem('userid'),httpOptions);
  }
}
