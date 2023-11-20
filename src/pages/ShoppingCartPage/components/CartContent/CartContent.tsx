/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import ProductsList from '../ProductsList/ProductsList';
import SummaryCart from '../SummaryCart/SummaryCart';
import DeliveryTerms from '../../../../shared-components/DeliveryTerms/DeliveryTerms';
import EmptyCartMessage from '../EmptyCartMessage/EmptyCartMessage';
import { useAppSelector } from '../../../../hooks/hooks';

const CartContent = () => {
    const cartBody = useAppSelector((state) => state.cart.cartBody);
    const loading = useAppSelector((state) => state.cart.loading);

    return (
        <>
            {cartBody.length > 0 ? (
                <div className="cart-content">
                    <ProductsList />
                    {loading === 'succeeded' ? (
                        <div className="cart__right-side">
                            <div className="cart__right-sticky">
                                <SummaryCart
                                    title="Підсумки кошика"
                                    bgColor="#FAFAF9"
                                />
                                <div className="cart__delivery-block">
                                    <h3 className="cart__delivery-title">
                                        Умови доставки
                                    </h3>
                                    <DeliveryTerms extraClass="cart__delivery_fz11" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            ) : (
                <EmptyCartMessage />
            )}
        </>
    );
};

export default CartContent;
