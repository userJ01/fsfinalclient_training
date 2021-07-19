import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth2Service } from '../services/auth.service';
import { Router } from '@angular/router';
import {IUser} from "./../interfaces/user";
import {environment} from "./../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user!: IUser;
  constructor(private httpClient:HttpClient,
    private _auth:Auth2Service,
    private _router:Router){}
 

  // REGISTER  
  RegisterUserComm(userData:any)
  {
    // console.log(userData.value)         
    
    console.log("comm-service: RegisterUserComm()" )
    var remoteAddress =environment.apiUrl+ "api/User/Register"                                                            // ADDRESS 
    var httpOptions      = { headers: new HttpHeaders ({ 'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*' }) }   // TYPE of data
    console.log("userData:",userData.value)
    var postData = this.httpClient.post( remoteAddress, userData.value, httpOptions)                    // CERATE vaiable   
    postData.subscribe                                                                            // SENDING data 
    (
      response => console.log(response),
      error    => console.log(error)
    ) 
  }

  // LOGIN
  LogInUserComm(userData:any)
  {
    console.log("loginService",userData.value)
    var remoteAddress =environment.apiUrl+ "api/User/SingIn"                                                            // ADDRESS 
    var httpOptions      = { headers: new HttpHeaders ({ 'Content-Type':'application/json; charset=utf8',
    'Access-Control-Allow-Origin':'*'  }) }   // TYPE of data
    var postData = this.httpClient.post( remoteAddress, userData, httpOptions)                    // CERATE vaiable   
    postData.subscribe                                                                            // SENDING data 
    (
      response => {console.log(response)
      if (response)
        {
          console.log(response)
          this.user=response as IUser;
          this._auth.setDataInLocalStorage('userData', this.user);//JSON.stringify(response));
         // this._auth.setDataInLocalStorage('token', response.token);
          this._router.navigate(['']);
        } else {  }
      },
      error    => console.log(error)
      
    ) 
  }

  // UNSUBSCRIBE 
  UnsubscribeUserComm(userData:any)
  { 
    console.log(userData.value) 
  }
}
