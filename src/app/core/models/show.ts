export interface Show {
    backdrop_path:string;
    first_air_date:string;
    genre_ids: Array<number>;
    genre_names?: string;
    id: number;
    name: string;
    origin_country: Array<string>;
    original_language: string;
    original_name: string;
    overview:string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}