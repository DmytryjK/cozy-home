import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import './CheckoutPage.scss';

const CheckoutPage = () => {
    return (
        <>
            <Breadcrumbs />
            <div className="container">
                <div className="checkout">
                    <h1 className="checkout__title">Оформлення замовлення</h1>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;
