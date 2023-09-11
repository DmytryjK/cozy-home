import { useState } from 'react';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import './CheckoutPage.scss';
import NewCustomerForm from './NewCustomerForm/NewCustomerForm';
import SummaryCart from '../ShoppingCartPage/components/SummaryCart/SummaryCart';

const CheckoutPage = () => {
    const [newCustomerActive, setNewCustomerActive] = useState(true);
    const [regularCustomerActive, setRegularCustomerActive] = useState(false);
    const [firstStepActive, setFirstStepActive] = useState(true);
    const [secondStepActive, setSecondStepActive] = useState(false);

    const handleCustomerClick = (isRegular: boolean) => {
        setFirstStepActive(true);
        setSecondStepActive(false);
        setNewCustomerActive(!isRegular);
        setRegularCustomerActive(isRegular);
    };

    const handleStepClick = (isRegular: boolean) => {
        setFirstStepActive(!isRegular);
        setSecondStepActive(isRegular);
    };

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
                            <div className="customer-block__steps">
                                <p
                                    // onClick={() => handleStepClick(false)}
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
                                    // onClick={() => handleStepClick(true)}
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
                            <div className="customer-form">
                                {newCustomerActive ? (
                                    <NewCustomerForm
                                        handleSubmit={handleStepClick}
                                    />
                                ) : (
                                    '123'
                                )}
                            </div>
                        </div>
                        <div className="summary-block">
                            <SummaryCart
                                title="Підсумки кошика"
                                bgColor="#FAFAF9"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;
