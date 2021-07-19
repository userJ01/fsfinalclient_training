import { relative } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth2Service } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  
  constructor(private _auth: Auth2Service,    private _router:Router){}
  ngOnInit() {
   //debugger;
   
  }
}
