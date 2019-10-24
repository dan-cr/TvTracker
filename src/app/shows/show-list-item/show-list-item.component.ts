import { Component, OnInit, Input } from '@angular/core';
import { Show } from '../../core/models/show';
import { trigger, state, style, transition, animate } from '@angular/animations';

enum ColorRating {
  HIGH = '#53A593',
  AVERAGE = '#E66A22',
  POOR = '#BB2424',
  DEFAULT = '#53a593'
}

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
        style({ opacity: 0, transform:'translateY(-25px)' }),
        animate(750)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(750, style({ opacity: 0, transform:'translateY(0px)'})))
    ])
  ]
})

export class ShowListItemComponent implements OnInit {

  @Input() show: Show;
  releaseDate: string;

  constructor() {
  }

  ngOnInit() {
      this.releaseDate = this.show.first_air_date.substring(0, 4);
  }

  /*
  * Returns a colour that resembles the shows rating
  */
  getRatingColor() {
    const rating = this.show.vote_average;
    let bgColor = ColorRating.DEFAULT;

    switch(true) {
      case (rating > 6 && rating <= 10):
        bgColor = ColorRating.HIGH;
        break;
      case (rating > 3 && rating <= 6):
        bgColor = ColorRating.AVERAGE;
        break;
      case (rating <= 3):
        bgColor = ColorRating.POOR;
        break;
    }
    return bgColor;
  }

}
