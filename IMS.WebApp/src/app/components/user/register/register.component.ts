import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import {UserService} from "./../../../services/user.service";
import {CustomeValidatorService,CheckUserIdValidator} from "./../../../services/custome-validator.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit {

  // FORM
  regForm = new FormGroup
  ({
    userid    : new FormControl('',[Validators.required,CheckUserIdValidator]),      // ID as email-address 
    username  : new FormControl('',[Validators.required])       // user-name  
  })

  // INJECT 
  constructor(private commService:UserService){}

  RegisterUser()
  {
    console.log("user-register: SendForm()")
    this.commService.RegisterUserComm(this.regForm)    
  }


  

  ngOnInit():void{}
}
