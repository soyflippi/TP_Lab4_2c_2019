import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codPipe'
})
export class CodprodToNamePipe implements PipeTransform {

  transform(value: number, args?: any): string {
    switch (value) {
      case 100:
        return 'Cerveza rubia';
      case 101:
        return 'Cerveza negra';
      case 102:
        return 'Cerveza Roja';
      case 103:
        return 'Cerveza IPA';
      case 200:
        return 'Vino tinto UTN';
      case 201:
        return 'Vino blanco UTN';
      case 202:
        return 'Agua';
      case 203:
        return 'Gaseosa Cola';
      case 204:
        return 'Martini';
      case 205:
        return 'Cosmopolitan';
      case 300:
        return 'Asado para 4';
      case 301:
        return 'Asado para 6';
      case 302:
        return 'Ravioles con tuco';
      case 303:
        return 'Ravioles salsa mixta';
      case 304:
        return 'Hamburguesa con papas';
      case 305:
        return 'Ensalada mixta';
      case 400:
        return 'Flan';
      case 401:
        return 'Postre chocolate';
      case 402:
        return 'Budin de pan';
      case 403:
        return 'Helado';
      case 404:
        return 'Panqueque de manzana';
    }
  }

}
