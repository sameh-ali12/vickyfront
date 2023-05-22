import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()
export class Rp_TransferService {
  token: string;
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {
    this.token = localStorage.getItem("token");
  }
  ///transfer from you
  getalltransfer() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url + "getalltransferfromyou/" + localStorage.getItem("userid"),
      httpOptions
    );
  }
  gettransferfromyouwithstatus(status) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransferfromyouwithstatus/" +
        localStorage.getItem("userid") +
        "/" +
        status,
      httpOptions
    );
  }

  gettransferfromyouwithdate(fromdate, todate) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransferfromyouwithdate/" +
        localStorage.getItem("userid") +
        "/" +
        fromdate +
        "/" +
        todate,
      httpOptions
    );
  }

  gettransferfromyouwithstatusanddate(fromdate, todate, status) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransferfromyouwithstatusanddate/" +
        localStorage.getItem("userid") +
        "/" +
        status +
        "/" +
        fromdate +
        "/" +
        todate,
      httpOptions
    );
  }

  gettransferfromyouwithdateandstatusandpartner(to, fromdate, todate, status) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransferfromyouwithdateandstatusandpartner/" +
        localStorage.getItem("userid") +
        "/" +
        to +
        "/" +
        status +
        "/" +
        fromdate +
        "/" +
        todate,
      httpOptions
    );
  }

  gettransferfromyouwithandstatusandpartner(to, status) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransferfromyouwithandstatusandpartner/" +
        localStorage.getItem("userid") +
        "/" +
        to +
        "/" +
        status,
      httpOptions
    );
  }

  gettransferfromyouwithdateandpartner(to, fromdate, todate) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransferfromyouwithdateandpartner/" +
        localStorage.getItem("userid") +
        "/" +
        to +
        "/" +
        fromdate +
        "/" +
        todate,
      httpOptions
    );
  }

  gettransferfromyouwithpartner(to) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransferfromyouwithpartner/" +
        localStorage.getItem("userid") +
        "/" +
        to,
      httpOptions
    );
  }


    //  to you
    getalltransfertoyou() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url + "getalltransfertoyou/" + localStorage.getItem("userid"),
      httpOptions
    );
  }

  gettransfertoyouwithstatus(status) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransfertoyouwithstatus/" +
        localStorage.getItem("userid") +
        "/" +
        status,
      httpOptions
    );
  }

  gettransfertoyouwithdate(fromdate, todate) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransfertoyouwithdate/" +
        localStorage.getItem("userid") +
        "/" +
        fromdate +
        "/" +
        todate,
      httpOptions
    );
  }

  gettransfertoyouwithstatusanddate(fromdate, todate, status) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransfertoyouwithstatusanddate/" +
        localStorage.getItem("userid") +
        "/" +
        status +
        "/" +
        fromdate +
        "/" +
        todate,
      httpOptions
    );
  }

  gettransfertoyouwithdateandstatusandpartner(from, fromdate, todate, status) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransfertoyouwithdateandstatusandpartner/" +
        localStorage.getItem("userid") +
        "/" +
        from +
        "/" +
        status +
        "/" +
        fromdate +
        "/" +
        todate,
      httpOptions
    );
  }

  gettransfertoyouwithandstatusandpartner(from, status) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransfertoyouwithandstatusandpartner/" +
        localStorage.getItem("userid") +
        "/" +
        from +
        "/" +
        status,
      httpOptions
    );
  }

  gettransfertoyouwithdateandpartner(from, fromdate, todate) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransfertoyouwithdateandpartner/" +
        localStorage.getItem("userid") +
        "/" +
        from +
        "/" +
        fromdate +
        "/" +
        todate,
      httpOptions
    );
  }

  gettransfertoyouwithpartner(from) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "gettransfertoyouwithpartner/" +
        localStorage.getItem("userid") +
        "/" +
        from,
      httpOptions
    );
  }
}
