import nextId from 'react-id-generator';
import { useAppSelector } from '../../../../hooks/hooks';
import ratingSprite from '../../../../assets/icons/rating/sprite-rating.svg';
import './ProductRating.scss';

const ProductRating = () => {
    const currentRating = useAppSelector(
        (state) => state.productInformation.productInfo.averageRating
    );

    const reminderOfDividing = currentRating % Math.floor(currentRating);
    const rating = () => {
        const result: JSX.Element[] = [];
        if (currentRating < 0) return result;
        for (let i = 0; i < currentRating - reminderOfDividing; i += 1) {
            if (i >= 5) return result;
            result.push(
                <li
                    className="stars-list__item"
                    key={nextId('product-rating-star')}
                >
                    <svg className="stars-list__icon" width="14" height="14">
                        <use href={`${ratingSprite}#active`} />
                    </svg>
                </li>
            );
        }
        if (currentRating >= 5) {
            return result;
        }
        if (!Number.isInteger(currentRating)) {
            result.push(
                <li
                    className="stars-list__item"
                    key={nextId('product-rating-star')}
                >
                    <svg className="stars-list__icon" width="7" height="14">
                        <use href={`${ratingSprite}#active_half`} />
                    </svg>
                    <svg className="stars-list__icon" width="7" height="14">
                        <use href={`${ratingSprite}#inactive_half`} />
                    </svg>
                </li>
            );
        }
        if (currentRating < 1) {
            for (let k = 0; k < Math.floor(5 - currentRating); k += 1) {
                result.push(
                    <li
                        className="stars-list__item"
                        key={nextId('product-rating-star')}
                    >
                        <svg
                            className="stars-list__icon"
                            width="14"
                            height="14"
                        >
                            <use href={`${ratingSprite}#inactive`} />
                        </svg>
                    </li>
                );
            }
        } else {
            for (let k = 0; k < Math.floor(5 - currentRating); k += 1) {
                result.push(
                    <li
                        className="stars-list__item"
                        key={nextId('product-rating-star')}
                    >
                        <svg
                            className="stars-list__icon"
                            width="14"
                            height="14"
                        >
                            <use href={`${ratingSprite}#inactive`} />
                        </svg>
                    </li>
                );
            }
        }

        return result.map((item) => item);
    };
    return (
        <div className="product-page__rating rating">
            <ul
                className="rating__stars-list stars-list"
                title={`рейтинг: ${currentRating}`}
            >
                {rating()}
                <li className="stars-list__bg" />
            </ul>
        </div>
    );
};

export default ProductRating;
