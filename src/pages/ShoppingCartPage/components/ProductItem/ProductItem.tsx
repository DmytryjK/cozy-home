import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/hooks';
import CartTrashBtn from '../../../../shared-components/CartTrashBtn/CartTrashBtn';
import ProductItemRight from './ProductItemRight/ProductItemRight';
import type { CartData } from '../../../../types/types';
import './ProductItem.scss';

type Props = {
    cartData: CartData;
    setAction?: Dispatch<SetStateAction<any>>;
};

const ProductItem = (props: Props) => {
    const { cartData, setAction } = props;
    const cartBody = useAppSelector((state) => state.cart.cartBody);
    const [isEnoughProductToBuy, setIsEnoughProductToBuy] =
        useState<boolean>(true);
    const {
        name,
        colorName,
        colorHex,
        availableProductQuantity,
        imagePath,
        skuCode,
    } = cartData;

    useEffect(() => {
        if (cartBody.length === 0 && setAction) {
            setAction(false);
        }
    }, [cartBody]);

    const handleOpenProductPage = () => {
        localStorage.setItem('productSkuCode', `${skuCode}`);
        localStorage.setItem('hex', `${colorHex}`);
        localStorage.setItem('colorName', `${colorName}`);
        if (!setAction) return;
        setAction(false);
    };

    return (
        <ul
            className={`cart-product ${
                isEnoughProductToBuy ? '' : 'wrong-quantity'
            } ${availableProductQuantity === 0 ? 'out-of-stock' : ''}`}
        >
            <li className="cart-product__item">
                <CartTrashBtn skuCode={skuCode} colorHex={colorHex} />
            </li>
            <li className="cart-product__item cart-product__info">
                <NavLink
                    className="cart-product__link"
                    to={`/product/${skuCode}${colorHex}`}
                    // reloadDocument
                    onMouseDown={handleOpenProductPage}
                >
                    <img
                        className="cart-product__photo"
                        src={imagePath}
                        alt={name}
                    />
                </NavLink>
                <div className="cart-product__text">
                    <NavLink
                        className="cart-product__title-link"
                        to={`/product/${skuCode}${colorHex}`}
                        // reloadDocument
                        onMouseDown={handleOpenProductPage}
                    >
                        {name}
                    </NavLink>
                    <span className="cart-product__sku">{skuCode}</span>
                    <span className="cart-product__color">
                        <span>Колір: </span>
                        {colorName}
                    </span>
                    <span className="cart-product__status-mobile">
                        {availableProductQuantity === 0
                            ? 'Немає в наявності'
                            : 'В наявності'}
                    </span>
                </div>
            </li>
            <li className="cart-product__item cart-product__right">
                <ProductItemRight
                    cartData={cartData}
                    setIsEnoughProductToBuy={setIsEnoughProductToBuy}
                />
            </li>
            <li className="cart-product__error-message">
                Недостатньо товару для покупки. Доступно{' '}
                {availableProductQuantity} шт.
            </li>
        </ul>
    );
};

ProductItem.defaultProps = {
    setAction: null,
};

export default ProductItem;
