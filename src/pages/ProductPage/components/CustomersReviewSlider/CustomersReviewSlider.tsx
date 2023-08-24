import { useRef, useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './CustomersReviewSlider.scss';
import Modal from '../../../../shared-components/Modal/Modal';
import ratingSprite from '../../../../assets/icons/rating/sprite-rating.svg';
import priductPageSprite from '../../../../assets/icons/product-page/product-pageSprite.svg';
import CustomerReview from './components/CustomerReview/CustomerReview';
import CommentTextarea from './components/CommentTextArea/CommentTextarea';

const CustomersReviewSlider = () => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [reviewSubmit, setReviewSubmit] = useState<boolean>(false);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const reviews = [
        {
            id: 1,
            name: 'Ірина',
            dateAdded: '18 Серпня 2023',
            content: `Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
ipsum smartboard supraktig. Disade hesk i degen.`,
        },
        {
            id: 2,
            name: 'Коля',
            dateAdded: '18 Серпня 2023',
            content: `Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
ipsum smartboard supraktig. Disade hesk i degen.`,
        },
        {
            id: 3,
            name: 'Вася',
            dateAdded: '18 Серпня 2023',
            content: `Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
ipsum smartboard supraktig. Disade hesk i degen.`,
        },
        {
            id: 4,
            name: 'Стас',
            dateAdded: '18 Серпня 2023',
            content: `Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
ipsum smartboard supraktig. Disade hesk i degen.Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
ipsum smartboard supraktig. Disade hesk i degen.Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
ipsum smartboard supraktig. Disade hesk i degen.`,
        },
        {
            id: 5,
            name: 'Анна',
            dateAdded: '18 Серпня 2023',
            content: `Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
ipsum smartboard supraktig. Disade hesk i degen.`,
        },
        {
            id: 6,
            name: 'София',
            dateAdded: '18 Серпня 2023',
            content: `Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
ipsum smartboard supraktig. Disade hesk i degen.`,
        },
    ];

    const renderStarsRating = () => {
        return (
            <div className="customers-review__modal_rating_stars">
                <svg className="stars-list__icon" width="20" height="20">
                    <use href={`${ratingSprite}#inactive`} />
                </svg>
                <svg className="stars-list__icon" width="20" height="20">
                    <use href={`${ratingSprite}#inactive`} />
                </svg>
                <svg className="stars-list__icon" width="20" height="20">
                    <use href={`${ratingSprite}#inactive`} />
                </svg>
                <svg className="stars-list__icon" width="20" height="20">
                    <use href={`${ratingSprite}#inactive`} />
                </svg>
                <svg className="stars-list__icon" width="20" height="20">
                    <use href={`${ratingSprite}#inactive`} />
                </svg>
            </div>
        );
    };

    return (
        <>
            <div className="container">
                <div className="customers-review">
                    <div className="customers-review__slider-top">
                        <h1 className="customers-review__slider-top_title">
                            Відгуки покупців
                        </h1>
                        <div className="customers-review__navigation">
                            <button
                                className="customers-review__prev-btn"
                                type="button"
                                aria-label="попередній слайд"
                                ref={prevRef}
                            >
                                <svg
                                    className="customers-review__prev-icon"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="02.Icons/Arrow">
                                        <path
                                            id="Line 2 (Stroke)"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.82475 16.8011L2.25628 12.4801C1.91457 12.215 1.91457 11.785 2.25628 11.5199L7.82475 7.19887C8.16646 6.93371 8.72048 6.93371 9.06218 7.19887C9.40389 7.46403 9.40389 7.89393 9.06218 8.15909L4.98744 11.321L23 11.321L23 12.679L4.98744 12.679L9.06218 15.8409C9.40389 16.1061 9.40389 16.536 9.06218 16.8011C8.72048 17.0663 8.16646 17.0663 7.82475 16.8011Z"
                                        />
                                    </g>
                                </svg>
                            </button>
                            <button
                                className="customers-review__next-btn"
                                type="button"
                                aria-label="наступний слайд"
                                ref={nextRef}
                            >
                                <svg
                                    className="customers-review__next-icon"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="02.Icons/Arrow">
                                        <path
                                            id="Line 2 (Stroke)"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M16.1753 7.19887L21.7437 11.5199C22.0854 11.785 22.0854 12.215 21.7437 12.4801L16.1753 16.8011C15.8335 17.0663 15.2795 17.0663 14.9378 16.8011C14.5961 16.536 14.5961 16.1061 14.9378 15.8409L19.0126 12.679L1 12.679L1 11.321L19.0126 11.321L14.9378 8.15909C14.5961 7.89394 14.5961 7.46403 14.9378 7.19887C15.2795 6.93371 15.8335 6.93371 16.1753 7.19887Z"
                                        />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={10}
                        modules={[Navigation]}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        className="mySwiper"
                    >
                        {reviews.map((review) => (
                            <SwiperSlide key={review.id}>
                                <CustomerReview
                                    name={review.name}
                                    dateAdded={review.dateAdded}
                                    content={review.content}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button
                        onClick={() => setModalActive(true)}
                        type="button"
                        className="customers-review__button"
                    >
                        Написати відгук
                    </button>
                </div>
            </div>
            <Modal
                active={modalActive}
                setActive={setModalActive}
                maxwidth="50%"
            >
                {reviewSubmit ? (
                    <div className="reveiew-added-wrapper">
                        <div className="review-added">
                            <svg width="20" height="20">
                                <use
                                    href={`${priductPageSprite}#review-added-icon`}
                                />
                            </svg>
                            <h2 className="review-added__title">
                                Ваш відгук успішно додано!
                            </h2>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className="customers-review__modal_title">
                            Написати відгук
                        </h1>
                        <div className="customers-review__modal_rating">
                            <h2 className="customers-review__modal_rating_title">
                                Ваша оцінка
                            </h2>
                            {renderStarsRating()}
                        </div>
                        <form
                            className="customers-review__modal_form modal-form"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="customers-review__modal_inputs">
                                <input
                                    type="text"
                                    className="customers-review__modal_inputs_input customers-review__modal_inputs_input_name"
                                    placeholder="Ваше ім’я*"
                                    required
                                />
                                <input
                                    type="text"
                                    className="customers-review__modal_inputs_input customers-review__modal_inputs_input_email"
                                    placeholder="Ел. пошта*"
                                    required
                                />
                            </div>
                            <CommentTextarea />
                            <button
                                onClick={() => setReviewSubmit(true)}
                                className="customers-review__modal_button"
                                type="submit"
                            >
                                Додати відгук
                            </button>
                        </form>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default CustomersReviewSlider;
