import { useEffect, useRef, useState } from 'react';
import { useFormik, FormikErrors } from 'formik';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import nextId from 'react-id-generator';
import Modal from '../../../../shared-components/Modal/Modal';
import ratingSprite from '../../../../assets/icons/rating/sprite-rating.svg';
import CustomerReview from './components/CustomerReview/CustomerReview';
import CommentTextarea from './components/CommentTextArea/CommentTextarea';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import formValidation from '../../../../utils/formValidation';
import {
    addReviewForProduct,
    resetAddReviewForProduct,
    fetchProductInfoByScuWithColor,
} from '../../../../store/reducers/productInformationSlice';
import {
    EmailInput,
    FirstNameInput,
} from '../../../../shared-components/FormComponents/Inputs';
import { ErrorMessageSmall } from '../../../../shared-components/UserMessages/UserMessages';
import 'swiper/css';
import 'swiper/css/navigation';
import './CustomersReviewSlider.scss';

type FormValues = {
    [key: string]: string;
    firstName: string;
    email: string;
};

const CustomersReviewSlider = () => {
    const [isSliderRendered, setisSliderRendered] = useState(false);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [ratingError, setRatingError] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [reviewSubmit, setReviewSubmit] = useState<boolean>(false);
    const [timeoutHover, setTimeoutHover] = useState<any>(null);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const { reviews, skuCode } = useAppSelector(
        (state) => state.productInformation.productInfo
    );

    const { loadingReview, errorReview, currentColor, loading } =
        useAppSelector((state) => state.productInformation);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (loadingReview === 'succeeded') {
            setRating(0);
            setReviewSubmit(true);
        }
    }, [loadingReview, errorReview]);

    useEffect(() => {
        if (rating !== 0) {
            setRatingError(false);
        }
    }, [rating]);

    useEffect(() => {
        if (loadingReview === 'succeeded') {
            dispatch(
                fetchProductInfoByScuWithColor({
                    productSkuCode: skuCode,
                    colorHex: currentColor?.id || '#000',
                })
            );
            dispatch(resetAddReviewForProduct());
        }
    }, [loadingReview]);

    const additionalValidation = () => {
        if (rating === 0) {
            setRatingError(true);
        } else {
            setRatingError(false);
        }
    };

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const handleStarHover = (currentIndexStar: number) => {
        setHoverIndex(currentIndexStar);
    };

    const formik7 = useFormik({
        initialValues: {
            firstName: '',
            email: '',
            comment: '',
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const validationFields = ['firstName', 'email'];

            validationFields.forEach((fieldName: string) => {
                const error = formValidation(fieldName, values[fieldName]);
                if (error) {
                    errors[fieldName] = error;
                }
            });

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            if (ratingError) return;
            dispatch(
                addReviewForProduct({
                    productRatingInfo: {
                        productSkuCode: skuCode,
                        userName: values.firstName,
                        rating,
                        ...values,
                    },
                    resetForm,
                })
            );
        },
    });

    const stars = () => {
        return (
            <div className="stars-rating">
                {[1, 2, 3, 4, 5].map((starIndex) => (
                    <button
                        className="stars-rating__button"
                        key={starIndex}
                        type="button"
                        aria-label="star"
                        onClick={() => handleStarClick(starIndex)}
                        onMouseEnter={() => {
                            if (timeoutHover) {
                                clearTimeout(timeoutHover);
                            }
                            handleStarHover(starIndex);
                        }}
                        onMouseLeave={() =>
                            setTimeoutHover(
                                setTimeout(() => setHoverIndex(null), 250)
                            )
                        }
                    >
                        <svg width="20" height="20">
                            <use
                                href={`${ratingSprite}#${
                                    starIndex <= rating ||
                                    (hoverIndex && hoverIndex >= starIndex)
                                        ? 'active'
                                        : 'inactive'
                                }`}
                            />
                        </svg>
                    </button>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="container">
                <div className="customers-review" id="customer-review">
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
                        spaceBetween={32}
                        slidesPerView={4}
                        speed={400}
                        modules={[Navigation]}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onInit={() => {
                            setisSliderRendered(true);
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            340: {
                                slidesPerView: 2,
                            },
                            400: {
                                slidesPerView: 2,
                            },
                            424: {
                                slidesPerView: 2,
                            },
                            546: {
                                slidesPerView: 2,
                            },
                            700: {
                                slidesPerView: 2,
                            },
                            900: {
                                slidesPerView: 3,
                            },
                            1440: {
                                slidesPerView: 4,
                            },
                        }}
                        className="mySwiper"
                    >
                        {reviews?.map((review) => (
                            <SwiperSlide key={nextId('customer-review')}>
                                <CustomerReview
                                    name={review.userName}
                                    dateAdded={review.data}
                                    content={review.review}
                                    rating={review.rating}
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
                isDataLoadedToServer={reviewSubmit}
                setisDataLoadedToServer={setReviewSubmit}
                isSubmitedText="Ваш відгук успішно додано!"
                maxwidth="916px"
            >
                <div>
                    <h1 className="customers-review__modal_title">
                        Написати відгук
                    </h1>
                    <div className="customers-review__modal_rating">
                        <h2 className="customers-review__modal_rating_title">
                            Ваша оцінка
                        </h2>
                        {stars()}
                        {ratingError && (
                            <p className="rating-error">
                                Необхідно обрати рейтинг
                            </p>
                        )}
                    </div>
                    <form
                        className="customers-review__modal_form modal-form"
                        onSubmit={formik7.handleSubmit}
                        noValidate
                    >
                        <div className="customers-review__modal_inputs">
                            <FirstNameInput
                                formik={formik7}
                                additionalClassName={`${
                                    formik7.errors.firstName &&
                                    formik7.touched.firstName
                                        ? 'inputErrorValidation'
                                        : ''
                                }`}
                            />
                            <EmailInput
                                formik={formik7}
                                additionalClassName={`${
                                    formik7.errors.email &&
                                    formik7.touched.email
                                        ? 'inputErrorValidation'
                                        : ''
                                }`}
                            />
                        </div>
                        <CommentTextarea formik={formik7} />
                        <button
                            className={`customers-review__modal_button ${
                                loadingReview === 'pending' ? 'loading' : ''
                            }`}
                            type="submit"
                            onClick={additionalValidation}
                        >
                            Додати відгук
                            <span className="customers-review__loading-dots">
                                <span className="customers-review__loading-dot" />
                                <span className="customers-review__loading-dot" />
                                <span className="customers-review__loading-dot" />
                            </span>
                        </button>
                        {errorReview ? (
                            <div className="customers-review__error">
                                <ErrorMessageSmall text="Виникла помилка, спробуйте ще раз." />
                            </div>
                        ) : (
                            ''
                        )}
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default CustomersReviewSlider;
