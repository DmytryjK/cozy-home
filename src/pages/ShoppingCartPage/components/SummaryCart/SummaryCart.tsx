import { ReactNode } from 'react';
import ProductsInfoCart from './ProductsInfoCart/ProductsInfoCart';
import CheckoutBtn from './CheckoutBtn/CheckoutBtn';
import './SummaryCart.scss';

const SummaryCart = ({
    title,
    bgColor,
    children,
}: {
    title?: string | null;
    bgColor?: string;
    children?: ReactNode | null;
}) => {
    return (
        <div className="cart-summary">
            <div
                className="cart-summary__inner-content"
                style={{ backgroundColor: bgColor }}
            >
                {title ? (
                    <h3 className="cart-summary__title">{title}</h3>
                ) : null}
                {children}
                <ProductsInfoCart />
            </div>
            <CheckoutBtn />
        </div>
    );
};

SummaryCart.defaultProps = {
    title: null,
    bgColor: 'transparent',
    children: null,
};

export default SummaryCart;
