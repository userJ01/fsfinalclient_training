import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  uploadForm:FormGroup
  title = 'FileUpload';
  constructor(private http:HttpClient){

  }
  onFileChange(event){
    console.log(event)
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.uploadForm.patchValue({
          file: reader.result
       });
       console.log(this.uploadForm.value)
      }
    }
    
  }
  onSubmit(){
    let data = this.uploadForm.value
    var httpOptions = {
      headers:new HttpHeaders(
        {'Content-Type':'application/json'}
      )
    }
  
    var post = this.http.post("api/UploadFile",data,httpOptions)
    post.subscribe(response=>console.log("Gotit"),
    error=>console.log(error))

  }
  ngOnInit(){
    this.uploadForm = new FormGroup({
      file:new FormControl(null)
    })
  }
  ngOnAfterViewInit(){
    
  }
}
