import { useState, useEffect } from 'react';
import { ProductCardType } from '../../types/types';
import SliderImages, {
    ImageType,
    ImagesData,
} from './SliderImages/SliderImages';
import headerSprites from '../../assets/icons/header/header-sprite.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProductCard.scss';

const ProductCard = ({ product }: { product: ProductCardType }) => {
    const [priceSpaced, setPriceSpaced] = useState<string>('');
    const [discountPriceSpaced, setDiscountPriceSpaced] = useState<string>('');
    const [imagesData, setImagesData] = useState<ImagesData>({});

    const { price, priceWithDiscount, discount } = product;

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
            <SliderImages
                productData={product}
                setImagesData={setImagesData}
                imagesData={imagesData}
            />
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
