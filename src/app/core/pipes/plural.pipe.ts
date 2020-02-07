import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural'
})
export class PluralPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let noun = args[0];
    let val = value.toString();
    switch(noun) {
      case 'season': 
        if (value === 1) {
          val = val.concat(' Season');
        } else {
          val = val.concat(' Seasons');
        }
        break;
    }

    return val;
  }

}
