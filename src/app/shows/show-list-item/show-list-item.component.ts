import { Component, OnInit, Input } from '@angular/core';
import { Show } from '../../core/models/show';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-show-list-item',
  templateUrl: './show-list-item.component.html',
  styleUrls: ['./show-list-item.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('fadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0, transform:'translateY(-100px)' }),
        animate(300)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(300, style({ opacity: 0, transform:'translateY(0px)'})))
    ])
  ]
})

export class ShowListItemComponent implements OnInit {

  @Input() show: Show;

  constructor() { }

  ngOnInit() {
  }

  /*
  * Returns a colour that resembles the shows rating
  */
  getRatingColor() {
    let rating = this.show.vote_average,
        bgColor = '#000000'; // Default

    switch(true) {
      case (rating > 6.5 && rating <= 10):
        bgColor = '#53a953'; // Green
        break;
      case (rating > 5 && rating <= 6.5):
        bgColor = '#e66a22'; // Amber
        break;
      case (rating <= 5):
        bgColor = '#bb2424'; // Red
        break;
    }

    return bgColor;

  }

}
