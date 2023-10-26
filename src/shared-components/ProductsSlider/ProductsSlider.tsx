import { useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper';
import nextId from 'react-id-generator';
import ProductCard from '../ProductCard/ProductCard';
import renderServerData from '../../helpers/renderServerData';
import { Loading, ProductCardType } from '../../types/types';
import 'swiper/css/navigation';
import './ProductsSlider.scss';

type Props = {
    title: string;
    products: ProductCardType[];
    loading: Loading;
    error: null | unknown;
};

const ProductsSlider = (props: Props) => {
    const { products, loading, error, title } = props;
    const [isSliderRendered, setisSliderRendered] = useState<boolean>(false);
    const swiper = useSwiper();
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const items = () => {
        return products.map((product) => {
            return (
                <SwiperSlide key={nextId('card-of-newItems')}>
                    <div className="products-slider__card">
                        <ProductCard product={product} />
                    </div>
                </SwiperSlide>
            );
        });
    };

    return (
        <div className="products-slider">
            <div className="container">
                <div className="products-slider__top">
                    <h2 className="products-slider__title">{title}</h2>
                    <div className="products-slider__navigation">
                        <button
                            className="products-slider__prev-btn"
                            type="button"
                            aria-label="попередній слайд"
                            ref={prevRef}
                        >
                            <svg
                                className="products-slider__prev-icon"
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
                            className="products-slider__next-btn"
                            type="button"
                            aria-label="наступний слайд"
                            ref={nextRef}
                        >
                            <svg
                                className="products-slider__next-icon"
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
            </div>
            <div className="container container_pd-right-off">
                <div className="products-slider__cards">
                    <Swiper
                        className="products-slider__slider"
                        modules={[Navigation]}
                        spaceBetween={32}
                        slidesPerView={4}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onInit={() => setisSliderRendered(true)}
                        breakpoints={{
                            0: {
                                slidesPerView: 'auto',
                            },
                            340: {
                                slidesPerView: 1.12,
                                spaceBetween: 16,
                            },
                            400: {
                                slidesPerView: 1.2,
                                spaceBetween: 24,
                            },
                            424: {
                                slidesPerView: 1.3,
                                spaceBetween: 24,
                            },
                            546: {
                                slidesPerView: 1.7,
                                spaceBetween: 24,
                            },
                            700: {
                                slidesPerView: 2.2,
                                spaceBetween: 24,
                            },
                            810: {
                                slidesPerView: 2.5,
                                spaceBetween: 24,
                            },
                            1100: {
                                slidesPerView: 3.4,
                                spaceBetween: 32,
                            },
                            1294: {
                                slidesPerView: 4,
                                spaceBetween: 32,
                            },
                        }}
                    >
                        {renderServerData({
                            error,
                            loading,
                            content: items,
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ProductsSlider;
