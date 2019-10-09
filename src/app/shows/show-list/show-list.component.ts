import { Component, OnInit } from '@angular/core';
import { TmdbApiService } from '../../core/services/tmdb-api.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {

  pageTitle: string = 'Tv Shows';

  shows:Array<any> = [];
  genres:Array<any> = [];

  constructor(
    private tmdb: TmdbApiService
  ) {}

  ngOnInit() {

    this.tmdb.getTopRatedShows()
    	.subscribe((res:any) => {
			this.tmdb.getTvGenres()
				.subscribe((data:any) => {
					// Genre Map lookup table
					const genreLookup = new Map();
					this.genres = data.genres;
					this.genres.forEach(genre => genreLookup.set(genre.id, genre));
					this.shows = res.results;
					this.shows.forEach(show => {
						show.genre_names = show.genre_ids
							.filter(id => genreLookup.has(id))
							.map(id => genreLookup.get(id).name)
							.join(', ');
						});
				});
		});

  }

}
