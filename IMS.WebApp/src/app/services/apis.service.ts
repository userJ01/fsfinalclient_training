import { Injectable } from '@angular/core';
import {environment} from "./../../environments/environment.prod";


export const  Apis ={

  ////LOCAL ng serve --proxy-config proxy.conf.json
  userAPI:("api/User/"),
  markerAPI:("api/Marker/"),
  documentAPI:("api/Document/"),
  uploadFile:("api/UploadFile/")
  /*
  ////FOR PRODUCTION ng build --prod
  userAPI:(environment.apiUrl+"api/User/"),
  markerAPI:(environment.apiUrl+"api/Marker/"),
  documentAPI:(environment.apiUrl+"api/Document/"),
  uploadFile:(environment.apiUrl+ "api/UploadFile/")
  */
}
