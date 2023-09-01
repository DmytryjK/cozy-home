import { NavLink } from 'react-router-dom';
import nextId from 'react-id-generator';
import { useEffect, useState } from 'react';
import Modal from '../../../Modal/Modal';
import { openPopUpCart } from '../../../../store/reducers/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import ProductItem from '../../../../pages/ShoppingCartPage/components/ProductItem/ProductItem';
// import SummaryCart from '../../../../pages/ShoppingCartPage/components/SummaryCart/SummaryCart';
import ProductsInfoCart from '../../../../pages/ShoppingCartPage/components/SummaryCart/ProductsInfoCart/ProductsInfoCart';
import CheckoutBtn from '../../../../pages/ShoppingCartPage/components/SummaryCart/CheckoutBtn/CheckoutBtn';
import './PopUpCart.scss';

const PopUpCart = () => {
    const quantityProducts: number[] = [1, 5, 0, 50, 300, 10, 0, 9, 7];

    const dispatch = useAppDispatch();
    const isCartShowStore = useAppSelector(
        (state) => state.modals.isPopUpCartOpen
    );
    const [isCartPopUpShow, setIsCartPopUpShow] =
        useState<boolean>(isCartShowStore);

    useEffect(() => {
        if (isCartPopUpShow === isCartShowStore) return;
        setIsCartPopUpShow(isCartShowStore);
    }, [isCartShowStore]);

    useEffect(() => {
        if (isCartPopUpShow === isCartShowStore) return;
        dispatch(openPopUpCart(isCartPopUpShow));
    }, [isCartPopUpShow]);

    return (
        <Modal
            active={isCartPopUpShow}
            setActive={setIsCartPopUpShow}
            maxwidth="884px"
        >
            <div className="cart-window">
                <h2 className="cart-window__title">Кошик</h2>
                <div className="cart-table__wrapper">
                    <div className="cart-table">
                        <ul className="cart-table__items">
                            {quantityProducts.map((quantity) => {
                                return (
                                    <li
                                        className="cart-table__item"
                                        key={nextId('product_for-cart_popup')}
                                    >
                                        <ProductItem
                                            key={nextId('cart-product_on-page')}
                                            quantityProducts={quantity}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="cart-window__extra-info">
                    <ProductsInfoCart />
                    <NavLink
                        className="cart-window__open-cart"
                        to="/cart"
                        onClick={() => setIsCartPopUpShow(false)}
                    >
                        Переглянути кошик
                    </NavLink>
                    <CheckoutBtn setAction={setIsCartPopUpShow} />
                </div>
            </div>
        </Modal>
    );
};

export default PopUpCart;
