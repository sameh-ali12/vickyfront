import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()
export class CarUploadService {
  token: string;
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {
    this.token = localStorage.getItem("token");
  }
  adduploadcar(obj) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.post(this.globals.url + "addcarupload", obj, httpOptions);
  }

  addcardownload(obj) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.post(
      this.globals.url + "addcardownload",
      obj,
      httpOptions
    );
  }

  //// carupload reports
  caruploadwithsales(sales) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "caruploadwithsales/" +
        localStorage.getItem("userid") +
        "/" +
        sales,
      httpOptions
    );
  }

  caruploadwithstore(store) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "caruploadwithstore/" +
        localStorage.getItem("userid") +
        "/" +
        store,
      httpOptions
    );
  }

  caruploadwithstoreanddate(store, from, to) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "caruploadwithstoreanddate/" +
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

  caruploadwithsalesanddate(sales, from, to) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "caruploadwithsalesanddate/" +
        localStorage.getItem("userid") +
        "/" +
        sales +
        "/" +
        from +
        "/" +
        to,
      httpOptions
    );
  }

  caruploadwithsalesandstore(sales, store) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "caruploadwithsalesandstore/" +
        localStorage.getItem("userid") +
        "/" +
        sales +
        "/" +
        store,
      httpOptions
    );
  }
  caruploadwithstoreandsalesanddate(sales, store, from, to) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "caruploadwithstoreandsalesanddate/" +
        localStorage.getItem("userid") +
        "/" +
        sales +
        "/" +
        store +
        "/" +
        from +
        "/" +
        to,
      httpOptions
    );
  }
  // cardownload reports
  cardownloadwithsales(sales) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "cardownloadwithsales/" +
        localStorage.getItem("userid") +
        "/" +
        sales,
      httpOptions
    );
  }

  cardownloadwithstore(store) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "cardownloadwithstore/" +
        localStorage.getItem("userid") +
        "/" +
        store,
      httpOptions
    );
  }

  cardownloadwithstoreanddate(store, from, to) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "cardownloadwithstoreanddate/" +
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

  cardownloadwithsalesanddate(sales, from, to) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "cardownloadwithsalesanddate/" +
        localStorage.getItem("userid") +
        "/" +
        sales +
        "/" +
        from +
        "/" +
        to,
      httpOptions
    );
  }

  cardownloadwithsalesandstore(sales, store) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "cardownloadwithsalesandstore/" +
        localStorage.getItem("userid") +
        "/" +
        sales +
        "/" +
        store,
      httpOptions
    );
  }
  
  cardownloadwithstoreandsalesanddate(sales, store, from, to) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authorization: this.token,
      }),
    };
    return this.http.get(
      this.globals.url +
        "cardownloadwithstoreandsalesanddate/" +
        localStorage.getItem("userid") +
        "/" +
        sales +
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
