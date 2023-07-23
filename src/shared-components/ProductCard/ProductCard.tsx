import { useState, useEffect, useRef } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import nextId from 'react-id-generator';
import type swiper from 'swiper';
import { ProductCardType } from '../../types/types';
import headerSprites from '../../assets/icons/header/header-sprite.svg';
import imageNotFound from '../../assets/images/error-images/image-not-found_small.png';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProductCard.scss';

export type TSwiper = swiper & {
    slides: {
        swiperSlideSize: number;
    }[];
};

const ProductCard = ({ product }: { product: ProductCardType }) => {
    const [currentColor, setCurrentColor] = useState<string>('');
    const [isColorChosen, setIsColorChosen] = useState(false);
    const [priceSpaced, setPriceSpaced] = useState<string>('');
    const [discountPriceSpaced, setDiscountPriceSpaced] = useState<string>('');
    const uniqIdForInputName = nextId('color-');

    const {
        skuCode,
        name,
        shortDescription,
        price,
        priceWithDiscount,
        discount,
        imageDtoList,
        colorDtoList,
    } = product;

    const cardSliderRef = useRef<TSwiper>();

    useEffect(() => {
        if (!isColorChosen && imageDtoList.length > 0) {
            setCurrentColor(colorDtoList[0].name);
        }
    }, [isColorChosen, imageDtoList]);

    const addSpaceToPrice = (
        currentPrice: number,
        currentDiscountPrice: number | null
    ) => {
        if (currentPrice >= 1000) {
            const temporary = +currentPrice;
            const res = temporary.toLocaleString().replace(',', ' ');
            setPriceSpaced(res);
        }
        if (currentDiscountPrice && currentDiscountPrice >= 1000) {
            const temporary = +currentDiscountPrice;
            const res = temporary.toLocaleString().replace(',', ' ');
            setDiscountPriceSpaced(res);
        }
    };

    useEffect(() => {
        addSpaceToPrice(price, priceWithDiscount);
    }, [price, priceWithDiscount]);

    const handleSlideChange = (color: string, index: number, id: string) => {
        setCurrentColor(color);
        setIsColorChosen(true);
        if (cardSliderRef?.current) {
            cardSliderRef.current.slideTo(index);
        }
    };

    return (
        <div className="product-card">
            <button className="product-card__favorite-btn" type="button">
                <svg
                    className="product-card__favorite-icon"
                    width="21"
                    height="18"
                >
                    <use href={`${headerSprites}#favorite-icon`} />
                </svg>
            </button>
            {discount ? (
                <div className="product-card__sales-text">{discount}%</div>
            ) : null}
            <a className="product-card__slider-link" href="/">
                <Swiper
                    className="product-card__slider"
                    slidesPerView={1}
                    navigation
                    allowTouchMove={false}
                    onSwiper={(swiper) => {
                        cardSliderRef.current = swiper as TSwiper;
                    }}
                    onSlideChange={(swiper) => {
                        colorDtoList?.forEach((item, index) => {
                            if (swiper.activeIndex === index) {
                                setCurrentColor(item.name);
                            }
                        });
                        setIsColorChosen(true);
                    }}
                >
                    {/* {imageDtoList.length === 0 ? (
                        <SwiperSlide>
                            <div className="product-card__image-wrapper">
                                <img
                                    className="product-card__image"
                                    src={imageNotFound}
                                    alt={name}
                                />
                            </div>
                        </SwiperSlide>
                    ) : (
                        imageDtoList.map((item) => {
                            const { imagePath } = item;
                            return (
                                <SwiperSlide key={nextId('productCard-slide')}>
                                    <div className="product-card__image-wrapper">
                                        <img
                                            className="product-card__image"
                                            src={
                                                imagePath === null
                                                    ? imageNotFound
                                                    : imagePath
                                            }
                                            alt={name}
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })
                    )} */}
                    {imageDtoList.length === 0 ? (
                        <SwiperSlide>
                            <div className="product-card__image-wrapper">
                                <img
                                    className="product-card__image"
                                    src={imageNotFound}
                                    alt={name}
                                />
                            </div>
                        </SwiperSlide>
                    ) : (
                        colorDtoList.map(() => {
                            const { imagePath } = imageDtoList[0];
                            return (
                                <SwiperSlide key={nextId('productCard-slides')}>
                                    <div className="product-card__image-wrapper">
                                        <img
                                            className="product-card__image"
                                            src={imagePath}
                                            alt={name}
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })
                    )}
                </Swiper>
            </a>
            <div className="product-card__content swiper-no-swiping">
                <div className="product-card__content-top">
                    <h2 className="product-card__title">
                        <a className="product-card__title-link" href="/">
                            {name}
                        </a>
                    </h2>
                    <fieldset className="product-card__color-checkboxes">
                        {colorDtoList.map((color, index) => {
                            const { name, id } = color;
                            return (
                                <label
                                    className="product-card__checkbox-label"
                                    key={nextId('color-radio')}
                                >
                                    <input
                                        className={`product-card__color-checkbox ${name}`}
                                        type="radio"
                                        name={uniqIdForInputName}
                                        value={name}
                                        checked={
                                            currentColor === name ||
                                            (!isColorChosen && index === 0)
                                        }
                                        onChange={() =>
                                            handleSlideChange(name, index, id)
                                        }
                                    />
                                    <span
                                        className={`product-card__checked-checkbox ${name}`}
                                    />
                                </label>
                            );
                        })}
                    </fieldset>
                </div>
                <p className="product-card__description">{shortDescription}</p>
            </div>
            <div className="product-card__purchase-block purchase-block swiper-no-swiping">
                <div
                    className={
                        discount
                            ? 'purchase-block__price-block purchase-block__price-block_sale'
                            : 'purchase-block__price-block'
                    }
                >
                    {discount ? (
                        <span className="purchase-block__price purchase-block__price_sale">
                            <span className="purchase-block__current-currency purchase-block__current-currency_pd0">
                                {priceSpaced || price} UAH
                            </span>
                        </span>
                    ) : null}
                    <span className="purchase-block__price">
                        <span className="purchase-block__current-currency">
                            {discount
                                ? discountPriceSpaced || priceWithDiscount
                                : priceSpaced || price}
                            {' UAH'}
                        </span>
                    </span>
                </div>
                <button className="purchase-block__cart-btn" type="button">
                    <svg
                        className="purchase-block__cart-icon"
                        width="20"
                        height="20"
                    >
                        <use href={`${headerSprites}#card-icon`} />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
