import { Dispatch } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../../hooks/hooks';

const CheckoutBtn = ({ setAction }: { setAction?: Dispatch<any> | null }) => {
    const cartTotal = useAppSelector((state) => state.cart.cartTotal);
    return (
        <NavLink
            className="cart-summary__checkout"
            type="button"
            to={cartTotal?.totalQuantityToCheckout ? '/checkout' : '#'}
            onClick={() => {
                if (!setAction) return;
                setAction(false);
            }}
        >
            Оформити замовлення
        </NavLink>
    );
};

CheckoutBtn.defaultProps = {
    setAction: null,
};

export default CheckoutBtn;
