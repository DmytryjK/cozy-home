import { useState, useEffect } from 'react';
import addSpaceToPrice from '../../../../../utils/addSpaceToPrice';
import { useAppSelector, useAppDispatch } from '../../../../../hooks/hooks';
import { updateCartTotal } from '../../../../../store/reducers/cartSlice';
import pluralizeUkrainian from '../../../../../helpers/pluralizeUkrainian';

const ProductsInfoCart = () => {
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    const productsInfoToCheckout = useAppSelector(
        (state) => state.cart.productsInfoToCheckout
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        let quantity = 0;
        let cost = 0;
        productsInfoToCheckout.forEach((item) => {
            const { price, quantityToCheckout } = item;
            quantity += quantityToCheckout;
            cost += price;
        });
        setTotalQuantity(quantity);
        setTotalCost(cost);
        dispatch(updateCartTotal({ totalQuantity: quantity, totalCost: cost }));
    }, [productsInfoToCheckout]);

    return (
        <div className="cart-summary__products-info">
            <span className="cart-summary__quantity">
                Разом (
                <span>
                    {pluralizeUkrainian(totalQuantity, [
                        'товар',
                        'товари',
                        'товарів',
                    ])}
                </span>
                )
            </span>
            <span className="cart-summary__cost">
                {addSpaceToPrice(totalCost)} UAH
            </span>
        </div>
    );
};

export default ProductsInfoCart;
