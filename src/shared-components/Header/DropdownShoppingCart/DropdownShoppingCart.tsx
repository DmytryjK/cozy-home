import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooks';
import CartTrashBtn from '../../CartTrashBtn/CartTrashBtn';
import renderServerData from '../../../helpers/renderServerData';
import SummaryCart from '../../../pages/ShoppingCartPage/components/SummaryCart/SummaryCart';
import addSpaceToPrice from '../../../utils/addSpaceToPrice';
import usePrefetchProduct from '../../../hooks/usePrefetchProduct';
import { Loader, PrefetchProductPageLoader } from '../../Loaders';
import { ErrorMessageSmall } from '../../UserMessages/UserMessages';
import './DropdownShoppingCart.scss';

const DropdownShoppingCart = ({ isActive }: { isActive: boolean }) => {
    const { cartData, loading, error, cartBody } = useAppSelector(
        (state) => state.cart
    );

    const productsInfoToCheckout = useAppSelector(
        (state) => state.cart.productsInfoToCheckout
    );

    const {
        handleProductClick,
        loadingPrefetch,
        errorPrefetch,
        isLinkClicked,
    } = usePrefetchProduct();

    const renderCartItems = () => {
        return (
            <div
                className="cart-dropdown__list-wrapper"
                data-lenis-prevent
                data-lenis-prevent-wheel
                data-lenis-prevent-touch
            >
                <ul className="cart-dropdown__list">
                    {cartData.map((product) => {
                        const {
                            skuCode,
                            name,
                            colorName,
                            colorHex,
                            imagePath,
                            price,
                            priceWithDiscount,
                            availableProductQuantity,
                        } = product;
                        const currentProductIndex =
                            productsInfoToCheckout.findIndex(
                                (item) =>
                                    item.skuCode === skuCode &&
                                    item.colorHex === colorHex
                            );
                        const totalPrice =
                            currentProductIndex > -1
                                ? productsInfoToCheckout[currentProductIndex]
                                      .price
                                : null;
                        const totalQuantity =
                            currentProductIndex > -1
                                ? productsInfoToCheckout[currentProductIndex]
                                      .quantityToCheckout
                                : null;
                        return (
                            <li
                                className={`cart-dropdown__item product-item ${
                                    availableProductQuantity === 0
                                        ? 'out-of-stock'
                                        : ''
                                }`}
                                key={`dropdown-cart${skuCode}-${colorHex}`}
                            >
                                {errorPrefetch &&
                                isLinkClicked.sku === skuCode ? (
                                    <ErrorMessageSmall text="Помилка завантаження" />
                                ) : (
                                    ''
                                )}
                                <CartTrashBtn
                                    skuCode={skuCode}
                                    colorHex={colorHex}
                                />
                                <div className="product-item__info">
                                    <NavLink
                                        className="produt-item__link"
                                        to={`/prefetch/${skuCode}/${colorHex.replace(
                                            '#',
                                            ''
                                        )}`}
                                        onClick={(e) => {
                                            handleProductClick(
                                                e,
                                                skuCode,
                                                colorHex
                                            );
                                        }}
                                    >
                                        <img
                                            className="product-item__photo"
                                            src={imagePath}
                                            alt={name}
                                        />
                                    </NavLink>
                                    <div
                                        className={`product-item__text ${
                                            availableProductQuantity === 0
                                                ? 'not-available'
                                                : ''
                                        }`}
                                    >
                                        <NavLink
                                            className="product-item__title-link"
                                            to={`/prefetch/${skuCode}/${colorHex.replace(
                                                '#',
                                                ''
                                            )}`}
                                            onClick={(e) => {
                                                handleProductClick(
                                                    e,
                                                    skuCode,
                                                    colorHex
                                                );
                                            }}
                                        >
                                            {name}
                                        </NavLink>
                                        <span className="product-item__color">
                                            <span>Колір: </span>
                                            {colorName}
                                        </span>
                                        <span className="cart-product__status cart-dropdown__status">
                                            {availableProductQuantity === 0
                                                ? 'Немає в наявності'
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="product-item__price">
                                    <div className="product-item__current-price">
                                        {priceWithDiscount ? (
                                            <span className="product-item__current-price_discount">
                                                {addSpaceToPrice(
                                                    priceWithDiscount
                                                )}{' '}
                                                UAH
                                            </span>
                                        ) : (
                                            <span className="product-item__current-price_price">
                                                {addSpaceToPrice(price)} UAH
                                            </span>
                                        )}{' '}
                                        <span className="product-item__price-divider">
                                            x{' '}
                                            {totalQuantity === null
                                                ? 1
                                                : totalQuantity}
                                        </span>
                                    </div>
                                    {priceWithDiscount ? (
                                        <span
                                            className={`product-item__current-price_price
                                        ${
                                            priceWithDiscount
                                                ? 'discount-price'
                                                : ''
                                        }`}
                                        >
                                            {addSpaceToPrice(price)} UAH
                                        </span>
                                    ) : null}
                                </div>
                                <span className="product-item__total-cost">
                                    {addSpaceToPrice(
                                        totalPrice || priceWithDiscount || price
                                    )}{' '}
                                    UAH
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    return (
        <>
            {loadingPrefetch === 'pending' && isLinkClicked.isClicked ? (
                <PrefetchProductPageLoader isLine />
            ) : (
                ''
            )}
            <div
                className={`cart-dropdown ${isActive ? 'dropdown-active' : ''}`}
                style={{
                    maxWidth: cartData.length === 0 ? '380px' : '590px',
                }}
            >
                {cartBody.length === 0 && loading !== 'pending' ? (
                    <div className="cart-dropdown__empty">
                        Ваш кошик поки порожній!
                    </div>
                ) : (
                    <div className="cart-dropdown__list-container">
                        {renderServerData({
                            error,
                            loading,
                            content: renderCartItems,
                            showPrevState: true,
                            loaderClassName: 'cart-dropdown__loader',
                            isComponentActive: isActive,
                        })}
                    </div>
                )}
                {cartData.length > 0 ? (
                    <div className="cart-dropdown__summary summary-info">
                        <div className="summary-info__links">
                            <NavLink
                                className="summary-info__view-cart"
                                to="/cart"
                            >
                                Переглянути кошик
                            </NavLink>
                        </div>
                        <SummaryCart />
                    </div>
                ) : (
                    ''
                )}
                <svg
                    className="cart-dropdown__decorative-icon"
                    width="22"
                    height="15"
                    viewBox="0 0 22 15"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M11 0L21.3923 15H0.607696L11 0Z" />
                </svg>
            </div>
        </>
    );
};

export default memo(DropdownShoppingCart);
