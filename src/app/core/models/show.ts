export interface Show {
    backdrop_path:string;
    first_air_date:string;
    episode_run_time:Array<number>;
    genres?: any;
    genre_ids: Array<number>;
    genre_names?: string;
    id: number;
    name: string;
    next_episode_to_air?: {air_date: string}
    number_of_seasons?: any;
    origin_country: Array<string>;
    original_language: string;
    original_name: string;
    overview:string;
    popularity: number;
    poster_path: string;
    status?: any;
    seasons?: any;
    vote_average: number;
    vote_count: number;
}