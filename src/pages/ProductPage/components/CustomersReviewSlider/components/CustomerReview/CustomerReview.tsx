import './CustomerReview.scss';
import ratingSprite from '../../../../../../assets/icons/rating/sprite-rating.svg';

type Props = {
    content: string;
    name: string;
    dateAdded: string;
};

const CustomerReview = (props: Props) => {
    const { content, dateAdded, name } = props;
    const renderStarsRating = () => {
        return (
            <div className="review-stars-list">
                <svg className="review-stars-list__icon" width="14" height="14">
                    <use href={`${ratingSprite}#active`} />
                </svg>
                <svg className="review-stars-list__icon" width="14" height="14">
                    <use href={`${ratingSprite}#active`} />
                </svg>
                <svg className="review-stars-list__icon" width="14" height="14">
                    <use href={`${ratingSprite}#active`} />
                </svg>
                <svg className="review-stars-list__icon" width="14" height="14">
                    <use href={`${ratingSprite}#active`} />
                </svg>
                <svg className="review-stars-list__icon" width="14" height="14">
                    <use href={`${ratingSprite}#active`} />
                </svg>
            </div>
        );
    };
    return (
        <div className="customers-review__slider_cards">
            <div className="customers-review__slider_cards_card">
                <div className="customers-review__slider_cards_card_header">
                    <h2 className="customers-review__slider_cards_card_header_title">
                        {name}
                    </h2>
                    <p className="customers-review__slider_cards_card_header_date">
                        {dateAdded}
                    </p>
                    <div className="customers-review__slider_cards_card_header_rating">
                        {renderStarsRating()}
                    </div>
                </div>
                <div className="customers-review__slider_cards_card_review">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default CustomerReview;
