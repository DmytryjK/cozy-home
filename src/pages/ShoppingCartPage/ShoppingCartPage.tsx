import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import ProductsList from './components/ProductsList/ProductsList';
import './ShoppingCartPage.scss';

const ShoppingCartPage = () => {
    return (
        <section className="cart">
            <Breadcrumbs />
            <div className="container">
                <h1 className="cart__title">Кошик</h1>
                <div className="cart-content">
                    <ProductsList />
                </div>
            </div>
        </section>
    );
};

export default ShoppingCartPage;
