import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Movie } from "../interfaces/movie";

const MovieByGenrePage: React.FC = () => {
    const { genreId } = useParams<{ genreId: string }>();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            const apiKey = "db2a461dabd57d06c304fbadeb30c03a";
            const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&api_key=${apiKey}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }

                const data = await response.json();
                setMovies(data.results || []);
            } catch (error) {
                console.error("Error fetching movies by genre:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMoviesByGenre();
    }, [genreId]);

    const handleMovieClick = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating / 2);
        const emptyStars = 5 - fullStars;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star filled">★</span>);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={i + fullStars} className="star empty">★</span>);
        }

        return stars;
    };

    return (
        <div className="movie-genre">
            <h1 className="genre-title">Movies by Genre</h1>
            {loading ? (
                <p className="loading-text">Loading movies...</p>
            ) : movies.length > 0 ? (
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="movie-card"
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <div className="movie-poster">
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                ) : (
                                    <div className="placeholder-poster">No Image</div>
                                )}
                            </div>
                            <div className="movie-info">
                                <h3 className="movie-title">{movie.title}</h3>
                                <div className="movie-rating">{renderStars(movie.vote_average)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-movies-text">No movies found for this genre</p>
            )}
        </div>
    );
};

export default MovieByGenrePage;