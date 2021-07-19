import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CustomeValidatorService {

  constructor() { }
}

// VALIDATOR 
export function CheckUserIdValidator(control:AbstractControl): ValidationErrors|null
{
    var userId = control.value.toString()       // to string 
    var condition =   Condition(userId)         // CONDITION

    return condition?   null : { CheckUserId:{value:control.value} } 
}


// CONDITION 
function Condition(userId:string):boolean
{
    var retval = false
    var length = userId.length                      // extract lenght
    var subUserId = userId.substring(1,length-1)    // substring (without edges)
    retval = subUserId.includes("@")                // check if @ inside substring 

    return retval
}