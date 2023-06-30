import { useState, useEffect, useRef } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import nextId from 'react-id-generator';
import { TSwiper, Product } from '../../types/types';
import imageNotFound from '../../assets/images/error-images/image-not-found_small.png';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProductCard.scss';

const ProductCard = ({ product }: { product: Product }) => {
    const [currentColor, setCurrentColor] = useState<string>('');
    const [isColorChosen, setIsColorChosen] = useState(false);
    const uniqIdForInputName = nextId('color-');

    const {
        id,
        name,
        description,
        price,
        discountPrice,
        discount,
        category,
        colors,
    } = product;

    const cardSliderRef = useRef<TSwiper>();

    useEffect(() => {
        if (!isColorChosen && colors.length > 0) {
            setCurrentColor(colors[0].colorName);
        }
    }, [isColorChosen, colors]);

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
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M14.4643 0C12.6205 0 11.0063 0.786435 10 2.11576C8.99375 0.786435 7.37946 0 5.53571 0C4.06806 0.00164083 2.66099 0.580669 1.6232 1.61005C0.585411 2.63944 0.00165423 4.03511 0 5.49088C0 11.6903 9.26696 16.7082 9.66161 16.9154C9.76562 16.9709 9.88189 17 10 17C10.1181 17 10.2344 16.9709 10.3384 16.9154C10.733 16.7082 20 11.6903 20 5.49088C19.9983 4.03511 19.4146 2.63944 18.3768 1.61005C17.339 0.580669 15.9319 0.00164083 14.4643 0ZM10 15.4807C8.36964 14.5384 1.42857 10.2458 1.42857 5.49088C1.42999 4.41085 1.86316 3.37546 2.63309 2.61176C3.40302 1.84807 4.44687 1.41841 5.53571 1.417C7.27232 1.417 8.73036 2.33451 9.33929 3.80819C9.3931 3.93814 9.48465 4.04928 9.60229 4.1275C9.71994 4.20572 9.85837 4.24748 10 4.24748C10.1416 4.24748 10.2801 4.20572 10.3977 4.1275C10.5154 4.04928 10.6069 3.93814 10.6607 3.80819C11.2696 2.33185 12.7277 1.417 14.4643 1.417C15.5531 1.41841 16.597 1.84807 17.3669 2.61176C18.1368 3.37546 18.57 4.41085 18.5714 5.49088C18.5714 10.2387 11.6286 14.5375 10 15.4807Z"
                        fill="#262626"
                    />
                </svg>
            </button>
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
                        colors?.forEach((item, index) => {
                            if (swiper.activeIndex === index) {
                                setCurrentColor(item.colorName);
                            }
                        });
                        setIsColorChosen(true);
                    }}
                >
                    {colors?.map((item) => {
                        const { photoPath } = item;
                        return (
                            <SwiperSlide key={nextId('productCard-slide')}>
                                <div className="product-card__image-wrapper">
                                    <img
                                        className="product-card__image"
                                        src={
                                            photoPath === 'path1' ||
                                            photoPath === null
                                                ? imageNotFound
                                                : photoPath
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
                        {colors.map((item, index) => {
                            const { colorName } = item;
                            return (
                                <label
                                    className="product-card__checkbox-label"
                                    key={nextId('color-radio')}
                                >
                                    <input
                                        className={`product-card__color-checkbox ${colorName}`}
                                        type="radio"
                                        name={uniqIdForInputName}
                                        value={colorName}
                                        checked={
                                            currentColor === colorName ||
                                            (!isColorChosen && index === 0)
                                        }
                                        onChange={() =>
                                            handleSlideChange(colorName, index)
                                        }
                                    />
                                    <span
                                        className={`product-card__checked-checkbox ${colorName}`}
                                    />
                                </label>
                            );
                        })}
                    </fieldset>
                </div>
                <p className="product-card__description">
                    {`${description?.substring(0, 92)}...`}
                </p>
                <div className="product-card__purchase-block purchase-block">
                    <span className="purchase-block__price">
                        {price}
                        <span className="purchase-block__current-currency">
                            UAH
                        </span>
                    </span>
                    <button className="purchase-block__cart-btn" type="button">
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
    );
};

export default ProductCard;
