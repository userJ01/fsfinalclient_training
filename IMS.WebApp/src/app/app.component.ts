import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth2Service } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title="WebApp"
  constructor(private _auth: Auth2Service,    private _router:Router){}
  ngOnInit()
  {
    //debugger;
    if(!this._auth.getToken())
    {
      this._router.navigate(['/','login'])
    }
  }
}
