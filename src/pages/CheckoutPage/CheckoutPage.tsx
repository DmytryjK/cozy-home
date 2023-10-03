/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import './CheckoutPage.scss';
import NewCustomerForm from './components/NewCustomerForm/NewCustomerForm';
import SummaryCart from '../ShoppingCartPage/components/SummaryCart/SummaryCart';
import RegularCustomerFormLogIn from './components/RegularCustomerFormLogIn/RegularCustomerFormLogIn';
import ResetPassword from './components/ResetPassword/ResetPassword';
import RegularCustomerLoggedIn from './components/RegularCustomerLoggedIn/RegularCustomerLoggedIn';
import DeliveryAndPaymentForm from './components/DeliveryAndPaymentForm/DeliveryAndPaymentForm';
import AddressDelivery from './components/AddressDelivery/AddressDelivery';
import ProductsList from './components/ProductsList/ProductsList';

type ComponentsType = {
    ResetPassword: JSX.Element;
    NewCustomer: JSX.Element;
    RegularCustomer: JSX.Element;
    RegularCustomerLoggedIn: JSX.Element;
    DeliveryAndPaymentForm: JSX.Element;
    AddressDelivery: JSX.Element;
};

const CheckoutPage = () => {
    const [newCustomerActive, setNewCustomerActive] = useState(true);
    const [regularCustomerActive, setRegularCustomerActive] = useState(false);
    const [firstStepActive, setFirstStepActive] = useState(true);
    const [secondStepActive, setSecondStepActive] = useState(false);
    const [resetPasswordActive, setResetPasswordActive] = useState(false);
    const [regularLoggedIn, setRegularLoggedIn] = useState(false);
    const [selectedDeliveryOption, setSelectedDeliveryOption] =
        useState<string>('pickup');

    const handleCustomerClick = (isRegular: boolean) => {
        setFirstStepActive(true);
        setSecondStepActive(false);
        setNewCustomerActive(!isRegular);
        setRegularCustomerActive(isRegular);
        setResetPasswordActive(false);
        setRegularLoggedIn(false);
    };

    const handleStepClick = (isRegular: boolean) => {
        setFirstStepActive(!isRegular);
        setSecondStepActive(isRegular);
    };

    const components: ComponentsType = {
        ResetPassword: (
            <ResetPassword setResetPasswordActive={setResetPasswordActive} />
        ),
        NewCustomer: <NewCustomerForm handleSubmit={handleStepClick} />,
        RegularCustomer: (
            <RegularCustomerFormLogIn
                setResetPasswordActive={setResetPasswordActive}
                setRegularLoggedIn={setRegularLoggedIn}
            />
        ),
        RegularCustomerLoggedIn: (
            <RegularCustomerLoggedIn handleSubmit={handleStepClick} />
        ),
        DeliveryAndPaymentForm: (
            <DeliveryAndPaymentForm
                selectedDeliveryOption={selectedDeliveryOption}
                setSelectedDeliveryOption={setSelectedDeliveryOption}
            />
        ),
        AddressDelivery: <AddressDelivery />,
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
                                    <p
                                        className={
                                            firstStepActive
                                                ? 'customer-block__steps_step active'
                                                : 'customer-block__steps_step'
                                        }
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
                                    </p>
                                    <p
                                        className={
                                            secondStepActive
                                                ? 'customer-block__steps_step active'
                                                : 'customer-block__steps_step'
                                        }
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
                                    </p>
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
        </>
    );
};

export default CheckoutPage;
