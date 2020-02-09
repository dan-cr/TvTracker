import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from '../../core/services/tmdb-api.service';
import { Show } from '../../core/models/show';
import { UtilsService } from '../../core/services/utils.service';
import { DataService } from '../../core/services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  showId: number;
  showData: Show;
  showRuntime: string;
  showGenres: string;
  showDaysTillNextEp: string;

  constructor(
    private route: ActivatedRoute,
    private tmdb: TmdbApiService,
    private utils: UtilsService,
    private data: DataService,
    private location: Location
  ) {}

  ngOnInit() {

    // Retrieve showId from route params
    this.showId = this.route.snapshot.params['id'];

    this.tmdb.getShowById(this.showId).subscribe(show => {
      this.showData = <Show>show;
      // Update state in shared data service
      this.data.setCurrentShow(this.showData.name);
      let showRuntimes = this.showData.episode_run_time;
      let nextEpisode = this.showData.next_episode_to_air;
      if (nextEpisode) {
        let today = new Date();
        let nextEpisodeDate = new Date(nextEpisode.air_date);
        let daysUntilEp = this.utils.daysUntilDate(today, nextEpisodeDate);
        if (daysUntilEp === '0') {
          this.showDaysTillNextEp = 'today';
        } else {
          this.showDaysTillNextEp = `${daysUntilEp} day(s).`;
        }
      }
      /* Convert from a set to an array so that we only store unique values.
      * We do this incase max.min and math.max return the same value.
      */
      this.showRuntime = Array.from(
          new Set([
              Math.min(...showRuntimes), 
              Math.max(...showRuntimes)
          ])).join(' - ') + ' minutes';

      // Retrieve show genres
      this.showGenres = this.showData.genres.map(genre => {
        return genre.name;
      }).join(', ');

    });
  }

  // Navigate to previous location
  navigateBack() {
    this.location.back();
  }

}
