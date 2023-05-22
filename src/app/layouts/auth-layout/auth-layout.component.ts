import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../components/sidebar/sidebar.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var jQuery: any;

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})



export class AuthLayoutComponent implements OnInit {
  public active = false;
  constructor(private router: Router) {}
  ngOnInit() {
  }
}
