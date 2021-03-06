import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.toFixed(1).concat('/10');
  }

}
