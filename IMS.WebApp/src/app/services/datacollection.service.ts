import { Injectable } from '@angular/core';
import { IDocument } from '../interfaces/document';
@Injectable({ providedIn: 'root' })
export class DataCollectionService {
  data: IDocument[];
  constructor() {
    this.data = [];
  }

  add(item: IDocument) {
    this.data.push(item);
    //console.log(item)
    localStorage.setItem("_IDocument", JSON.stringify(item));
  }

  get(index: number) {
    return this.data[index];
  }

  clear() {
    this.data = [];
  }
}
