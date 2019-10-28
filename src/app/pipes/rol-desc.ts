import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolDesc'
})
export class RolDescPipe implements PipeTransform {

  transform(value: string, args?: any): number {
    switch (value) {
      case 'Mozo':
        return 4;
      case 'Cervecero':
        return 5;
      case 'Bartender':
        return 6;
      case 'Cocinero':
        return 7;
      case 'Repostero':
        return 8;
      case 'Socio':
        return 10;
    }
  }

}
