import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth2Service } from 'src/app/services/auth.service';
import {IUser} from "./../interfaces/user";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title="WebApp"
   isLogin:boolean=false;
  constructor(private _auth: Auth2Service,    private _router:Router){

    
  }
  ngOnInit()
  {
    //debugger;
     this.isLogin=this._auth.getToken()
    console.log("Status:",this.isLogin)
    if(!this.isLogin)
    {
      this._router.navigate(['/','login'])
    }
  }
}
