import { ReadVarExpr, ThrowStmt } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { buffer, map } from 'rxjs/operators';
import { fromEvent, Observable, Subject } from 'rxjs';
import { CanvasService } from 'src/app/services/canvas.service';
import { UndoRedoService } from 'src/app/services/undo-redo.service';
import { GeoService } from 'src/app/services/geo.service';
import { DataCollectionService } from 'src/app/services/datacollection.service';
import { ImageService } from 'src/app/services/image.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IDocument } from 'src/app/interfaces/document';
import {environment} from "./../../../environments/environment.prod";

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.css'],
  providers: [CanvasService, UndoRedoService, GeoService],
})
export class ImageCanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('canvas2') canvas2: ElementRef;
  @ViewChild('colorPicker') colorPicker: ElementRef;
  @ViewChild('image') image: ElementRef;

  isDrawing: boolean = false;
  clientRect: any;
  ctx: any;
  ctx2: any;
  currentShape = 'circle';
  lastX: number;
  lastY: number;
  data: IDocument;

  constructor(
    public canvasService: CanvasService,
    public undoRedoService: UndoRedoService,
    public geoService: GeoService,
    public route: ActivatedRoute,
    public dataCollectionService: DataCollectionService,
    public imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.data = this.dataCollectionService.get(queryParams['index']);
    });
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx2 = this.canvas2.nativeElement.getContext('2d');
    this.fitToContainer(this.canvas.nativeElement, this.container);
    this.fitToContainer(this.canvas2.nativeElement, this.container);
    this.fitToContainer(this.image.nativeElement, this.container);
    this.clientRect = this.canvas.nativeElement.getBoundingClientRect();

    this.canvasService.init(this.canvas, this.clientRect, this.colorPicker);
    this.undoRedoService.init(
      this.ctx2,
      this.clientRect.width,
      this.clientRect.height
    );
    this.loadImage(this.data);

    this.canvasService.mouseDown$.subscribe((event) => {
      this.lastX = event.offsetX;
      this.lastY = event.offsetY;
      this.beginPath();
      this.isDrawing = true;
    });

    this.canvasService.mouseMove$.subscribe((event) => {
      if (this.isDrawing) {
        let currentX = event.offsetX;
        let currentY = event.offsetY;
        this.canvasService.xy$.next([
          event.x - this.clientRect.left,
          event.y - this.clientRect.top,
        ]);

        let lineWidth = this.canvasService.getCurrentBrushSize();
        this.drawLine(this.lastX, this.lastY, currentX, currentY, lineWidth);

        this.lastX = currentX;
        this.lastY = currentY;
      }
    });

    this.canvasService.mouseUp$.subscribe((event) => {
      this.isDrawing = false;
    });

    //buffer get end subscription mouseUp event
    this.canvasService.poly$.subscribe((xyarray) => {
      let [x, y, radius] = this.geoService.findDrawParameters(
        xyarray,
        this.currentShape
      );
      let color = this.canvasService.getCurrentColor();
      this.clearCanvas();
      this.draw(x, y, radius, color);
      this.undoRedoService.save();
    });
  }

  loadImage(document: IDocument) {
   var endpoint= environment.apiUrl+`api/Document/GetImage/${document.docId}`
    this.imageService.loadImageToImg(
      endpoint,
      this.image
    );
  }

  ngOnDestroy() {
    this.dataCollectionService.clear();
  }

  drawR = (x: number, y: number, size: number, color: string) => {
    this.ctx2.fillStyle = color;
    this.ctx2.beginPath();
    this.ctx2.fillRect(x, y, size, size);
    this.ctx2.closePath();
    this.ctx2.fill();
  };

  drawLine(
    lastX: number,
    lastY: number,
    currentX: number,
    currentY: number,
    lineWidth: number
  ) {
    this.ctx.lineWidth = lineWidth;
    this.ctx.moveTo(lastX, lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
  }

  drawC = (x: number, y: number, radius: number, color: string) => {
    this.ctx2.fillStyle = color;
    this.ctx2.beginPath();
    this.ctx2.arc(x, y, radius, 0, Math.PI * 2, true);
    this.ctx2.closePath();
    this.ctx2.fill();
  };

  draw = this.drawC;

  drawRect() {
    this.draw = this.drawR;
    this.currentShape = 'rect';
  }

  drawCircle() {
    this.draw = this.drawC;
    this.currentShape = 'circle';
  }

  beginPath() {
    this.ctx.beginPath();
  }

  fitToContainer(canvas: any, container: ElementRef) {
    canvas.left = container.nativeElement.clientLeft;
    canvas.top = container.nativeElement.clientTop;
    canvas.width = container.nativeElement.clientWidth;
    canvas.height = container.nativeElement.clientHeight;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.clientRect.width, this.clientRect.height);
  }

  clearCanvas2() {
    this.ctx2.clearRect(0, 0, this.clientRect.width, this.clientRect.height);
  }

  hideImage() {
    if (this.image.nativeElement.naturalWidth === 0) {
      this.image.nativeElement.style = `display: none`;
    }
  }

  importPhotoFile(fileInput: any) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.image.nativeElement.style = `display: inline`;
      this.image.nativeElement.src = event.target.result;
    });

    reader.readAsDataURL(file);
  }
}
