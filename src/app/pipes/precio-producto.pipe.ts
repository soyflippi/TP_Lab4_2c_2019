import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precioProducto'
})
export class PrecioProductoPipe implements PipeTransform {

  transform(value: number, exponent?: string): number {
    switch (value) {
      case 100:
        return 100;
      case 101:
        return 110;
      case 102:
        return 110;
      case 103:
        return 120;
      case 200:
        return 150;
      case 201:
        return 130;
      case 202:
        return 50;
      case 203:
        return 70;
      case 204:
        return 130;
      case 205:
        return 130;
      case 300:
        return 600;
      case 301:
        return 900;
      case 302:
        return 150;
      case 303:
        return 150;
      case 304:
        return 150;
      case 305:
        return 70;
      case 400:
        return 60;
      case 401:
        return 50;
      case 402:
        return 60;
      case 403:
        return 70;
      case 404:
        return 70;
    }
  }

}
