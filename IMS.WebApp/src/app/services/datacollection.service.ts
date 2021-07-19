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
  }

  get(index: number) {
    return this.data[index];
  }

  clear() {
    this.data = [];
  }
}
