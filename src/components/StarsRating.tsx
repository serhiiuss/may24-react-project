import React from "react";
import { Props } from "../interfaces/stars";

export const StarsRating: React.FC<Props> = ({ rating }) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="stars-rating">
            {Array.from({ length: fullStars }, (_, i) => (
                <span key={`full-${i}`} className="star full">
          &#9733;
        </span>
            ))}
            {hasHalfStar && (
                <span className="star half">
          &#9733;
        </span>
            )}
            {Array.from({ length: emptyStars }, (_, i) => (
                <span key={`empty-${i}`} className="star empty">
          &#9734;
        </span>
            ))}
        </div>
    );
};
