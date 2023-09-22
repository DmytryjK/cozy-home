import { NavLink } from 'react-router-dom';
import nextId from 'react-id-generator';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import CartTrashBtn from '../../CartTrashBtn/CartTrashBtn';
import renderServerData from '../../../helpers/renderServerData';
import './DropdownShoppingCart.scss';
import SummaryCart from '../../../pages/ShoppingCartPage/components/SummaryCart/SummaryCart';

const DropdownShoppingCart = ({ isActive }: { isActive: boolean }) => {
    const { cartData, loading, error, cartBody } = useAppSelector(
        (state) => state.cart
    );
    const dispatch = useAppDispatch();

    const handleOpenProductPage = (
        skuCode: string,
        colorHex: string,
        colorName: string
    ) => {
        localStorage.setItem('productSkuCode', `${skuCode}`);
        localStorage.setItem('hex', `${colorHex}`);
        localStorage.setItem('colorName', `${colorName}`);
    };

    const renderCartItems = () => {
        return (
            <div className="cart-dropdown__list-wrapper">
                <ul className="cart-dropdown__list">
                    {cartData.map((product) => {
                        const {
                            skuCode,
                            name,
                            colorName,
                            colorHex,
                            priceWithDiscount,
                            price,
                            imagePath,
                        } = product;
                        return (
                            <li
                                className="cart-dropdown__item product-item"
                                key={nextId('cart-product')}
                            >
                                <CartTrashBtn
                                    skuCode={skuCode}
                                    colorHex={colorHex}
                                />
                                <div className="product-item__info">
                                    <NavLink
                                        className="produt-item__link"
                                        to={`/product/${skuCode}`}
                                        onClick={() => {
                                            handleOpenProductPage(
                                                skuCode,
                                                colorHex,
                                                colorName
                                            );
                                        }}
                                    >
                                        <img
                                            className="product-item__photo"
                                            src={imagePath}
                                            alt={name}
                                        />
                                    </NavLink>
                                    <div className="product-item__text">
                                        <NavLink
                                            className="product-item__title-link"
                                            to={`/product/${skuCode}`}
                                            onClick={() => {
                                                handleOpenProductPage(
                                                    skuCode,
                                                    colorHex,
                                                    colorName
                                                );
                                            }}
                                        >
                                            {name}
                                        </NavLink>
                                        <span className="product-item__color">
                                            <span>Колір: </span>
                                            {colorName}
                                        </span>
                                    </div>
                                </div>
                                <div className="product-item__price">
                                    <span className="product-item__current-price">
                                        {price} UAH
                                    </span>
                                    <span className="product-item__price-divider">
                                        x
                                    </span>
                                    <span className="product-item__current-quantity">
                                        1
                                    </span>
                                </div>
                                <span className="product-item__total-cost">
                                    {price * 1} UAH
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    return (
        <div
            className={`cart-dropdown ${isActive ? 'dropdown-active' : ''}`}
            style={{
                maxWidth: cartData.length === 0 ? '380px' : '590px',
            }}
        >
            {cartBody.length > 0 ? (
                <div className="cart-dropdown__list-container">
                    {renderServerData({
                        error,
                        loading,
                        content: renderCartItems,
                        showPrevState: true,
                        loaderClassName: 'cart-dropdown__loader',
                    })}
                </div>
            ) : (
                <div className="cart-dropdown__empty">
                    Ваш кошик поки порожній!
                </div>
            )}
            {cartData.length > 0 ? (
                <div className="cart-dropdown__summary summary-info">
                    <div className="summary-info__links">
                        <NavLink className="summary-info__view-cart" to="/cart">
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
    );
};

export default DropdownShoppingCart;
