import {
    useState,
    useEffect,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/hooks';
import CartTrashBtn from '../../../../shared-components/CartTrashBtn/CartTrashBtn';
import addSpaceToPrice from '../../../../utils/addSpaceToPrice';
import type { CartData } from '../../../../types/types';
import './ProductItem.scss';

type Props = {
    cartData: CartData;
    setAction?: Dispatch<SetStateAction<any>> | null;
};

const ProductItem = (props: Props) => {
    const { cartData, setAction } = props;
    const {
        name,
        colorName,
        colorHex,
        availableProductQuantity,
        imagePath,
        price,
        priceWithDiscount,
        skuCode,
    } = cartData;
    const [quantity, setQuantity] = useState<number | ''>(1);
    const [isEnoughProductToBuy, setIsEnoughProductToBuy] =
        useState<boolean>(true);

    const cartBody = useAppSelector((state) => state.cart.cartBody);

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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.value === '0') {
            setQuantity(1);
        } else {
            setQuantity(+target.value);
        }
        setIsEnoughProductToBuy(true);

        if (+target.value > availableProductQuantity) {
            setIsEnoughProductToBuy(false);
        }
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
                    to={`/product/${skuCode}`}
                    onClick={handleOpenProductPage}
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
                        to={`/product/${skuCode}`}
                        onClick={handleOpenProductPage}
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
                <div className="cart-product__quantity">
                    <button
                        className="cart-product__quantity-minus"
                        type="button"
                        aria-label="-"
                        disabled={availableProductQuantity === 0}
                        onClick={() => {
                            if (!quantity) return;
                            if (
                                quantity === availableProductQuantity + 1 &&
                                !isEnoughProductToBuy
                            ) {
                                setIsEnoughProductToBuy(true);
                            } else if (quantity > availableProductQuantity) {
                                setIsEnoughProductToBuy(false);
                            } else if (quantity >= 2) {
                                setIsEnoughProductToBuy(true);
                            }
                            if (quantity < 2) {
                                setIsEnoughProductToBuy(true);
                                return;
                            }
                            setQuantity(quantity - 1);
                        }}
                    />
                    <input
                        className="cart-product__quantity-input"
                        type="number"
                        value={
                            availableProductQuantity === 0
                                ? availableProductQuantity
                                : quantity || ''
                        }
                        disabled={availableProductQuantity === 0}
                        onChange={handleInputChange}
                        onBlur={(e) => {
                            if (+e.target.value === availableProductQuantity) {
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
                        disabled={availableProductQuantity === 0}
                        onClick={() => {
                            if (!quantity) return;
                            if (quantity >= availableProductQuantity) {
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
                    {availableProductQuantity === 0
                        ? 'Немає в наявності'
                        : 'В наявності'}
                </span>
                <div className="cart-product__price">
                    {priceWithDiscount ? (
                        <span className="cart-product__discount">
                            {addSpaceToPrice(priceWithDiscount)} UAH
                        </span>
                    ) : null}
                    <span
                        className={`cart-product__price
                    ${priceWithDiscount ? 'discount-price' : ''}`}
                    >
                        {addSpaceToPrice(price)} UAH
                    </span>
                </div>
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
