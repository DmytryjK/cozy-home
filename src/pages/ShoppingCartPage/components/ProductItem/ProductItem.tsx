import { useEffect, useState, ChangeEvent } from 'react';
import { NavLink } from 'react-router-dom';
import addSpaceToPrice from '../../../../utils/addSpaceToPrice';
import item1 from '../../../../assets/images/cart/item1.png';
import './ProductItem.scss';

const ProductItem = ({ quantityProducts }: { quantityProducts: number }) => {
    const [quantity, setQuantity] = useState<number | ''>(
        Math.floor(Math.random() * (quantityProducts - 1 + 1) + 1)
    );
    const [isEnoughProductToBuy, setIsEnoughProductToBuy] =
        useState<boolean>(true);
    const discount = '20%';
    const price = 120000;
    const priceWithDiscount = 89000;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.value === '0') {
            setQuantity(1);
        } else {
            setQuantity(+target.value);
        }
        setIsEnoughProductToBuy(true);

        if (+target.value > quantityProducts) {
            setIsEnoughProductToBuy(false);
        }
    };

    return (
        <ul
            className={`cart-product ${
                isEnoughProductToBuy ? '' : 'wrong-quantity'
            } ${quantityProducts === 0 ? 'out-of-stock' : ''}`}
        >
            <li className="cart-product__item">
                <button className="cart-product__trash" type="button">
                    <svg
                        className="cart-product__trash-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path d="M6.6 0C6.2346 0 5.858 0.123333 5.5934 0.375333C5.3295 0.626667 5.2 0.985333 5.2 1.33333V2H1V3.33333H1.7V14C1.7 15.0967 2.6485 16 3.8 16H12.2C13.3515 16 14.3 15.0967 14.3 14V3.33333H15V2H10.8V1.33333C10.8 0.985333 10.6705 0.626667 10.4059 0.374667C10.142 0.124 9.7661 0 9.4 0H6.6ZM6.6 1.33333H9.4V2H6.6V1.33333ZM3.1 3.33333H12.9V14C12.9 14.37 12.5885 14.6667 12.2 14.6667H3.8C3.4115 14.6667 3.1 14.37 3.1 14V3.33333ZM4.5 5.33333V12.6667H5.9V5.33333H4.5ZM7.3 5.33333V12.6667H8.7V5.33333H7.3ZM10.1 5.33333V12.6667H11.5V5.33333H10.1Z" />
                    </svg>
                </button>
            </li>
            <li className="cart-product__item cart-product__info">
                <NavLink
                    className="cart-product__link"
                    to="/product/240009"
                    onClick={() => {
                        localStorage.setItem('productSkuCode', '240009');
                        localStorage.setItem('hex', '#C57100');
                        localStorage.setItem('colorName', 'Коричневий');
                    }}
                >
                    <img
                        className="cart-product__photo"
                        src={item1}
                        alt="Крісло Comfort"
                    />
                </NavLink>
                <div className="cart-product__text">
                    <NavLink
                        className="cart-product__title-link"
                        to="/product/240009"
                        onClick={() => {
                            localStorage.setItem('productSkuCode', '240009');
                            localStorage.setItem('hex', '#C57100');
                            localStorage.setItem('colorName', 'Коричневий');
                        }}
                    >
                        Крісло Comfort
                    </NavLink>
                    <span className="cart-product__sku">240009</span>
                    <span className="cart-product__color">
                        <span>Колір: </span>
                        чорний
                    </span>
                    <span className="cart-product__status-mobile">
                        {quantityProducts === 0
                            ? 'Немає в наявності'
                            : 'В наявності'}
                    </span>
                </div>
            </li>
            <li className="cart-product__item cart-product__right">
                <div className="cart-product__quantity">
                    <button
                        className="cart-product__quantity-minus"
                        type="button"
                        aria-label="-"
                        disabled={quantityProducts === 0}
                        onClick={() => {
                            if (!quantity) return;
                            if (
                                quantity === quantityProducts &&
                                !isEnoughProductToBuy
                            ) {
                                setIsEnoughProductToBuy(true);
                            } else if (quantity > quantityProducts) {
                                setIsEnoughProductToBuy(false);
                            } else if (quantity >= 2) {
                                setIsEnoughProductToBuy(true);
                            }
                            if (quantity < 2) return;
                            setQuantity(quantity - 1);
                        }}
                    />
                    <input
                        className="cart-product__quantity-input"
                        type="number"
                        value={
                            quantityProducts === 0
                                ? quantityProducts
                                : quantity || ''
                        }
                        disabled={quantityProducts === 0}
                        onChange={handleInputChange}
                        onBlur={(e) => {
                            if (+e.target.value === quantityProducts) {
                                setIsEnoughProductToBuy(true);
                            }
                            if (e.target.value === '') {
                                setQuantity(1);
                            }
                        }}
                    />
                    <button
                        className="cart-product__quantity-plus"
                        type="button"
                        aria-label="+"
                        disabled={quantityProducts === 0}
                        onClick={() => {
                            if (!quantity) return;
                            if (quantity >= quantityProducts) {
                                setQuantity((prev) => prev);
                                setIsEnoughProductToBuy(false);
                            } else {
                                setQuantity(quantity + 1);
                                setIsEnoughProductToBuy(true);
                            }
                        }}
                    />
                </div>
                <span className="cart-product__status">
                    {quantityProducts === 0
                        ? 'Немає в наявності'
                        : 'В наявності'}
                </span>
                <div className="cart-product__price">
                    {discount ? (
                        <span className="cart-product__discount">
                            {addSpaceToPrice(priceWithDiscount)} UAH
                        </span>
                    ) : null}
                    <span
                        className={`cart-product__price
                    ${discount ? 'discount-price' : ''}`}
                    >
                        {addSpaceToPrice(price)} UAH
                    </span>
                </div>
            </li>
            <li className="cart-product__error-message">
                Недостатньо товару для покупки. Доступно {quantityProducts} шт.
            </li>
        </ul>
    );
};

export default ProductItem;
