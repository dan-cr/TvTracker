import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

	// TMDB Api Defaults
	private apiUrl = environment.apiUrl;
	private apiKey = environment.apiKey;
	private language = 'en-US';
  
 	constructor(
		private http: HttpClient
 	){}

	/**
	 * Returns a list of top rated tv shows.
	 * (Paginated in groups of 20)
	 * @param  {number=1} page
	 * @param  {string} category
	 * @returns Observable
	 */
  	getShowsByCategory(page:number = 1, category:string): Observable<any> {
		return this.http.get(`${this.apiUrl}/tv/${category}?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
	}

  	/**
	 * Returns a list of tv genres as an array of objects {id: ... , name: ...}
  	 * @returns Observable
  	 */
  	getTvGenres(): Observable<any> {
		return this.http.get(`${this.apiUrl}/genre/tv/list?api_key=${this.apiKey}&language=${this.language}`);
	}
	  
	/**
	 * Returns a list of matched tv shows.
	 * (Paginated in groups of 20)
	 * @param  {number=1} page
	 * @param  {string} searchTerm
	 * @returns Observable
	 */
	getShowsByName(page:number = 1, searchTerm:string): Observable<any> {
		return this.http.get(`${this.apiUrl}/search/tv?api_key=${this.apiKey}&page=${page}&language=${this.language}&query=${searchTerm}`);
	}

	/**
	 * Retrieves a show by its ID
	 * @param  {number=1} id
	 * @returns Observable
	 */
	getShowById(id) {
		return this.http.get(`${this.apiUrl}/tv/${id}?api_key=${this.apiKey}&language=${this.language}`);
	}
	
	/**
	 * Retrieves a shows season by number and show id
	 * @param  {number=1} id
	 * @returns Observable
	 */
	getShowSeason(id, season) {
		return this.http.get(`${this.apiUrl}/tv/${id}/season/${season}?api_key=${this.apiKey}&language=${this.language}`);
	}

}