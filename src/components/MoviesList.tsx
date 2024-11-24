import React from "react";
import { Link } from "react-router-dom";
import { PosterPreview } from "./PosterPreview";
import { StarsRating } from "./StarsRating";
import {Props} from "../interfaces/movie";

export const MoviesListCard: React.FC<Props> = ({ movie }) => {
    return (
        <div className="movie-card">
            <Link to={`/movies/${movie.id}`} className="movie-link">
                <PosterPreview posterPath={movie.poster_path} />
            </Link>
            <div className="movie-details">
                <h3 className="movie-title">{movie.title}</h3>
                <StarsRating rating={movie.vote_average} />
            </div>
        </div>
    );
};

export default MoviesListCard;