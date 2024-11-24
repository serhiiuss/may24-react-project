import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const MoviesPage = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();

    const fetchMovies = useCallback(async (page: number, query: string = '') => {
        setLoading(true);
        const apiKey = 'db2a461dabd57d06c304fbadeb30c03a';
        let fetchUrl = '';

        if (query) {
            fetchUrl = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${page}&query=${encodeURIComponent(query)}&api_key=${apiKey}`;
        } else {
            fetchUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&sort_by=popularity.desc&page=${page}&api_key=${apiKey}`;
        }

        console.log('Fetching URL:', fetchUrl);

        try {
            const response = await fetch(fetchUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }

            const data = await response.json();
            console.log('Fetched Data:', data);

            if (data && Array.isArray(data.results)) {
                setMovies(data.results);
            } else {
                console.error('Invalid data format:', data);
                setMovies([]);
            }

            if (data && typeof data.total_pages === 'number') {
                setTotalPages(data.total_pages);
            } else {
                console.error('Invalid total_pages format:', data);
                setTotalPages(0);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            setMovies([]);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovies(currentPage, searchQuery);
    }, [searchQuery, currentPage, fetchMovies]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
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

    const handleMovieClick = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };

    return (
        <div className="movies-page">
            <div className="search">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="movies-list">
                        {movies.length === 0 ? (
                            <p>No movies found</p>
                        ) : (
                            movies.map((movie) => (
                                <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
                                    {movie.poster_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="movie-poster"
                                        />
                                    )}
                                    <h3>{movie.title}</h3>
                                    <div className="movie-rating">{renderStars(movie.vote_average)}</div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="pagination">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MoviesPage;
