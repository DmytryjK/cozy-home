import { LazyMotion, m, domAnimation } from 'framer-motion';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import ProductsList from './components/ProductsList/ProductsList';
import DeliveryTerms from '../../shared-components/DeliveryTerms/DeliveryTerms';
import SummaryCart from './components/SummaryCart/SummaryCart';
import { useAppSelector } from '../../hooks/hooks';
import EmptyCartMessage from './components/EmptyCartMessage/EmptyCartMessage';
import './ShoppingCartPage.scss';

const ShoppingCartPage = () => {
    const cartBody = useAppSelector((state) => state.cart.cartBody);
    const loading = useAppSelector((state) => state.cart.loading);
    const variant = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.4,
                delay: 0.1,
                easing: 'easy-out',
            },
        },
    };
    return (
        <LazyMotion features={domAnimation} strict>
            <m.section
                initial="hidden"
                variants={variant}
                whileInView="visible"
                viewport={{ once: true }}
                className="cart"
            >
                <Breadcrumbs />
                <div className="container">
                    <h1 className="cart__title">Кошик</h1>
                    {cartBody.length === 0 && loading !== 'pending' ? (
                        <EmptyCartMessage />
                    ) : (
                        <div className="cart-content">
                            <ProductsList />
                            {loading === 'succeeded' ? (
                                <div className="cart__right-side">
                                    <div className="cart__right-sticky">
                                        <SummaryCart
                                            title="Підсумки кошика"
                                            bgColor="#FAFAF9"
                                        />
                                        <div className="cart__delivery-block">
                                            <h3 className="cart__delivery-title">
                                                Умови доставки
                                            </h3>
                                            <DeliveryTerms extraClass="cart__delivery_fz11" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    )}
                </div>
            </m.section>
        </LazyMotion>
    );
};

export default ShoppingCartPage;
