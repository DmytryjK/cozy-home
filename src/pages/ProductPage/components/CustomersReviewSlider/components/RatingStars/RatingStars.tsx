import React, { useState } from 'react';
import ratingSprite from '../../../../../../assets/icons/rating/sprite-rating.svg';
import './RatingStars.scss';

const StarsRating = () => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const handleStarMouseEnter = (hovered: number) => {
        setHoveredRating(hovered);
    };

    const handleStarMouseLeave = () => {
        setHoveredRating(0);
    };

    return (
        <div className="stars-rating">
            {[1, 2, 3, 4, 5].map((starIndex) => (
                <svg
                    key={starIndex}
                    className={`stars-rating__icon ${
                        starIndex <= (hoveredRating || rating)
                            ? 'active'
                            : 'inactive'
                    }`}
                    width="20"
                    height="20"
                    onClick={() => handleStarClick(starIndex)}
                    onMouseEnter={() => handleStarMouseEnter(starIndex)}
                    onMouseLeave={handleStarMouseLeave}
                >
                    <use
                        href={`${ratingSprite}#${
                            starIndex <= (hoveredRating || rating)
                                ? 'active'
                                : 'inactive'
                        }`}
                    />
                </svg>
            ))}
        </div>
    );
};

export default StarsRating;
