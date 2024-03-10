import { useState, useEffect, Dispatch, SetStateAction, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/hooks';
import CartTrashBtn from '../../../../shared-components/CartTrashBtn/CartTrashBtn';
import ProductItemRight from './ProductItemRight/ProductItemRight';
import type { CartData, Loading } from '../../../../types/types';
import type { LinkState } from '../../../../hooks/usePrefetchProduct';
import './ProductItem.scss';

type Props = {
    cartData: CartData;
    setAction?: Dispatch<SetStateAction<any>>;
    handleProductClick?: (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        sku: string,
        hex: string
    ) => Promise<void>;
    loadingPrefetch?: Loading;
    isLinkClicked?: LinkState;
};

const ProductItem = (props: Props) => {
    const {
        cartData,
        setAction,
        handleProductClick,
        loadingPrefetch,
        isLinkClicked,
    } = props;
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
                    to={`/prefetch/${skuCode}/${colorHex.replace('#', '')}`}
                    onClick={(e) => {
                        e.preventDefault();
                        if (handleProductClick) {
                            handleProductClick(e, skuCode, colorHex);
                        }
                    }}
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
                        to={`/prefetch/${skuCode}/${colorHex.replace('#', '')}`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (handleProductClick) {
                                handleProductClick(e, skuCode, colorHex);
                            }
                        }}
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

export default memo(ProductItem);
