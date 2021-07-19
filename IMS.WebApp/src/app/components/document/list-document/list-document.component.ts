import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Auth2Service } from 'src/app/services/auth.service';
import { DataCollectionService } from 'src/app/services/datacollection.service';
import { IDocument } from '../../../interfaces/document';
import { DocumentService } from './../../../services/document.service';
import {environment} from "./../../../../environments/environment.prod";

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css'],
})
export class ListDocumentComponent implements OnInit {
  documents: any = [];
  products: any = [];
  constructor(
    private httpClient: HttpClient,
    private _auth: Auth2Service,
    private _docService: DocumentService,
    private dataCollectionService: DataCollectionService
  ) {
    //this.documents=this._docService.getDocuments() as any;
  }
  ngOnInit() {
    //this.documents=this._docService.getDocuments();
    //    this.documents=this._docService.getDocuments;
    var remoteAddress =environment.apiUrl+ "api/Document/GetDocuments" 
    this.httpClient.get(remoteAddress).subscribe((data) => {
      this.documents = data as IDocument;

      this.documents.forEach((document: IDocument) => {
        this.dataCollectionService.add(document);
      });
      //console.log(this.products);
    });
    this.httpClient.get((environment.apiUrl+'assets/data.json')).subscribe((data) => {
      this.products = data as IDocument;
      //console.log(this.products);
    });
  }

  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('files', file, file.name);
      formData.append('userId', this._auth.getUserId());
      let options = new HttpHeaders();
      options.append('Access-Control-Allow-Origin', '*');
      options.append('Content-Type', 'multipart/form-data');
      options.append('userId', this._auth.getUserId());
      var remoteAddress =environment.apiUrl+ 'api/UploadFile/';
      //debugger;
      let p = this.httpClient.post(remoteAddress, formData, {
        headers: options,
      });
      //.catch(error => Observable.throw(error))
      p.subscribe(
        (response) => console.log('response', response),
        //data => console.log('success'),
        (error) => console.log(error)
      );
    }
  }
}
