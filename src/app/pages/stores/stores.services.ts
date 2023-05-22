import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Globals } from "../../globals";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
@Injectable()
export class StoresService   {
  token: string;
  constructor(
    private http: HttpClient,
    private globals: Globals,
    public router: Router
  ) {
   this.token =  localStorage.getItem('token');
  }

 

 

  addstore(obj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.post(this.globals.url + "stores",obj,httpOptions);
  }


  getstores() {
console.log(this.token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "stores/"+localStorage.getItem('userid'),httpOptions);
  }

  getsinglestore(id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "store/"+id,httpOptions);

  }

  

  inventorywithsingleproductandsinglestore(store,product) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "inventorywithsingleproductandsinglestore/"+localStorage.getItem('userid')+"/"+store+"/"+product,httpOptions);
  }

  
  inventorywithsinglestoreandallproducts(store) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "inventorywithsinglestoreandallproducts/"+localStorage.getItem('userid')+"/"+store,httpOptions);
  }
  


  inventorywithallproductandallstores() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "inventorywithallproductandallstores/"+localStorage.getItem('userid'),httpOptions);
  }

  detailssumproducts(productid){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "detailssumproducts/"+localStorage.getItem('userid')+"/"+productid,httpOptions);
  }

  storeactions(storeid,from,to){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "storeaction/"+localStorage.getItem('userid')+"/"+storeid+"/"+from+"/"+to,httpOptions);
  }

  storeactionswithproducts(storeid,productid,from,to){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authorization: this.token
      })
    };
    return this.http.get(this.globals.url + "storeaction/"+localStorage.getItem('userid')+"/"+storeid+"/"+productid+"/"+from+"/"+to,httpOptions);
  }
}


