import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

      // Convert string to date
      const date = new Date(value);

      // Return -1 if format is invalid
      if ( isNaN(date.valueOf()) ) {
          return -1;
      }

      const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
    
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
    
      return `${day} ${monthNames[monthIndex]} ${year}`;
  }

}
