export interface Movie {
    original_language: any;
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_count: number;
    vote_average: number;
    genres: Genre[]
    poster_path: string;
}

export interface Props {
    movie: Movie;
}

export interface Genre {
    id: number;
    name: string;
}
