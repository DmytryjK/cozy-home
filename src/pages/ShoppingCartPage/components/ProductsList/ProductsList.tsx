import { NavLink } from 'react-router-dom';
import ProductItem from '../ProductItem/ProductItem';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import {
    resetCartData,
    updateCartBody,
} from '../../../../store/reducers/cartSlice';
import renderServerData from '../../../../helpers/renderServerData';
import './ProductsList.scss';

const ProductsList = () => {
    const cartData = useAppSelector((state) => state.cart.cartData);
    const loading = useAppSelector((state) => state.cart.loading);
    const error = useAppSelector((state) => state.cart.error);
    const dispatch = useAppDispatch();

    const renderCartItems = () => {
        return cartData.map((cartItem) => {
            return (
                <li
                    className="cart-table__item"
                    key={`product_for-cart${cartItem.skuCode}-${cartItem.colorHex}`}
                >
                    <ProductItem cartData={cartItem} />
                </li>
            );
        });
    };

    return (
        <div className="cart-table">
            <ul className="cart-table__header">
                <li
                    className="cart-table__header-item"
                    aria-label="видалити товар"
                />
                <li className="cart-table__header-item cart-table__header-item_pdl">
                    Товар
                </li>
                <ul className="cart-table__header-right">
                    <li className="cart-table__header-item">Кількість</li>
                    <li className="cart-table__header-item">Наявність</li>
                    <li className="cart-table__header-item">Вартість</li>
                </ul>
            </ul>
            <ul className="cart-table__items">
                {renderServerData({
                    error,
                    loading,
                    content: renderCartItems,
                })}
            </ul>
            <div className="cart-table__navigation-wrapper">
                <button
                    className="cart-table__clear-cart"
                    type="button"
                    disabled={loading !== 'succeeded'}
                    onClick={() => {
                        dispatch(updateCartBody([]));
                        dispatch(resetCartData());
                    }}
                >
                    Очистити кошик
                </button>
                <NavLink className="cart-table__go-shopping" to="/catalog">
                    До покупок
                </NavLink>
            </div>
        </div>
    );
};

export default ProductsList;
