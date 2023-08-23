import { useState, useEffect } from 'react';
import { ProductCardType } from '../../types/types';
import AddToFavoriteBtn from '../AddToFavoriteBtn/AddToFavoriteBtn';
import headerSprites from '../../assets/icons/header/header-sprite.svg';
import SliderImages, { ImagesData } from './SliderImages/SliderImages';
import Modal from '../Modal/Modal';
import PopUpInStockNotification from '../PopUpInStockNotification/PopUpInStockNotification';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProductCard.scss';

const ProductCard = ({ product }: { product: ProductCardType }) => {
    const [priceSpaced, setPriceSpaced] = useState<string>('');
    const [discountPriceSpaced, setDiscountPriceSpaced] = useState<string>('');
    const [imagesData, setImagesData] = useState<ImagesData>({});
    const [isWindowInStockReminderOpen, setIsWindowInStockReminderOpen] =
        useState<boolean>(false);

    const { price, priceWithDiscount, discount, productQuantityStatus } =
        product;
    // const isInStock = false;

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

    const renderProductStatus = () => {
        if (
            productQuantityStatus === 'Немає на складі' ||
            productQuantityStatus === 'Немає в наявності'
        ) {
            return (
                <>
                    <div className="purchase-block__price-block">
                        <span className="purchase-block__out-status">
                            {productQuantityStatus}
                        </span>
                    </div>
                    <button
                        className="purchase-block__cart-btn"
                        type="button"
                        aria-label="повідомити про наявність"
                        onClick={() => setIsWindowInStockReminderOpen(true)}
                    >
                        <svg
                            className="purchase-block__bell-icon"
                            width="18"
                            height="18"
                        >
                            <use href={`${headerSprites}#iconoir_bell`} />
                        </svg>
                    </button>
                </>
            );
        }
        return (
            <>
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
                <button
                    className="purchase-block__cart-btn"
                    type="button"
                    aria-label="додати в кошик"
                >
                    <svg
                        className="purchase-block__cart-icon"
                        width="20"
                        height="20"
                    >
                        <use href={`${headerSprites}#card-icon`} />
                    </svg>
                </button>
            </>
        );
    };

    return (
        <div
            className={`product-card ${
                productQuantityStatus === 'Немає на складі' ||
                productQuantityStatus === 'Немає в наявності'
                    ? 'out-of-stock'
                    : ''
            } `}
        >
            <div className="product-card__favorite">
                <AddToFavoriteBtn />
            </div>
            {discount ? (
                <div className="product-card__sales-text">{discount}%</div>
            ) : null}
            <SliderImages
                productData={product}
                setImagesData={setImagesData}
                imagesData={imagesData}
            />
            <div className="product-card__purchase-block purchase-block swiper-no-swiping">
                {renderProductStatus()}
            </div>
            <Modal
                active={isWindowInStockReminderOpen}
                setActive={setIsWindowInStockReminderOpen}
                maxwidth="884px"
            >
                <PopUpInStockNotification />
            </Modal>
        </div>
    );
};

export default ProductCard;
