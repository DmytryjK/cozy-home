import ProductsInfoCart from './ProductsInfoCart/ProductsInfoCart';
import CheckoutBtn from './CheckoutBtn/CheckoutBtn';
import './SummaryCart.scss';

const SummaryCart = ({
    title,
    bgColor,
}: {
    title?: string | null;
    bgColor?: string;
}) => {
    return (
        <div className="cart-summary">
            <div
                className="cart-summary__inner-content"
                style={{ backgroundColor: bgColor }}
            >
                {title ? (
                    <h3 className="cart-summary__title">Підсумки кошика</h3>
                ) : null}
                <ProductsInfoCart />
            </div>
            <CheckoutBtn />
        </div>
    );
};

SummaryCart.defaultProps = {
    title: null,
    bgColor: 'transparent',
};

export default SummaryCart;
