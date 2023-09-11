import { Dispatch } from 'react';
import { NavLink } from 'react-router-dom';

const CheckoutBtn = ({ setAction }: { setAction?: Dispatch<any> | null }) => {
    return (
        <NavLink
            className="cart-summary__checkout"
            type="button"
            to="/checkout"
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
