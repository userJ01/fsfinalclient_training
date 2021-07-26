import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth2Service } from 'src/app/services/auth.service';
import {IDocument} from './../interfaces/document';
import {environment} from "./../../environments/environment.prod";
import { Apis } from './../services/apis.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  _document!:IDocument;
  constructor(private httpClient:HttpClient,private _auth:Auth2Service,
    private _router:Router) { }

    getDocuments()
    {
    var endpoint =Apis.documentAPI+ "GetDocuments"                                                            // ADDRESS 
    var httpOptions      = { headers: new HttpHeaders ({ 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*' }) }   // TYPE of data
    var getData = this.httpClient.get( endpoint, httpOptions)                    // CERATE vaiable   
    getData.subscribe                                                                            // SENDING data 
    (
      response => {
        this._document=(response as IDocument);
        //console.log(response)
        console.log("_document:",this._document)
        return this._document;
      },
      error    => console.log(error)
    ) ;
    }

    deleteFile(docId:any)
    {
      var endpoint =Apis.uploadFile+ "DeleteFile" 
      var httpOptions = { headers: new HttpHeaders ({ 'Content-Type':'application/json','Access-Control-Allow-Origin':'*' }) } 
      let d:any=({docId:docId,description:"",documentName:"",imageUrl:"",owner:"",quantity:""}as IDocument)
      var getData = this.httpClient.post( endpoint, d, httpOptions)
      getData.subscribe 
      (
        response => {
          
          console.log("deleteFile:",response)
        },
        error    => console.log(error)
      ) ;
    }

}
