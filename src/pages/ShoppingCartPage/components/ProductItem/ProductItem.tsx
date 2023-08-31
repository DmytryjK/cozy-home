import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import addSpaceToPrice from '../../../../utils/addSpaceToPrice';
import item1 from '../../../../assets/images/cart/item1.png';
import './ProductItem.scss';

const ProductItem = ({ quantityProducts }: { quantityProducts: number }) => {
    const [quantity, setQuantity] = useState<number>(quantityProducts);
    const discount = '20%';
    const price = 120000;
    const priceWithDiscount = 89000;
    return (
        <tr className="cart-products__item">
            <td>
                <button className="cart-products__trash" type="button">
                    <svg
                        className="cart-products__trash-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path d="M6.6 0C6.2346 0 5.858 0.123333 5.5934 0.375333C5.3295 0.626667 5.2 0.985333 5.2 1.33333V2H1V3.33333H1.7V14C1.7 15.0967 2.6485 16 3.8 16H12.2C13.3515 16 14.3 15.0967 14.3 14V3.33333H15V2H10.8V1.33333C10.8 0.985333 10.6705 0.626667 10.4059 0.374667C10.142 0.124 9.7661 0 9.4 0H6.6ZM6.6 1.33333H9.4V2H6.6V1.33333ZM3.1 3.33333H12.9V14C12.9 14.37 12.5885 14.6667 12.2 14.6667H3.8C3.4115 14.6667 3.1 14.37 3.1 14V3.33333ZM4.5 5.33333V12.6667H5.9V5.33333H4.5ZM7.3 5.33333V12.6667H8.7V5.33333H7.3ZM10.1 5.33333V12.6667H11.5V5.33333H10.1Z" />
                    </svg>
                </button>
            </td>
            <td>
                <NavLink
                    className="cart-products__link"
                    to="/product/240009"
                    onClick={() => {
                        localStorage.setItem('productSkuCode', '240009');
                        localStorage.setItem('hex', '#C57100');
                        localStorage.setItem('colorName', 'Коричневий');
                    }}
                >
                    <img
                        className="cart-products__photo"
                        src={item1}
                        alt="Крісло Comfort"
                    />
                </NavLink>
            </td>
            <td>
                <div className="cart-products__text">
                    <NavLink
                        className="cart-products__title-link"
                        to="/product/240009"
                        onClick={() => {
                            localStorage.setItem('productSkuCode', '240009');
                            localStorage.setItem('hex', '#C57100');
                            localStorage.setItem('colorName', 'Коричневий');
                        }}
                    >
                        Крісло Comfort
                    </NavLink>
                    <span className="cart-products__sku">240009</span>
                    <span className="cart-products__color">
                        <span>Колір: </span>
                        чорний
                    </span>
                </div>
            </td>
            <td>
                <div className="cart-products__quantity">
                    <button
                        className="cart-products__quantity-minus"
                        type="button"
                        aria-label="-"
                        onClick={() => {
                            if (quantity < 2) return;
                            setQuantity(quantity - 1);
                        }}
                    />
                    <input
                        className="cart-products__quantity-input"
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                            const target = e.target.value;
                            if (target === '' || target === '0') {
                                setQuantity(1);
                            } else {
                                setQuantity(+target);
                            }
                        }}
                    />
                    <button
                        className="cart-products__quantity-plus"
                        type="button"
                        aria-label="+"
                        onClick={() => setQuantity(quantity + 1)}
                    />
                </div>
            </td>
            <td>
                <span className="cart-products__status">В наявності</span>
            </td>
            <td>
                <div className="cart-products__price">
                    {discount ? (
                        <span className="cart-products__discount">
                            {addSpaceToPrice(priceWithDiscount)} UAH
                        </span>
                    ) : null}
                    <span
                        className={`cart-products__price
                            ${discount ? 'discount-price' : ''}`}
                    >
                        {addSpaceToPrice(price)} UAH
                    </span>
                </div>
            </td>
        </tr>
    );
};

export default ProductItem;
