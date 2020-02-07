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

}