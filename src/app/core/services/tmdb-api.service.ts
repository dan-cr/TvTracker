import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

	// TMDB Api Defaults
	private apiUrl = 'https://api.themoviedb.org/3';
	private apiKey = 'fb2b2d901e07cbafb9e0ae05b5c03d0a';
	private language = 'en-US';
  
 	constructor(
		private http: HttpClient
 	){}

	/**
	 * Returns a list of top rated tv shows.
	 * (Paginated in groups of 20)
	 * @param  {number=1} page
	 * @returns Observable
	 */
  	getTopRatedShows(page:number = 1): Observable<any> {
		return this.http.get(`${this.apiUrl}/tv/top_rated?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
  	}

  	/**
	 * Returns a list of tv genres as an array of objects {id: ... , name: ...}
  	 * @returns Observable
  	 */
  	getTvGenres(): Observable<any> {
		return this.http.get(`${this.apiUrl}/genre/tv/list?api_key=${this.apiKey}&language=${this.language}`);
  	}


}
