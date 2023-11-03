import { useState, useEffect } from 'react';
import { ProductCardType } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
    openPopUpCart,
    openPopUpNotification,
} from '../../store/reducers/modalsSlice';
import { addProductToCartBody } from '../../store/reducers/cartSlice';
import AddToFavoriteBtn from '../AddToFavoriteBtn/AddToFavoriteBtn';
import headerSprites from '../../assets/icons/header/header-sprite.svg';
import SliderImages, { ImagesData } from './SliderImages/SliderImages';
import cartAdded from '../../assets/icons/cart/cart-added.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import './ProductCard.scss';

const ProductCard = ({ product }: { product: ProductCardType }) => {
    const [priceSpaced, setPriceSpaced] = useState<string>('');
    const [discountPriceSpaced, setDiscountPriceSpaced] = useState<string>('');
    const [imagesData, setImagesData] = useState<ImagesData>({});
    const [currentColor, setCurrentColor] = useState<{
        name: string;
        hex: string;
        quantityStatus: string;
    }>({ name: '', hex: '', quantityStatus: '' });
    const [isElementAddedToCart, setIsElementAddedToCart] =
        useState<boolean>(false);

    const cartBody = useAppSelector((state) => state.cart.cartBody);

    const { price, priceWithDiscount, discount, skuCode } = product;

    const dispatch = useAppDispatch();

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
        if (!currentColor.hex || !product || !cartBody) return;
        setIsElementAddedToCart(
            cartBody.some(
                (item) =>
                    item.productSkuCode === skuCode &&
                    item.colorHex === currentColor.hex
            )
        );
    }, [cartBody, product, currentColor]);

    useEffect(() => {
        addSpaceToPrice(price, priceWithDiscount);
    }, [price, priceWithDiscount]);

    const handleAddProductToCart = () => {
        if (isElementAddedToCart) return;
        dispatch(
            addProductToCartBody({
                productSkuCode: skuCode,
                colorHex: currentColor.hex,
            })
        );
        dispatch(openPopUpCart(true));
    };

    const renderProductStatus = () => {
        if (currentColor.quantityStatus === 'Немає в наявності') {
            return (
                <>
                    <div className="purchase-block__price-block">
                        <span className="purchase-block__out-status">
                            {currentColor.quantityStatus}
                        </span>
                        <span className="purchase-block__price">
                            <span className="purchase-block__current-currency purchase-block__current-currency_not-available">
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
                        aria-label="повідомити про наявність"
                        onClick={() => dispatch(openPopUpNotification(true))}
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
                    className={`purchase-block__cart-btn ${
                        isElementAddedToCart ? 'reset-border' : ''
                    }`}
                    type="button"
                    aria-label="додати в кошик"
                    onClick={handleAddProductToCart}
                >
                    {isElementAddedToCart ? (
                        <img
                            className="purchase-block__added-cart"
                            src={cartAdded}
                            alt="товар додано в корзину"
                        />
                    ) : (
                        <svg
                            className="purchase-block__cart-icon"
                            width="20"
                            height="20"
                        >
                            <use href={`${headerSprites}#card-icon`} />
                        </svg>
                    )}
                </button>
            </>
        );
    };

    return (
        <div
            className={`product-card ${
                currentColor.quantityStatus === 'Немає в наявності'
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
                setCurrentColor={setCurrentColor}
                currentColor={currentColor}
            />
            <div className="product-card__purchase-block purchase-block swiper-no-swiping">
                {renderProductStatus()}
            </div>
        </div>
    );
};

export default ProductCard;
