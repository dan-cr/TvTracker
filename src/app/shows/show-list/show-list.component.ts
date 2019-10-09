import { Component, OnInit } from '@angular/core';
import { TmdbApiService } from '../../core/services/tmdb-api.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {

  pageTitle: string = 'Tv Shows';

  shows: Array<any> = [];
  genres: Array<any> = [];

  pageNumber: number = 1;
  pages: Array<number>;

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
					this.pages = this.paginate(this.pageNumber, res.total_results, 5);
					this.shows.forEach(show => {
						show.genre_names = show.genre_ids
							.filter(id => genreLookup.has(id))
							.map(id => genreLookup.get(id).name)
							.join(', ');
						});
				});
		});
  }

  changePage(page) {
	  console.log(page);
  }

  // Calculate pages from current page, total cut off and return an array of page numbers
  paginate(currPage, totalPages, cutOff) {
	let start, end;
	const lower = Math.floor(cutOff / 2);
	const upper = Math.ceil(cutOff / 2);
	const pages = [];

	if (totalPages < cutOff) {
		start = 1;
		end = totalPages;
	} else if (currPage >= 1 && currPage <= upper) {
		start = 1;
		end = cutOff;
	}  else if ((currPage + lower) >= totalPages) {
		start = totalPages - cutOff;
		end = totalPages;
	} else {
		start = (currPage - upper);
		end = (currPage + lower);
	}

	for (let i = start; i <= end; i++) {
		pages.push(i);
	}

	return pages;
  }

}
