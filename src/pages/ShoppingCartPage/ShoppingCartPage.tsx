import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import CartContent from './components/CartContent/CartContent';
import './ShoppingCartPage.scss';

const ShoppingCartPage = () => {
    return (
        <section className="cart">
            <Breadcrumbs />
            <div className="container">
                <h1 className="cart__title">Кошик</h1>
                <CartContent />
            </div>
        </section>
    );
};

export default ShoppingCartPage;
