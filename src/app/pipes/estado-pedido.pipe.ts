import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoPedido'
})
export class EstadoPedidoPipe implements PipeTransform {

  transform(value: number, exponent: string): string {
    switch (value) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'En preparacion';
      case 2:
        return 'Para servir';
      case 3:
        return 'Clientes comiendo';
    }
  }

}
