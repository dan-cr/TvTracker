import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from '../../core/services/tmdb-api.service';
import { Show } from '../../core/models/show';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  id: number;
  showData: Show;
  showRuntime: string;
  showGenres: string;

  constructor(
    private route: ActivatedRoute,
    private tmdb: TmdbApiService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.tmdb.getShowById(this.id).subscribe(show => {
      this.showData = <Show>show;
      let showRuntimes = this.showData.episode_run_time;
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

      console.log(this.showData);
     

    });
  }

}
