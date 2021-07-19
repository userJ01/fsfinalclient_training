import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {CustomeValidatorService,CheckUserIdValidator} from "./../../../services/custome-validator.service";
import {UserService} from "./../../../services/user.service";

//import { ApiService } from '../../../services/api.service' ;
//import { AuthService } from './../../../services/auth.service.service';
import { Auth2Service } from './../../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  isLogin: boolean = false
  errorMessage: any
  loginForm =  new FormGroup
  ({
    userid    : new FormControl('',[Validators.required,CheckUserIdValidator]),      // ID as email-address 
    username  : new FormControl('',[Validators.required])       // user-name  
  })

  constructor(
    private _UserService:UserService
  
  ) { }
  
    ngOnInit() {
      this.isUserLogin();
    }
  onSubmit(form: any)
  {
      console.log('Your form data : ', form);
      this._UserService.LogInUserComm(form)
  }
    isUserLogin(){
      // console.log(this._auth.getUserDetails())
      // if(this._auth.getUserDetails() != null){
      // this.isLogin = true;
      // }else{this.isLogin = false;}
    }
    logout(){
    // this._auth.clearStorage()
    // this._router.navigate(['']);
    }
  }
