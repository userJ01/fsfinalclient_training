import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth2Service } from 'src/app/services/auth.service';
import {IDocument} from './../interfaces/document';
import {environment} from "./../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  _document!:IDocument;
  constructor(private httpClient:HttpClient,private _auth:Auth2Service,
    private _router:Router) { }

    getDocuments()
    {
    var remoteAddress =environment.apiUrl+ "api/Document/GetDocuments"                                                            // ADDRESS 
    var httpOptions      = { headers: new HttpHeaders ({ 'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*' }) }   // TYPE of data
    var getData = this.httpClient.get( remoteAddress, httpOptions)                    // CERATE vaiable   
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

}
