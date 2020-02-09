import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
  * Comparator function used for defaulting keyvalue pipe sort order
  */
  public originalOrder = (a: any, b: any): number => {
    return 0;
  }

  /**
   * Shuffle array using Knuths Fisher-Yates Shuffle
  */
  public shuffleArray(arr) {
    let clone = [...arr],
      current = clone.length,
      random,
      temp;

    while (current !== 0) {
      current--;
      random = Math.floor(Math.random() * (current + 1));
      temp = clone[current];
      clone[current] = clone[random];
      clone[random] = temp;
    }

    return clone;
  }

  /**
  * Scroll smoothly to top of page
  */
  public scrollToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 5);
  }

  // Calculate how many days there are between two dates
  public daysUntilDate(start: Date, end: Date) {

    // Reset hours for both dates to midnight to ensure they do not exceed each other if they are on the same day
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);

    // Get timestamp foreach date
    let sTime = start.getTime();
    let eTime = end.getTime();

    // Ensure start date is the smaller and most recent date
    if (sTime > eTime) {
      let temp = sTime;
      sTime = eTime;
      eTime = temp;
    }

    if (sTime == eTime) {
      return '0';
    } else {
      return Math.floor((eTime - sTime) / 1000 / 60 / 60 / 24).toString();
    }
      
  }

}