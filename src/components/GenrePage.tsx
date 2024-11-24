import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Genre } from "../interfaces/movie";

const GenrePage: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenres = async () => {
            const apiKey = "db2a461dabd57d06c304fbadeb30c03a";
            const url = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${apiKey}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch genres");
                }

                const data = await response.json();
                setGenres(data.genres || []);
            } catch (error) {
                console.error("Error fetching genres:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    const handleGenreClick = (genreId: number) => {
        navigate(`/movies/genre/${genreId}`);
    };

    return (
        <div className="genre-page">
            <h1 className="genre-title">Browse Genres</h1>
            {loading ? (
                <p className="loading-text">Loading genres...</p>
            ) : genres.length > 0 ? (
                <div className="genres-grid">
                    {genres.map((genre) => (
                        <div
                            key={genre.id}
                            className={`genre-card genre-${genre.name.toLowerCase()}`}
                            onClick={() => handleGenreClick(genre.id)}
                        >
                            <h3 className="genre-name">{genre.name}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No genres</p>
            )}
        </div>
    );
};

export default GenrePage;
