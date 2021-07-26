import { Injectable } from '@angular/core';
import { IDocumentMarkers,IDocumentMarkerss } from '../interfaces/documentMarkers';
import{MarkersService} from "./../services/markers.service";

@Injectable()
export class UndoRedoService {
  undoPoints: ImageData[] = new Array<ImageData>();
  indexUndo = -1;
  redoPoints: ImageData[] = new Array<ImageData>();
  indexRedo = -1;
  context: any;
  width: number;
  height: number;

  constructor(public ms:MarkersService){}
  init(context: any, width: number, height: number) {
    this.context = context;
    this.width = width;
    this.height = height;
  }

  redo(docId:any) {
    if (this.indexRedo !== -1) {
      this.context.putImageData(this.redoPoints[this.indexRedo], 0, 0);
      this.undoPoints.push(this.redoPoints[this.indexRedo]);
      this.redoPoints.pop();
      this.indexRedo--;
      this.indexUndo++;
      this.undo_redoMark(docId)
    }
  }

  save() {
    let imgSrc = this.context.getImageData(0, 0, this.width, this.height);
    this.indexUndo++;
    this.undoPoints.push(imgSrc);
    //console.log("imgSrc:",imgSrc);
  }

  undo(docId:any) {
    if (this.undoPoints.length >= 1) {
      this.redoPoints.push(this.undoPoints[this.indexUndo]);
      this.undoPoints.pop();
      this.indexUndo--;
      this.indexRedo++;
      if (this.indexUndo === -1) this.clearCanvas();
      else {
        this.context.putImageData(this.undoPoints[this.indexUndo], 0, 0);
        this.undo_redoMark(docId)
      }
    } else {
      this.clearCanvas();
    }
  }
  undo_redoMark(docId:any)
  {
    let idm:IDocumentMarkers={documentId: docId,userCreatedTheMarker:"",backgroundForColor:"",foregroundForColor:"",markerLocation:"",markerType:""};
    console.log("undo_redoMark idm delete:",idm);
    this.ms.deleteMarker(idm);
  }
  clearCanvas() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.indexUndo = -1;
    this.undoPoints = [];
  }
}
