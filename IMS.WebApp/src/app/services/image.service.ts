import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}

  loadImageToImg(imageUrl: string, img: ElementRef) {
    this.getImage(imageUrl).subscribe(
      (data) => {
        this.createImageFromBlob(data, img);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(imageUrl, { responseType: 'blob' });
  }

  createImageFromBlob(image: Blob, img: any) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        img.nativeElement.src = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
