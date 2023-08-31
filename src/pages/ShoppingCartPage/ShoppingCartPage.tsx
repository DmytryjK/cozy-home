import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import ProductsList from './components/ProductsList/ProductsList';
import DeliveryTerms from '../../shared-components/DeliveryTerms/DeliveryTerms';
import './ShoppingCartPage.scss';

const ShoppingCartPage = () => {
    return (
        <section className="cart">
            <Breadcrumbs />
            <div className="container">
                <h1 className="cart__title">Кошик</h1>
                <div className="cart-content">
                    <ProductsList />
                    <div className="cart__right-side">
                        <h3 className="cart__delivery-title">Умови доставки</h3>
                        <DeliveryTerms extraClass="cart__delivery_fz11" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShoppingCartPage;
