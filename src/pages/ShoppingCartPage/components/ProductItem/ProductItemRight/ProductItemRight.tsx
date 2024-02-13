import {
    useState,
    useEffect,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../hooks/hooks';
import { updateProductsInfoToCheckout } from '../../../../../store/reducers/cartSlice';
import addSpaceToPrice from '../../../../../utils/addSpaceToPrice';
import type { CartData } from '../../../../../types/types';

type Props = {
    cartData: CartData;
    setIsEnoughProductToBuy: Dispatch<SetStateAction<any>>;
};

const ProductItemRight = (props: Props) => {
    const { cartData, setIsEnoughProductToBuy } = props;
    const {
        name,
        colorHex,
        colorName,
        availableProductQuantity,
        price,
        priceWithDiscount,
        skuCode,
    } = cartData;
    const [quantity, setQuantity] = useState<number | ''>(1);
    const [inputValue, setInputValue] = useState<number | ''>(1);

    const [isInputQuantityChange, setIsInputQuantityChange] =
        useState<boolean>(false);

    const productsInfoToCheckout = useAppSelector(
        (state) => state.cart.productsInfoToCheckout
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!quantity) return;
        if (isInputQuantityChange) {
            dispatch(
                updateProductsInfoToCheckout({
                    productName: name,
                    skuCode,
                    colorHex,
                    colorName,
                    quantityToCheckout: quantity,
                    price: (priceWithDiscount || price) * quantity,
                })
            );
        }
    }, [quantity, isInputQuantityChange]);

    useEffect(() => {
        const currentIndexItem = productsInfoToCheckout.findIndex(
            (item) => item.skuCode === skuCode && item.colorHex === colorHex
        );
        if (currentIndexItem > -1) {
            setQuantity(
                productsInfoToCheckout[currentIndexItem].quantityToCheckout
            );
            setInputValue(
                productsInfoToCheckout[currentIndexItem].quantityToCheckout
            );
        }
    }, [productsInfoToCheckout]);

    // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const target = e.target as HTMLInputElement;
    //     const maxValue = 999;
    //     setIsInputQuantityChange(false);
    //     if (target.value === '0' || +target.value < 0) {
    //         setQuantity(1);
    //     } else if (+target.value <= maxValue) {
    //         setQuantity(+target.value);
    //     } else if (+target.value > maxValue) {
    //         setQuantity(maxValue);
    //     }
    //     if (+target.value % 1 > 0) {
    //         setQuantity(+target.value.replace(/(\.\d+)?$/, ''));
    //     }
    //     setIsEnoughProductToBuy(true);
    //     if (+target.value > availableProductQuantity) {
    //         setIsEnoughProductToBuy(false);
    //     }
    // };

    // return (
    //     <>
    //         <div className="cart-product__quantity">
    //             <button
    //                 className="cart-product__quantity-minus"
    //                 type="button"
    //                 aria-label="-"
    //                 disabled={availableProductQuantity === 0}
    //                 onClick={() => {
    //                     if (!quantity) return;
    //                     if (quantity <= 1) {
    //                         setQuantity(1);
    //                     } else {
    //                         setQuantity(quantity - 1);
    //                     }
    //                     setIsEnoughProductToBuy(true);
    //                     setIsInputQuantityChange(true);
    //                 }}
    //             />
    //             <input
    //                 className="cart-product__quantity-input"
    //                 id={`${skuCode}-${colorHex}-quantity_input`}
    //                 type="number"
    //                 value={
    //                     availableProductQuantity === 0
    //                         ? availableProductQuantity
    //                         : quantity || ''
    //                 }
    //                 disabled={availableProductQuantity === 0}
    //                 onChange={handleInputChange}
    //                 onBlur={(e) => {
    //                     setIsInputQuantityChange(true);
    //                     if (+e.target.value <= availableProductQuantity) {
    //                         setIsEnoughProductToBuy(true);
    //                         setQuantity(+e.target.value);
    //                     } else if (+e.target.value > availableProductQuantity) {
    //                         setQuantity(availableProductQuantity);
    //                         setIsEnoughProductToBuy(true);
    //                     }
    //                     if (e.target.value === '') {
    //                         setQuantity(1);
    //                     }
    //                 }}
    //             />
    //             <button
    //                 className="cart-product__quantity-plus"
    //                 type="button"
    //                 aria-label="+"
    //                 disabled={availableProductQuantity === 0}
    //                 onClick={() => {
    //                     if (!quantity) return;
    //                     if (quantity >= availableProductQuantity) {
    //                         setQuantity((prev) => prev);
    //                         setIsEnoughProductToBuy(false);
    //                         setIsInputQuantityChange(false);
    //                     } else {
    //                         setQuantity(quantity + 1);
    //                         setIsEnoughProductToBuy(true);
    //                         setIsInputQuantityChange(true);
    //                     }
    //                 }}
    //             />
    //         </div>
    //         <span className="cart-product__status">
    //             {availableProductQuantity === 0
    //                 ? 'Немає в наявності'
    //                 : 'В наявності'}
    //         </span>
    //         <div className="cart-product__price">
    //             {priceWithDiscount && quantity ? (
    //                 <span className="cart-product__discount">
    //                     {addSpaceToPrice(priceWithDiscount * quantity)} UAH
    //                 </span>
    //             ) : null}
    //             <span
    //                 className={`cart-product__price
    //         ${priceWithDiscount ? 'discount-price' : ''}`}
    //             >
    //                 {addSpaceToPrice(price * (quantity || 1))} UAH
    //             </span>
    //         </div>
    //     </>
    // );

    /// NEW VERSION//////
    // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const target = e.target as HTMLInputElement;
    //     const maxValue = 999;
    //     setIsInputQuantityChange(false);
    //     if (+inputValue === 0 || +inputValue < 0) {
    //         setInputValue(1);
    //     } else if (+inputValue <= maxValue) {
    //         setInputValue(+target.value);
    //     } else if (+inputValue > maxValue) {
    //         setInputValue(maxValue);
    //     }
    //     if (+inputValue % 1 > 0) {
    //         setInputValue(+target.value.replace(/(\.\d+)?$/, ''));
    //     }
    //     setIsEnoughProductToBuy(true);
    //     if (+inputValue > availableProductQuantity) {
    //         setIsEnoughProductToBuy(false);
    //     }
    // };

    return (
        <>
            <div className="cart-product__quantity">
                <button
                    className="cart-product__quantity-minus"
                    type="button"
                    aria-label="-"
                    disabled={availableProductQuantity === 0}
                    onClick={() => {
                        if (!quantity) return;
                        if (quantity <= 1) {
                            setQuantity(1);
                            setInputValue(1);
                        } else {
                            setQuantity(quantity - 1);
                            setInputValue(quantity - 1);
                        }
                        setIsEnoughProductToBuy(true);
                        setIsInputQuantityChange(true);
                    }}
                />
                <input
                    className="cart-product__quantity-input"
                    id={`${skuCode}-${colorHex}-quantity_input`}
                    type="number"
                    value={
                        availableProductQuantity === 0
                            ? availableProductQuantity
                            : inputValue || ''
                    }
                    disabled={availableProductQuantity === 0}
                    onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        const maxValue = 999;
                        setIsInputQuantityChange(false);
                        if (+inputValue === 0 || +inputValue < 0) {
                            setInputValue(1);
                        } else if (+inputValue <= maxValue) {
                            setInputValue(+target.value);
                        } else if (+inputValue > maxValue) {
                            setInputValue(maxValue);
                        }
                        if (+inputValue % 1 > 0) {
                            setInputValue(
                                +target.value.replace(/(\.\d+)?$/, '')
                            );
                        }
                        setIsEnoughProductToBuy(true);
                        if (+inputValue > availableProductQuantity) {
                            setIsEnoughProductToBuy(false);
                        }
                    }}
                    onBlur={(e) => {
                        if (inputValue !== quantity) {
                            setIsInputQuantityChange(true);
                        }
                        if (+e.target.value <= availableProductQuantity) {
                            setIsEnoughProductToBuy(true);
                            setInputValue(+e.target.value);
                            setQuantity(+e.target.value);
                        } else if (+e.target.value > availableProductQuantity) {
                            setInputValue(availableProductQuantity);
                            setQuantity(availableProductQuantity);
                            setIsEnoughProductToBuy(true);
                        }
                        if (e.target.value === '') {
                            setInputValue(1);
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
                            setQuantity((prev) => {
                                setInputValue(prev);
                                return prev;
                            });

                            setIsEnoughProductToBuy(false);
                            setIsInputQuantityChange(false);
                        } else {
                            setQuantity(quantity + 1);
                            setInputValue(quantity + 1);
                            setIsEnoughProductToBuy(true);
                            setIsInputQuantityChange(true);
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
                {priceWithDiscount && quantity ? (
                    <span className="cart-product__discount">
                        {addSpaceToPrice(priceWithDiscount * quantity)} UAH
                    </span>
                ) : null}
                <span
                    className={`cart-product__price
            ${priceWithDiscount ? 'discount-price' : ''}`}
                >
                    {addSpaceToPrice(price * (quantity || 1))} UAH
                </span>
            </div>
        </>
    );
};

export default ProductItemRight;
