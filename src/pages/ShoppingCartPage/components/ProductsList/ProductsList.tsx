import nextId from 'react-id-generator';
import { NavLink } from 'react-router-dom';
import ProductItem from '../ProductItem/ProductItem';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import { updateCartBody } from '../../../../store/reducers/cartSlice';
import renderServerData from '../../../../helpers/renderServerData';
import './ProductsList.scss';

const ProductsList = () => {
    const { cartData, loading, error } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const renderCartItems = () => {
        return cartData.map((cartItem) => {
            return (
                <li
                    className="cart-table__item"
                    key={nextId('product_for-cart')}
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
                    onClick={() => {
                        dispatch(updateCartBody([]));
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
