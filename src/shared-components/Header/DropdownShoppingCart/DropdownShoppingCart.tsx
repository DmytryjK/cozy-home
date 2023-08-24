import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import nextId from 'react-id-generator';
import userScrollWidth from '../../../utils/userScrollWidth';
import item1 from '../../../assets/images/cart/item1.png';
import './DropdownShoppingCart.scss';

const DropdownShoppingCart = ({ isActive }: { isActive: boolean }) => {
    useEffect(() => {
        document.body.style.paddingRight = isActive
            ? `${userScrollWidth()}px`
            : '0';
        document.body.style.overflow = isActive ? 'hidden' : 'visible';
    }, [isActive]);
    const quantityProducts = [1, 2, 3];
    return (
        <div className={`cart-dropdown ${isActive ? 'active' : ''}`}>
            <ul className="cart-dropdown__list">
                {quantityProducts.map((product) => {
                    return (
                        <li
                            className="cart-dropdown__item product-item"
                            key={nextId('cart-product')}
                        >
                            <button
                                className="product-item__trash"
                                type="button"
                            >
                                <svg
                                    className="product-item__trash-icon"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="Frame 92916">
                                        <path
                                            id="Vector"
                                            d="M7 2C6.739 2 6.47 2.0925 6.281 2.2815C6.0925 2.47 6 2.739 6 3V3.5H3V4.5H3.5V12.5C3.5 13.3225 4.1775 14 5 14H11C11.8225 14 12.5 13.3225 12.5 12.5V4.5H13V3.5H10V3C10 2.739 9.9075 2.47 9.7185 2.281C9.53 2.093 9.2615 2 9 2H7ZM7 3H9V3.5H7V3ZM4.5 4.5H11.5V12.5C11.5 12.7775 11.2775 13 11 13H5C4.7225 13 4.5 12.7775 4.5 12.5V4.5ZM5.5 6V11.5H6.5V6H5.5ZM7.5 6V11.5H8.5V6H7.5ZM9.5 6V11.5H10.5V6H9.5Z"
                                        />
                                    </g>
                                </svg>
                            </button>
                            <div className="product-item__info">
                                <NavLink
                                    className="produt-item__link"
                                    to="/product/240009"
                                    onClick={() => {
                                        localStorage.setItem(
                                            'productSkuCode',
                                            '240009'
                                        );
                                        localStorage.setItem('hex', '#C57100');
                                        localStorage.setItem(
                                            'colorName',
                                            'Коричневий'
                                        );
                                    }}
                                >
                                    <img
                                        className="product-item__photo"
                                        src={item1}
                                        alt="Крісло Comfort"
                                    />
                                </NavLink>
                                <div className="product-item__text">
                                    <NavLink
                                        className="product-item__title-link"
                                        to="/product/240009"
                                        onClick={() => {
                                            localStorage.setItem(
                                                'productSkuCode',
                                                '240009'
                                            );
                                            localStorage.setItem(
                                                'hex',
                                                '#C57100'
                                            );
                                            localStorage.setItem(
                                                'colorName',
                                                'Коричневий'
                                            );
                                        }}
                                    >
                                        Крісло Comfort
                                    </NavLink>
                                    <span className="product-item__color">
                                        <span>Колір: </span>
                                        чорний
                                    </span>
                                </div>
                            </div>
                            <div className="product-item__price">
                                <span className="product-item__current-price">
                                    12 000 UAH
                                </span>
                                <span className="product-item__price-divider">
                                    x
                                </span>
                                <span className="product-item__current-quantity">
                                    1
                                </span>
                            </div>
                            <span className="product-item__total-cost">
                                12 000 UAH
                            </span>
                        </li>
                    );
                })}
            </ul>
            <div className="cart-dropdown__summary summary-info">
                <div className="summary-info__total">
                    <span className="summary-info__total-quantity">
                        Разом (<span>3</span> товара)
                    </span>
                    <span className="summary-info__total-cost">28 600 UAH</span>
                </div>
                <div className="summary-info__links">
                    <a className="summary-info__view-cart" href="/">
                        Переглянути кошик
                    </a>
                    <a className="summary-info__checkout" href="/">
                        Оформити замовлення
                    </a>
                </div>
            </div>
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
