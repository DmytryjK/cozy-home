import React, { useState } from 'react';
import ratingSprite from '../../../../../../assets/icons/rating/sprite-rating.svg';
import './RatingStars.scss';

const StarsRating = () => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating);
    };

    return (
        <div className="stars-rating">
            {[1, 2, 3, 4, 5].map((starIndex) => (
                <svg
                    key={starIndex}
                    width="20"
                    height="20"
                    onClick={() => handleStarClick(starIndex)}
                >
                    <use
                        href={`${ratingSprite}#${
                            starIndex <= rating ? 'active' : 'inactive'
                        }`}
                    />
                </svg>
            ))}
        </div>
    );
};

export default StarsRating;
