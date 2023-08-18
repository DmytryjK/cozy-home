import { useRef } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CustomerReview from './CustomerReview/CustomerReview';
import 'swiper/css';
import 'swiper/css/navigation';
import './CustomersReviewSlider.scss';

const CustomersReviewSlider = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
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
                    <SwiperSlide>
                        <CustomerReview
                            name="Ірина"
                            dateAdded="18 Серпня 2023"
                            content="Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
	ipsum smartboard supraktig. Disade hesk i degen."
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CustomerReview
                            name="Микола"
                            dateAdded="18 Серпня 2023"
                            content="Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
	ipsum smartboard supraktig. Disade hesk i degen."
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CustomerReview
                            name="Анна"
                            dateAdded="10 Липня 2023"
                            content="Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
	ipsum smartboard supraktig. Disade hesk i degen."
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CustomerReview
                            name="Юрій"
                            dateAdded="10 Липня 2023"
                            content="Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
	ipsum smartboard supraktig. Disade hesk i degen.Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
	ipsum smartboard supraktig. Disade hesk i degen.Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
	ipsum smartboard supraktig. Disade hesk i degen."
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CustomerReview
                            name="John"
                            dateAdded="1 Липня 2023"
                            content="Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
	ipsum smartboard supraktig. Disade hesk i degen."
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CustomerReview
                            name="Collins"
                            dateAdded="24 Липня 2023"
                            content="Lörem ipsum smartboard supraktig. Disade hesk i degen. Lörem
	ipsum smartboard supraktig. Disade hesk i degen."
                        />
                    </SwiperSlide>
                </Swiper>
                <button type="button" className="customers-review__button">
                    Написати відгук
                </button>
            </div>
        </div>
    );
};

export default CustomersReviewSlider;
