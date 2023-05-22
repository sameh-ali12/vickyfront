import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {Globals} from "../../globals";
@Component({
  selector: "app-print",
  templateUrl: "print_page.component.html",
})
export class PrintComponent implements OnInit {
  x: string;
  printmode: boolean = false;
  constructor(public router: Router,private globals:Globals) {}
  ngOnInit() {
    var x =  this.globals.printobj;
    document.getElementById("printed").appendChild(x);

  }
  print(){
    this.printmode = true;
    this.printsettime();
  }
  printsettime(){
    setTimeout (() => {
      window.print(); 
    },0.1);
  }
}
