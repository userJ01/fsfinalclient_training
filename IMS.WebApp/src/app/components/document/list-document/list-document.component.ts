import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Auth2Service } from 'src/app/services/auth.service';
import { DataCollectionService } from 'src/app/services/datacollection.service';
import { IDocument } from '../../../interfaces/document';
import { DocumentService } from './../../../services/document.service';
import { Apis } from '../../../services/apis.service';
import { Router } from '@angular/router';

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
    private dataCollectionService: DataCollectionService,private _router:Router
  ) {
    //this.documents=this._docService.getDocuments() as any;
  }
  ngOnInit() {
    //this.documents=this._docService.getDocuments();
    //    this.documents=this._docService.getDocuments;
    var endpoint =Apis.documentAPI+ "GetDocuments" 
    this.httpClient.get(endpoint).subscribe((data) => {
      this.documents = data as IDocument;

      this.documents.forEach((document: IDocument) => {
        this.dataCollectionService.add(document);
      });
      //console.log(this.products);
    });

  }

deleteFile(docId:any)
{
  this._docService.deleteFile(docId);
  this.reloadComponent()
}
reloadComponent() {
  let currentUrl = this._router.url;
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
      this._router.navigate([currentUrl]);
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
      let p = this.httpClient.post(Apis.uploadFile, formData, {
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
