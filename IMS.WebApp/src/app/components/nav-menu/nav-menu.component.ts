import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { Auth2Service } from 'src/app/services/auth.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
   isLogin:boolean=false;
   username=this._auth.getDisplayName();
  constructor(private _auth: Auth2Service){
    //
  }
  ngOnInit(): void {this.isLogin=this._auth.getToken();
  console.log("Login Status:",this.isLogin)}
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
