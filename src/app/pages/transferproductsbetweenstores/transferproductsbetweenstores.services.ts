import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()
export class TransferProductsBetweenStoresService {
  token: string;
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {
    this.token = localStorage.getItem("token");
  }
  addtransferproducts(obj) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.post(
      this.globals.url + "addtransferproducts",
      obj,
      httpOptions
    );
  }
  ////reports transfer products
  transferproductsfromstore(store) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "transferproductsfromstore/" +
        localStorage.getItem("userid") +
        "/" +
        store,
      httpOptions
    );
  }

  transferproductstostore(store) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "transferproductstostore/" +
        localStorage.getItem("userid") +
        "/" +
        store,
      httpOptions
    );
  }

  transferproductstostoreanddate(store, from, to) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "transferproductstostoreanddate/" +
        localStorage.getItem("userid") +
        "/" +
        store +
        "/" +
        from +
        "/" +
        to,
      httpOptions
    );
  }

  transferproductsfromstoreanddate(store,from, to) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "transferproductsfromstoreandstoreandstore/" +
        localStorage.getItem("userid") +
        "/" +
        store +
        "/" +
        from +
        "/" +
        to,
      httpOptions
    );
  }
}
