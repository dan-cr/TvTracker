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

  currentPage: number = 1;
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
					this.pages = this.paginate(this.currentPage, res.total_pages, 5);
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
  paginate(currPage, totalPages, range) {
	let start, end;
	const lower = Math.floor(range / 2);
	const upper = Math.ceil(range / 2);
	const pages = [];

	if (totalPages < range) {
		start = 1;
		end = totalPages;
	} else if (currPage >= 1 && currPage <= upper) {
		start = 1;
		end = range;
	}  else if ((currPage + lower) >= totalPages) {
		start = totalPages - range;
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
