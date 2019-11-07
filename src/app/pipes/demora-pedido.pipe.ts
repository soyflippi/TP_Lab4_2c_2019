import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'demoraPedido'
})
export class DemoraPedidoPipe implements PipeTransform {

  transform(value: number, exponent?: string): any {
    switch (value) {
      case 0:
        return '-';
      default:
        return value + 'min';
    }
  }

}
