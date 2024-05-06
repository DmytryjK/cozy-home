/* eslint-disable no-plusplus */
import './CustomerReview.scss';
import ratingSprite from '../../../../../../assets/icons/rating/sprite-rating.svg';

type Props = {
    content: string;
    name: string;
    dateAdded: string;
    rating: number;
};

const monthMappings: { [key: string]: string } = {
    '01': 'Січень',
    '02': 'Лютий',
    '03': 'Березень',
    '04': 'Квітень',
    '05': 'Травень',
    '06': 'Червень',
    '07': 'Липень',
    '08': 'Серпень',
    '09': 'Вересень',
    '10': 'Жовтень',
    '11': 'Листопад',
    '12': 'Грудень',
};

const formatDateString = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    const monthName = monthMappings[month];
    return `${day} ${monthName} ${year}`;
};

const CustomerReview = (props: Props) => {
    const { content, dateAdded, name, rating } = props;
    const formattedDate = formatDateString(dateAdded);

    const renderStarsRating = (rating: number) => {
        const maxRating = 5;
        const stars = [];

        for (let i = 1; i <= maxRating; i++) {
            const isActive = i <= rating;

            const star = (
                <svg
                    key={i}
                    className={`review-stars-list__icon ${
                        isActive ? 'active' : ''
                    }`}
                    width="14"
                    height="14"
                >
                    <use
                        href={`${ratingSprite}#${
                            isActive ? 'active' : 'inactive'
                        }`}
                    />
                </svg>
            );

            stars.push(star);
        }

        return <div className="review-stars-list">{stars}</div>;
    };

    return (
        <div className="customers-review__slider_cards">
            <div className="customers-review__slider_cards_card">
                <div className="customers-review__slider_cards_card_header">
                    <h2 className="customers-review__slider_cards_card_header_title">
                        {name}
                    </h2>
                    <p className="customers-review__slider_cards_card_header_date">
                        {formattedDate}
                    </p>
                    <div className="customers-review__slider_cards_card_header_rating">
                        {renderStarsRating(rating)}
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
