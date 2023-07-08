import { useState, useEffect, useRef } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import nextId from 'react-id-generator';
import { TSwiper, ProductCardType } from '../../types/types';
import headerSprites from '../../assets/icons/header/header-sprite.svg';
import imageNotFound from '../../assets/images/error-images/image-not-found_small.png';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProductCard.scss';

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
    } = product;

    const cardSliderRef = useRef<TSwiper>();

    useEffect(() => {
        if (!isColorChosen && imageDtoList.length > 0) {
            setCurrentColor(imageDtoList[0].color);
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

    const handleSlideChange = (color: string, index: number) => {
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
                        imageDtoList?.forEach((item, index) => {
                            if (swiper.activeIndex === index) {
                                setCurrentColor(item.color);
                            }
                        });
                        setIsColorChosen(true);
                    }}
                >
                    {imageDtoList?.map((item) => {
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
                    })}
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
                        {imageDtoList.map((item, index) => {
                            const { color } = item;
                            return (
                                <label
                                    className="product-card__checkbox-label"
                                    key={nextId('color-radio')}
                                >
                                    <input
                                        className={`product-card__color-checkbox ${color}`}
                                        type="radio"
                                        name={uniqIdForInputName}
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
                <p className="product-card__description">{shortDescription}</p>
                <div className="product-card__purchase-block purchase-block">
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
        </div>
    );
};

export default ProductCard;
