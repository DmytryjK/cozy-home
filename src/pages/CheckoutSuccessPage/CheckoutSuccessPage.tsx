import { NavLink, useNavigate } from 'react-router-dom';
import './CheckoutSuccessPage.scss';
import { useEffect } from 'react';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import checkoutSuccessSprite from '../../assets/icons/checkout-success/checkout-success-smile.svg';
import { useAppSelector } from '../../hooks/hooks';

const CheckoutSuccessPage = () => {
    const orderNumber = useAppSelector((state) => state.order.orderNumber);
    const navigate = useNavigate();

    useEffect(() => {
        if (!orderNumber) {
            navigate(-1);
        }
    }, [orderNumber]);
    return (
        <>
            <Breadcrumbs />
            <div className="checkout-success">
                <div className="container">
                    <h1 className="checkout-success__title">
                        Ваш заказ № {orderNumber} успішно оформлено!
                    </h1>
                    <div className="checkout-success__content">
                        <div className="flex">
                            <svg
                                width="36"
                                height="36"
                                className="checkout-success__content_icon"
                            >
                                <use href={`${checkoutSuccessSprite}#smile`} />
                            </svg>
                            <p className="checkout-success__content_description">
                                Дякуємо за замовлення!
                            </p>
                        </div>
                        <p className="checkout-success__content_text">
                            З Вами у найближчі робочі години зв'яжеться
                            менеджер.
                        </p>
                    </div>
                    <NavLink to="/catalog">
                        <p className="checkout-success__button-back">
                            Повернутись в магазин
                        </p>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default CheckoutSuccessPage;
