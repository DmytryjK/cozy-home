import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../../Modal/Modal';
import { openPopUpCart } from '../../../../store/reducers/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import ProductItem from '../../../../pages/ShoppingCartPage/components/ProductItem/ProductItem';
import ProductsInfoCart from '../../../../pages/ShoppingCartPage/components/SummaryCart/ProductsInfoCart/ProductsInfoCart';
import CheckoutBtn from '../../../../pages/ShoppingCartPage/components/SummaryCart/CheckoutBtn/CheckoutBtn';
import renderServerData from '../../../../helpers/renderServerData';
import './PopUpCart.scss';

const PopUpCart = () => {
    const cartData = useAppSelector((state) => state.cart.cartData);
    const loading = useAppSelector((state) => state.cart.loading);
    const error = useAppSelector((state) => state.cart.error);
    const cartBody = useAppSelector((state) => state.cart.cartBody);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
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

    useEffect(() => {
        if (cartBody.length === 0) {
            setIsCartPopUpShow(false);
        }
    }, [cartBody]);

    const renderCartItems = () => {
        return (
            <div className="cart-table__wrapper">
                <div className="cart-table">
                    <ul
                        className="cart-table__items"
                        data-lenis-prevent
                        data-lenis-prevent-wheel
                        data-lenis-prevent-touch
                    >
                        {cartData.map((cartItem) => {
                            return (
                                <li
                                    className="cart-table__item"
                                    key={`popUp-cart${cartItem.skuCode}${cartItem.colorHex}`}
                                >
                                    <ProductItem
                                        cartData={cartItem}
                                        setAction={setIsCartPopUpShow}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    };

    return pathname === '/cart' ? (
        <div style={{ display: 'none' }} />
    ) : (
        <Modal
            active={isCartPopUpShow}
            setActive={setIsCartPopUpShow}
            maxwidth="884px"
        >
            <div className="cart-window">
                <h2 className="cart-window__title">Кошик</h2>
                <div
                    className={`cart-table__container ${
                        loading === 'succeeded' ? '' : 'loading'
                    }`}
                >
                    {renderServerData({
                        error,
                        loading,
                        content: renderCartItems,
                        showPrevState: true,
                        loaderClassName: 'cart-window__loader',
                    })}
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
