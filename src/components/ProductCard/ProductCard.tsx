import { useState, useEffect, useRef } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import nextId from 'react-id-generator';
import { TSwiper } from '../../types/types';
import productPhoto1 from '../../assets/images/productcard/photo1.png';
import productPhoto2 from '../../assets/images/productcard/photo2.png';
import productPhoto3 from '../../assets/images/productcard/photo3.png';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProductCard.scss';

const ProductCard = () => {
    const [currentColor, setCurrentColor] = useState<string>('');
    const [isColorChosen, setIsColorChosen] = useState(false);
    interface CardObject {
        title: string;
        description: string;
        price: string;
        mediaInfo: MediaInfo[];
    }

    interface MediaInfo {
        color: string;
        image: string;
    }

    const cardData: CardObject = {
        title: 'Крісло COIN',
        description:
            'Lörem ipsum smartboard supraktig. Disade hesk i degen. Padda ådev väkaktig sobyr. Pesm saren. Lörem ipsum smartboard supraktig. Disade hesk i degen. Padda ådev väkaktig sobyr. Pesm saren.Lörem ipsum smartboard supraktig. Disade hesk i degen. Padda ådev väkaktig sobyr. Pesm saren. Lörem ipsum smartboard supraktig. Disade hesk i degen. Padda ådev väkaktig sobyr. Pesm saren.',
        price: '2000',
        mediaInfo: [
            {
                color: 'black',
                image: productPhoto1,
            },
            {
                color: 'orange',
                image: productPhoto2,
            },
            {
                color: 'grey',
                image: productPhoto3,
            },
        ],
    };
    const cardSliderRef = useRef<TSwiper>();

    useEffect(() => {
        if (!isColorChosen && cardData.mediaInfo.length > 0) {
            setCurrentColor(cardData.mediaInfo[0].color);
        }
    }, [isColorChosen, cardData.mediaInfo]);

    const handleSlideChange = (color: string, index: number) => {
        setCurrentColor(color);
        setIsColorChosen(true);
        if (cardSliderRef?.current) {
            cardSliderRef.current.slideTo(index);
        }
    };

    return (
        <div>
            <div className="product-card">
                <button className="product-card__favorite-btn" type="button">
                    F
                </button>
                <a className="product-card__slider" href="/">
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        onSwiper={(swiper) => {
                            cardSliderRef.current = swiper as TSwiper;
                        }}
                        onSlideChange={(swiper) => {
                            cardData?.mediaInfo?.forEach((item, index) => {
                                if (swiper.activeIndex === index) {
                                    setCurrentColor(item.color);
                                }
                            });
                            setIsColorChosen(true);
                        }}
                    >
                        {cardData?.mediaInfo?.map((item) => {
                            const { image } = item;
                            return (
                                <SwiperSlide key={nextId('productCard-slide')}>
                                    <div className="product-card__image-wrapper">
                                        <img
                                            className="product-card__image"
                                            src={image}
                                            alt="крісло coin"
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </a>
                <div className="product-card__content">
                    <div className="product-card__content-top">
                        <h2 className="product-card__title">
                            <a className="product-card__title-link" href="/">
                                Крісло COIN
                            </a>
                        </h2>
                        <fieldset className="product-card__color-checkboxes">
                            {cardData?.mediaInfo?.map((item, index) => {
                                const { color } = item;
                                return (
                                    <label
                                        className="product-card__checkbox-label"
                                        key={nextId('color-radio')}
                                    >
                                        <input
                                            className={`product-card__color-checkbox ${color}`}
                                            type="radio"
                                            name="color"
                                            value={color}
                                            checked={
                                                currentColor === color ||
                                                (!isColorChosen && index === 0)
                                            }
                                            onChange={() =>
                                                handleSlideChange(color, index)
                                            }
                                        />
                                        <span
                                            className={`product-card__checked-checkbox ${color}`}
                                        />
                                    </label>
                                );
                            })}
                        </fieldset>
                    </div>
                    <p className="product-card__description">
                        {`${cardData?.description.substring(0, 92)}...`}
                    </p>
                    <div className="product-card__purchase-block purchase-block">
                        <span className="purchase-block__price">
                            2000
                            <span className="purchase-block__current-currency">
                                UAH
                            </span>
                        </span>
                        <button
                            className="purchase-block__cart-btn"
                            type="button"
                        >
                            <svg
                                className="purchase-block__cart-icon"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.757895 2.00003C0.341053 2.00003 0 2.36453 0 2.81003C0 3.25553 0.341053 3.62003 0.757895 3.62003H2.43966L4.42914 12.125C4.59739 12.8459 5.20219 13.34 5.89718 13.34H14.5895C15.2731 13.34 15.8536 12.8556 16.034 12.1501L18 4.43003H5.30526L5.68421 6.05002H16.034L14.5895 11.72H5.89718L3.90771 3.21503C3.82574 2.86617 3.63658 2.55681 3.37054 2.33651C3.1045 2.11622 2.77697 1.99773 2.44042 2.00003H0.757895ZM13.6421 13.34C12.3954 13.34 11.3684 14.4376 11.3684 15.77C11.3684 17.1025 12.3954 18.2 13.6421 18.2C14.8888 18.2 15.9158 17.1025 15.9158 15.77C15.9158 14.4376 14.8888 13.34 13.6421 13.34ZM6.82105 13.34C5.57432 13.34 4.54737 14.4376 4.54737 15.77C4.54737 17.1025 5.57432 18.2 6.82105 18.2C8.06779 18.2 9.09474 17.1025 9.09474 15.77C9.09474 14.4376 8.06779 13.34 6.82105 13.34ZM6.82105 14.96C7.24775 14.96 7.57895 15.3148 7.57895 15.77C7.57895 16.226 7.24699 16.58 6.82105 16.58C6.39436 16.58 6.06316 16.2252 6.06316 15.77C6.06316 15.314 6.39512 14.96 6.82105 14.96ZM13.6421 14.96C14.0688 14.96 14.4 15.3148 14.4 15.77C14.4 16.226 14.068 16.58 13.6421 16.58C13.2154 16.58 12.8842 16.2252 12.8842 15.77C12.8842 15.314 13.2162 14.96 13.6421 14.96Z"
                                    fill="#262626"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
