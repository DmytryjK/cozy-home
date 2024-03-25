import { useState, useEffect, memo, useRef } from 'react';
import { ProductCardType } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
    openPopUpCart,
    openPopUpNotification,
} from '../../store/reducers/modalsSlice';
import { addProductToCartBody } from '../../store/reducers/cartSlice';
import AddToFavoriteBtn from '../AddToFavoriteBtn/AddToFavoriteBtn';
import headerSprites from '../../assets/icons/header/header-sprite.svg';
import SliderImages from './SliderImages/SliderImages';
import cartAdded from '../../assets/icons/cart/cart-added.svg';
import addSpaceToPrice from '../../utils/addSpaceToPrice';
import type { ColorDtoList, ImageDtoList } from '../../types/types';
import sortColorsByAvailability from '../../utils/sortColors';
import './ProductCard.scss';

const sortColorByFirstImg = (
    colorDtoList: ColorDtoList[],
    imageDtoList: ImageDtoList[]
) => {
    return sortColorsByAvailability(colorDtoList).sort((a, b) => {
        if (a.name === imageDtoList[0].color) {
            return -1;
        }
        if (b.name === imageDtoList[0].color) {
            return 1;
        }
        return 0;
    });
};

const ProductCard = ({ product }: { product: ProductCardType }) => {
    const { colorDtoList, imageDtoList } = product;
    const [sortedColorDto, setSortedColorDto] = useState<ColorDtoList[] | null>(
        null
    );
    const [isElementAddedToCart, setIsElementAddedToCart] =
        useState<boolean>(false);
    const cartBody = useAppSelector((state) => state.cart.cartBody);
    const { price, priceWithDiscount, discount, skuCode, favorite } = product;
    const [currentColor, setCurrentColor] = useState<{
        name: string;
        hex: string;
        quantityStatus: string;
    }>({ name: '', hex: '', quantityStatus: '' });
    const jwtToken = useAppSelector((state) => state.auth.jwtToken);
    const favoriteBtnProductCardRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (colorDtoList.length > 0) {
            setSortedColorDto(sortColorByFirstImg(colorDtoList, imageDtoList));
        }
    }, [colorDtoList[0].id, imageDtoList[0].id]);

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

    return (
        <div
            className={`product-card ${
                currentColor.quantityStatus === 'Немає в наявності'
                    ? 'out-of-stock'
                    : ''
            } `}
        >
            <div
                className="product-card__favorite"
                ref={favoriteBtnProductCardRef}
            >
                {favorite !== null && jwtToken && (
                    <AddToFavoriteBtn
                        productSkuCode={skuCode}
                        isFavorite={favorite}
                        reference={favoriteBtnProductCardRef}
                    />
                )}
            </div>
            {discount && (
                <div className="product-card__sales-text">{discount}%</div>
            )}
            {sortedColorDto && (
                <SliderImages
                    productData={product}
                    setCurrentColor={setCurrentColor}
                    currentColor={currentColor}
                    sortedColorDto={sortedColorDto}
                />
            )}
            {!sortedColorDto && (
                <>
                    <div className="product-card__slider-link">
                        <div className="product-card__slider">
                            <div className="product-card__image-overflow">
                                <div
                                    className={`product-card__image-wrapper `}
                                    key={`slider-image-preload-${skuCode}`}
                                >
                                    <div
                                        style={{
                                            height: '350px',
                                            maxHeight: '350px',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-card__content swiper-no-swiping">
                        <div className="product-card__content-top">
                            <h2 className="product-card__title">
                                <div className="product-card__title-link">
                                    {product.name}
                                </div>
                            </h2>
                            <fieldset className="product-card__color-checkboxes">
                                {colorDtoList.map((color, index) => {
                                    const { name, id, quantityStatus } = color;
                                    return (
                                        <label
                                            className="product-card__checkbox-label"
                                            key={`color-label-${skuCode}-${id}`}
                                        >
                                            <input
                                                className="product-card__color-checkbox"
                                                type="radio"
                                                name={`${name}-${skuCode}`}
                                                aria-label={name}
                                                value={id}
                                                checked={index === 0}
                                                onChange={() => index}
                                            />
                                            <span
                                                className={`product-card__checked-checkbox ${
                                                    quantityStatus ===
                                                    'Немає в наявності'
                                                        ? 'product-card__checked-checkbox_not-available'
                                                        : ''
                                                }`}
                                                style={{
                                                    backgroundColor: `${id}`,
                                                }}
                                            />
                                        </label>
                                    );
                                })}
                            </fieldset>
                        </div>
                        <p className="product-card__description">
                            {product.shortDescription}
                        </p>
                    </div>
                </>
            )}
            <div className="product-card__purchase-block purchase-block swiper-no-swiping">
                {currentColor.quantityStatus === 'Немає в наявності' ? (
                    <>
                        <div className="purchase-block__price-block">
                            <span className="purchase-block__out-status">
                                {currentColor.quantityStatus}
                            </span>
                            <span className="purchase-block__price">
                                <span className="purchase-block__current-currency purchase-block__current-currency_not-available">
                                    {priceWithDiscount
                                        ? addSpaceToPrice(priceWithDiscount)
                                        : addSpaceToPrice(price)}
                                    {' UAH'}
                                </span>
                            </span>
                        </div>
                        <button
                            className="purchase-block__cart-btn"
                            type="button"
                            aria-label="повідомити про наявність"
                            onClick={() =>
                                dispatch(openPopUpNotification(true))
                            }
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
                ) : (
                    <>
                        <div
                            className={
                                discount
                                    ? 'purchase-block__price-block purchase-block__price-block_sale'
                                    : 'purchase-block__price-block'
                            }
                        >
                            {priceWithDiscount && (
                                <span className="purchase-block__price purchase-block__price_sale">
                                    <span className="purchase-block__current-currency purchase-block__current-currency_pd0">
                                        {priceWithDiscount
                                            ? addSpaceToPrice(price)
                                            : addSpaceToPrice(
                                                  priceWithDiscount
                                              )}
                                        UAH
                                    </span>
                                </span>
                            )}
                            <span className="purchase-block__price">
                                <span className="purchase-block__current-currency">
                                    {priceWithDiscount
                                        ? addSpaceToPrice(priceWithDiscount)
                                        : addSpaceToPrice(price)}
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
                            disabled={isElementAddedToCart}
                            onClick={() => {
                                dispatch(
                                    addProductToCartBody({
                                        productSkuCode: skuCode,
                                        colorHex: currentColor.hex,
                                    })
                                );
                                dispatch(openPopUpCart(true));
                            }}
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
                )}
            </div>
        </div>
    );
};

export default memo(ProductCard);
