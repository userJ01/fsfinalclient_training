import { ElementRef, Injectable } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { buffer, map } from 'rxjs/operators';

@Injectable()
export class CanvasService {
  mouseDown$: Observable<any>;
  mouseMove$: Observable<any>;
  mouseUp$: Observable<any>;
  mouseMoveUntilUp$: Observable<any>;
  drag$: Observable<any>;
  xy$: Subject<any>;
  poly$: Observable<any>;
  colorChange: Observable<any>;

  currentShape = 'circle';
  height: number;
  width: number;
  currentSize = 0;
  Sizes: number[] = [5, 10, 20];
  currentColor = 'black';
  lastX: number;
  lastY: number;

  init(canvas: any, clientRect: any, colorPicker: any) {
    this.height = clientRect.height;
    this.width = clientRect.width;
    this.colorChange = fromEvent(colorPicker.nativeElement, 'change');
    this.xy$ = new Subject();
    this.mouseDown$ = fromEvent(canvas.nativeElement, 'mousedown');
    this.mouseMove$ = fromEvent(canvas.nativeElement, 'mousemove');
    this.mouseUp$ = fromEvent(canvas.nativeElement, 'mouseup');

    this.colorChange.subscribe((event) => {
      this.changeColor(event.target.value);
    });

    this.mouseMove$.pipe(
      map((evt: MouseEvent) => [
        evt.clientX - clientRect.left,
        evt.clientY - clientRect.top,
      ])
    );

    // Collect all points (polygon)
    this.poly$ = this.xy$.pipe(buffer(this.mouseUp$));
  }

  setLastXY(lastX: number, lastY: number) {
    this.lastX = lastX;
    this.lastY = lastY;
  }

  getLastXY() {
    return [this.lastX, this.lastY];
  }

  changeBrashSize() {
    this.currentSize = ++this.currentSize % 3;
  }

  changeColor(color: string) {
    this.currentColor = color;
  }

  getCurrentColor() {
    return this.currentColor;
  }

  getCurrentBrushSize() {
    return this.Sizes[this.currentSize];
  }
}
