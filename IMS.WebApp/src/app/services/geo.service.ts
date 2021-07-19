import { Injectable } from '@angular/core';

@Injectable()
export class GeoService {
  findDrawParameters(
    xyarray: Array<number[]>,
    currentShape: string
  ): [x: number, y: number, radius: number] {
    if (xyarray[0] !== undefined) {
      let [minX, minY, maxX, maxY] = findMinMax(xyarray);
      let [sumX, sumY] = findSum(xyarray);

      //console.log('Min Point:', minX, minY);
      //console.log('Max Point:', maxX, maxY);
      /*console.log(
        'Middle X, Y',
        Math.ceil(sumX / xyarray.length),
        Math.ceil(sumY / xyarray.length)
      );*/

      let radius: number = 0;
      let x: number = 0;
      let y: number = 0;

      if (currentShape === 'circle') {
        radius = Math.abs(Math.floor(maxX - minX) / 2);
        x = Math.ceil((maxX + minX) / 2);
        y = Math.ceil((maxY + minY) / 2);
      } else {
        radius = Math.abs(maxX - minX);
        x = minX;
        y = minY;
      }

      return [x, y, radius];
    }

    return [0, 0, 0];
  }
}
function findMinMax(xyarray: number[][]): [number, number, number, number] {
  let arrayX = xyarray.map((element) => element[0]);
  let arrayY = xyarray.map((element) => element[1]);
  let findMinMax = (array: number[], func: any) =>
    array.reduce((prev, curr) => func(prev, curr));

  let maxX = findMinMax(arrayX, Math.max);
  let maxY = findMinMax(arrayY, Math.max);
  let minX = findMinMax(arrayX, Math.min);
  let minY = findMinMax(arrayY, Math.min);

  return [minX, minY, maxX, maxY];
}

function findSum(xyarray: number[][]): [number, number] {
  let sumX = 0;
  let sumY = 0;
  let arrayX = xyarray.map((element) => element[0]);
  let arrayY = xyarray.map((element) => element[1]);

  sumX = arrayX.reduce((a, x) => a + x, 0);
  sumY = arrayY.reduce((a, y) => a + y, 0);
  return [sumX, sumY];
}
