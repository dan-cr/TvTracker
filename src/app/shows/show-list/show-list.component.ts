import { Component, OnInit } from '@angular/core';
import { TmdbApiService } from '../../core/services/tmdb-api.service';
import { mergeMap } from 'rxjs/operators';
import { UtilsService } from '../../core/services/utils.service';

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
  shows: Array <any> = [];
  genres: Array <any> = [];

  /* Pagination */
  currentPage: number = 1;
  totalPages: number = 1;
  pages: Array <number> ;

  constructor(
    private tmdb: TmdbApiService,
    public utils: UtilsService
  ) {}

  public ngOnInit() {
    this.tvCategoryOptions = {
      popular: {
        title: 'Popular',
        canShuffle: true
      },
      top_rated: {
        title: 'Highest Rated',
        canShuffle: false
      },
      airing_today: {
        title: 'Airing Today',
        canShuffle: true
      },
      on_the_air: {
        title: 'Currently Airing',
        canShuffle: true
      }
    };
    this.getShows(this.currentPage, this.tvCat);
  }

  /**
   * Change Show category
   */
  changeCategory(e) {
    let selected = e.target.dataset.tvcatattr;
    if (selected !== this.tvCat) {
      this.currentPage = 1;
      this.tvCat = selected;
    }
    this.getShows(this.currentPage, this.tvCat);
  }

  /**
   * Get show results by page number
   * @param {} page
   * @param {} category
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

        // Scroll to top on new request
        this.utils.scrollToTop();

        // Genre Map lookup table
        const genreLookup = new Map();
        this.genres = gens.genres;
        this.genres.forEach(genre => genreLookup.set(genre.id, genre));

        // Check if cat should be shuffled
        if (this.tvCategoryOptions[this.tvCat].canShuffle) {
          this.shows = this.utils.shuffleArray(this.shows);
        }

        // Set page number
        this.currentPage = page;

        // Return a comma delimited string of matching genre names.
        this.shows.forEach(show => {
          show.genre_names = show.genre_ids
            .filter(id => genreLookup.has(id))
            .map(id => genreLookup.get(id).name)
            .join(', ');
        });
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
    } else if ((currPage + lower) >= totalPages) {
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
