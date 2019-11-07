import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: number, exponent?: string): string {
    switch (value) {
      case 1:
        return 'Activo';
      case 2:
        return 'Suspendido';
      case 3:
        return 'Eliminado';
    }
  }

}
