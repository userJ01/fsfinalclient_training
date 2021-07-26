import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Apis } from './../services/apis.service';
import {IDocumentMarkers, IDocumentMarkerss} from "./../interfaces/documentMarkers";

@Injectable({
  providedIn: 'root'
})
export class MarkersService {
  EndPoint =Apis.markerAPI 
  httpOptions  = { headers: new HttpHeaders ({ 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*' }) }   
  _documentMarker:IDocumentMarkers;
  _documentMarkers:IDocumentMarkers[];

  constructor(private httpClient:HttpClient,   private _router:Router) { }
  getMark()
  {
    var getData = this.httpClient.get( this.EndPoint, this.httpOptions)
    getData.subscribe                                  
    (
      response => {
        this._documentMarker=(response as IDocumentMarkers);
        console.log("_document:",this._documentMarker)
        return this._documentMarker;
      },
      error    => console.log(error)
    ) ;
  }
  saveMark(_mark:IDocumentMarkers)
  {
    var postData = this.httpClient.post( (this.EndPoint+"SaveMarker"),_mark, this.httpOptions);
    postData.subscribe                      
    (
      response => console.log(response),
      error    => console.log(error)
    );
  }

  deleteMarkers(_mark:IDocumentMarkers)
  {
    var postData = this.httpClient.post( (this.EndPoint+"DeleteMarkers"),_mark, this.httpOptions);
    postData.subscribe                      
    (
      response => console.log(response),
      error    => console.log(error)
    );
  }
  deleteMarker(_mark:IDocumentMarkers)
  {
    var postData = this.httpClient.post( (this.EndPoint+"DeleteMarker"),_mark, this.httpOptions);
    postData.subscribe                      
    (
      response => console.log(response),
      error    => console.log(error)
    );
  }
  getMarks(docId:any):IDocumentMarkers[]
  {
    var data = this.httpClient.get( (this.EndPoint+"GetMarks?docId="+docId), this.httpOptions);
    data.subscribe                      
    (
      response => {
       let t= (response as IDocumentMarkerss);
       
        this._documentMarkers=t.result;
        if(this._documentMarkers.length<1)
        alert("Dosn't have any marks");
        console.log("get Marker:",this._documentMarkers)
        //return this._documentMarkers;
      },
      error    => console.log(error)
    );
    return this._documentMarkers;
  }
}
