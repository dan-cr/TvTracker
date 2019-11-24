import { Component, OnInit } from '@angular/core';
import { TmdbApiService } from '../../core/services/tmdb-api.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {

  /* Page State */
  pageTitle: string = 'Tv Shows';
  tvCat: string = 'popular';

  /* Show Data */
  tvCategoryOptions: any;
  shows: Array<any> = [];
  genres: Array<any> = [];

  /* Pagination */
  currentPage: number = 1;
  totalPages: number = 1;
  pages: Array<number>;

  constructor(
    private tmdb: TmdbApiService
  ) {}

  getvalue(e) {
	let selected = e.target.dataset.tvcatattr;
	if (selected !== this.tvCat) {
		this.currentPage = 1;
		this.tvCat = selected;
	}
	this.getShows(this.currentPage, this.tvCat);
  }
  public ngOnInit() {
		this.tvCategoryOptions = { 
			popular: 'Popular', 
			top_rated: 'Highest Rated', 
			airing_today: 'Airing Today', 
			on_the_air: 'Currently Airing' 
		};
		this.getShows(this.currentPage, this.tvCat);
  }

  /**
   * Get show results by page number
   * @param {} page
   */
  public getShows(page, category) {
	this.tmdb.getShowByCategory(page, category)
		.pipe(
			mergeMap(shows => {
				this.shows = shows.results;
				this.totalPages = shows.total_pages;
				this.pages = this.paginate(page, shows.total_pages, 5);
				return this.tmdb.getTvGenres();
			})
		).subscribe(gens => {
			// Genre Map lookup table
			this.scrollToTop();
			const genreLookup = new Map();
			this.genres = gens.genres;
			this.genres.forEach(genre => genreLookup.set(genre.id, genre));
			this.currentPage = page;
			this.shows.forEach(show => {
				show.genre_names = show.genre_ids
					.filter(id => genreLookup.has(id))
					.map(id => genreLookup.get(id).name)
					.join(', ');
			});
			this.shows = this.shuffleArray(this.shows);
		});		
  }

  /**
   * Calculate pages from current page, total and range, then return an array of page numbers
   * @param  {} currPage
   * @param  {} totalPages
   * @param  {} range
   */
  public paginate(currPage, totalPages, range) {
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

  /**
   * Scroll smoothly to top of page
   */
  scrollToTop() {
	let scrollToTop = window.setInterval(() => {
		let pos = window.pageYOffset;
		if (pos > 0) {
			window.scrollTo(0, pos - 20); // how far to scroll on each step
		} else {
			window.clearInterval(scrollToTop);
		}
	}, 5);
  }

  /**
   * Scroll smoothly to top of page
   */
  shuffleArray(arr) {
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

}
