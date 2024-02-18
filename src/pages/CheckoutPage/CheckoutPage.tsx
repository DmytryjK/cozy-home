/* eslint-disable no-nested-ternary */
import { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import SummaryCart from '../ShoppingCartPage/components/SummaryCart/SummaryCart';
import ResetPassword from './components/ResetPassword/ResetPassword';
import DeliveryAndPaymentForm from './components/DeliveryAndPaymentForm/DeliveryAndPaymentForm';
import ProductsList from './components/ProductsList/ProductsList';
import CustomerForm from './components/CustomerForm/CustomerForm';
import RegularCustomerAuth from './components/RegularCustomerAuth/RegularCustomerAuth';
import FormUpdater from './components/FormUpdater/FormUpdater';
import { setOrderedProducts } from '../../store/reducers/orderSlice';
import './CheckoutPage.scss';

type ComponentsType = {
    ResetPassword: JSX.Element;
    NewCustomer: JSX.Element;
    RegularCustomer: JSX.Element;
    RegularCustomerLoggedIn: JSX.Element;
    DeliveryAndPaymentForm: JSX.Element;
};

const CheckoutPage = () => {
    const [newCustomerActive, setNewCustomerActive] = useState(true);
    const [regularCustomerActive, setRegularCustomerActive] = useState(false);
    const [customerForm, setCustomerForm] = useState<any>(null);
    const [firstStepActive, setFirstStepActive] = useState(true);
    const [secondStepActive, setSecondStepActive] = useState(false);
    const [resetPasswordActive, setResetPasswordActive] = useState(false);
    const [regularLoggedIn, setRegularLoggedIn] = useState(false);
    const [selectedDeliveryOption, setSelectedDeliveryOption] =
        useState<string>('postal-delivery');
    const navigate = useNavigate();
    const cartTotal = useAppSelector((state) => state.cart.cartTotal);
    const jwtToken = useAppSelector((state) => state.auth.jwtToken);
    const productsInfoToCheckout = useAppSelector(
        (state) => state.cart.productsInfoToCheckout
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!cartTotal) return;
        const orderedProducts = productsInfoToCheckout
            .map((item) => {
                const { skuCode, colorHex, quantityToCheckout, price } = item;
                return {
                    productSkuCode: skuCode,
                    colorHex,
                    quantity: quantityToCheckout,
                    price,
                };
            })
            .filter((item) => item.quantity > 0);
        dispatch(setOrderedProducts(orderedProducts));
        if (cartTotal.totalQuantityToCheckout === 0) {
            // navigate(-1);
        }
    }, [cartTotal]);

    useEffect(() => {
        if (jwtToken) {
            setNewCustomerActive(false);
            setRegularCustomerActive(true);
            setRegularLoggedIn(true);
        } else {
            setRegularLoggedIn(false);
        }
    }, [jwtToken]);

    const handleCustomerClick = useCallback((isRegular: boolean) => {
        setFirstStepActive(true);
        setSecondStepActive(false);
        setNewCustomerActive(!isRegular);
        setRegularCustomerActive(isRegular);
        setResetPasswordActive(false);
    }, []);

    const handleStepClick = useCallback((isRegular: boolean) => {
        setFirstStepActive(!isRegular);
        setSecondStepActive(isRegular);
    }, []);

    const components: ComponentsType = {
        ResetPassword: (
            <ResetPassword setResetPasswordActive={setResetPasswordActive} />
        ),
        NewCustomer: (
            <CustomerForm
                handleSubmit={handleStepClick}
                setCustomerForm={setCustomerForm}
            />
        ),
        RegularCustomer: (
            <RegularCustomerAuth
                setResetPasswordActive={setResetPasswordActive}
                setRegularLoggedIn={setRegularLoggedIn}
            />
        ),
        RegularCustomerLoggedIn: (
            <CustomerForm
                handleSubmit={handleStepClick}
                setCustomerForm={setCustomerForm}
            />
        ),
        DeliveryAndPaymentForm: (
            <DeliveryAndPaymentForm
                selectedDeliveryOption={selectedDeliveryOption}
                setSelectedDeliveryOption={setSelectedDeliveryOption}
            />
        ),
    };

    const activeComponent = secondStepActive
        ? 'DeliveryAndPaymentForm'
        : resetPasswordActive
        ? 'ResetPassword'
        : newCustomerActive
        ? 'NewCustomer'
        : regularLoggedIn
        ? 'RegularCustomerLoggedIn'
        : 'RegularCustomer';

    return (
        <>
            <Breadcrumbs />
            <div className="container">
                <div className="checkout">
                    <h1 className="checkout__title">Оформлення замовлення</h1>
                    <div className="checkout__content">
                        <div className="customer-block">
                            <div className="customer-handler">
                                <ul className="customer-handler__list">
                                    <li
                                        onClick={() =>
                                            handleCustomerClick(false)
                                        }
                                        className={
                                            newCustomerActive
                                                ? 'customer-handler__list_item active'
                                                : 'customer-handler__list_item'
                                        }
                                    >
                                        Новий покупець
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleCustomerClick(true)
                                        }
                                        className={
                                            regularCustomerActive
                                                ? 'customer-handler__list_item regular-cutomer active'
                                                : 'customer-handler__list_item regular-cutomer'
                                        }
                                    >
                                        Постійний клієнт
                                    </li>
                                </ul>
                            </div>
                            {newCustomerActive || regularLoggedIn ? (
                                <div className="customer-block__steps">
                                    <button
                                        className={
                                            firstStepActive
                                                ? 'customer-block__steps_step active'
                                                : 'customer-block__steps_step'
                                        }
                                        type="button"
                                        onClick={() => {
                                            setFirstStepActive(true);
                                            setSecondStepActive(false);
                                        }}
                                    >
                                        <span
                                            className={
                                                firstStepActive
                                                    ? 'customer-block__steps_step_number active'
                                                    : 'customer-block__steps_step_number'
                                            }
                                        >
                                            1
                                        </span>
                                        Особисті дані
                                    </button>
                                    <button
                                        className={
                                            secondStepActive
                                                ? 'customer-block__steps_step active'
                                                : 'customer-block__steps_step'
                                        }
                                        type="button"
                                        onClick={() => {
                                            if (customerForm) {
                                                customerForm.submitForm();
                                            }
                                        }}
                                    >
                                        <span
                                            className={
                                                secondStepActive
                                                    ? 'customer-block__steps_step_number active'
                                                    : 'customer-block__steps_step_number'
                                            }
                                        >
                                            2
                                        </span>
                                        Інформація про доставку та оплату
                                    </button>
                                </div>
                            ) : (
                                ''
                            )}
                            {components[activeComponent]}
                        </div>
                        <div className="summary-block">
                            <SummaryCart
                                title="Ваше замовлення"
                                bgColor="#FAFAF9"
                            >
                                <ProductsList />
                            </SummaryCart>
                        </div>
                    </div>
                </div>
            </div>
            <FormUpdater />
        </>
    );
};

export default memo(CheckoutPage);
