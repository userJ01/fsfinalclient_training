import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import {IUser} from "./../interfaces/user"
@Injectable({
  providedIn: 'root'
})
export class Auth2Service {
  userr!:IUser;
 
  constructor() { }
  getUserDetails() {
    return localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
    }
    setDataInLocalStorage(variableName:any, data:IUser) {
      // this.userr.userName=data.userName;
      // this.userr.userId=data.userId;
      // this.userr.loggedinStatus=data.loggedinStatus;
      // this.userr.subscriptionStatus=data.subscriptionStatus;
    localStorage.setItem(variableName, JSON.stringify(data));
    }

    getDisplayName()
    {
      let temp:any= localStorage.getItem('userData');
      if(temp===null)
      { return null;}
       else
       {
         return (JSON.parse(temp) as IUser).userName;
       }
    }
    getUserId()
    {
      let temp:any= localStorage.getItem('userData');
      if(temp===null)
      { return null;}
       else
       {
         return (JSON.parse(temp) as IUser).userId;
       }
    }
    getToken() 
    {
     let temp:any= localStorage.getItem('userData');
     //debugger;
      if(temp===null)
       { return null;}
        else
        {
          return (JSON.parse(temp) as IUser).loggedinStatus;
        }
    }
    clearStorage() {
    localStorage.clear();
    }
}
