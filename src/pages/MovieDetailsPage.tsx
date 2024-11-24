
import React from 'react';
import {useParams} from 'react-router-dom';
import {useFetch} from '../hook/useFetch';
import {Movie} from "../interfaces/movie";

export const MovieDetailsPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {data: movie, loading} = useFetch<Movie>(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);

    if (loading) return <div>Loading...</div>;
    if (!movie) return <div>Movie not found</div>;

    return (
        <div className="movie-details">
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <p>Language: {movie.original_language}</p>
            <p>Description: {movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Vote: {movie.vote_count}</p>
            <div className="genre-badges">
                {movie.genres.map((genre: any) => (
                    <span key={genre.id} className="genre-badge">
            {genre.name}
          </span>
                ))}
            </div>
        </div>
    );
};

export default MovieDetailsPage
