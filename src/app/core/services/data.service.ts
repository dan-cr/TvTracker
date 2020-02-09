import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /* Shared Data service for tracking state throughout the application */

  // Current active show
  private currentShow: string;

  constructor() {}


  // Return the last visited show name
  getCurrentShow() {
    return this.currentShow || 'Show';
  }

  // Set current show
  setCurrentShow(name) {
    this.currentShow = name;
  }
}
