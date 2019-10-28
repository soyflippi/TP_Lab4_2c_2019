import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rol'
})
export class RolPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    switch (value) {
      case 4:
        return 'Mozo';
      case 5:
        return 'Cervecero';
      case 6:
        return 'Bartender';
      case 7:
        return 'Cocinero';
      case 8:
        return 'Repostero';
      case 10:
        return 'Socio';

    }
  }

}
