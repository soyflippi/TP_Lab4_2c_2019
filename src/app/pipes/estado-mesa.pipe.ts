import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoMesa'
})
export class EstadoMesaPipe implements PipeTransform {

  transform(value: number, exponent: string): string {
    switch (value) {
      case 1:
        return 'Esperando Pedido';
      case 2:
        return 'Comiendo';
      case 3:
        return 'Pagando';
      case 4:
        return 'Cerrada';
      case 5:
        return 'Cerrada';
    }
  }
}
