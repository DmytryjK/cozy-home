import { NavLink } from 'react-router-dom';
import emptyCart from '../../../../assets/icons/cart/empty-cart.svg';
import './EmptyCartMessage.scss';

const EmptyCartMessage = () => {
    return (
        <div className="cart-empty">
            <div className="cart-empty__content">
                <img
                    className="cart-empty__smile"
                    src={emptyCart}
                    alt="похмурий смайл"
                />
                <p className="cart-empty__text">Ваш кошик порожній.</p>
            </div>
            <NavLink className="cart-empty__link" to="/catalog">
                Повернутись в магазин
            </NavLink>
        </div>
    );
};

export default EmptyCartMessage;
