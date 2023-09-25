import { useState } from 'react';
import './PaymentMethod.scss';
import { NavLink } from 'react-router-dom';
import SubmitButton from '../../shared-components/SubmitButton/SubmitButton';

export interface PaymentMethodInterface {
    id: string;
    label: string;
}

export const paymentMethodList: PaymentMethodInterface[] = [
    {
        id: 'На карту',
        label: 'На карту',
    },
    {
        id: 'На розрахунковий рахунок',
        label: 'На розрахунковий рахунок',
    },
    {
        id: 'Готівкою при отриманні',
        label: 'Готівкою при отриманні',
    },
];

const PaymentMethod = () => {
    const [selectedPaymentOption, setSelectedPaymentOption] =
        useState('На карту');

    const checkoutSuccess = () => {};

    return (
        <div className="payment-method">
            <h2 className="payment-method__title">Спосіб оплати:</h2>
            {paymentMethodList.map((option) => (
                <div
                    key={option.id}
                    className="delivery-payment-block__options_option"
                >
                    <label className="delivery-payment-block__options_option_label">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value={selectedPaymentOption}
                            checked={selectedPaymentOption === option.id}
                            onChange={() => setSelectedPaymentOption(option.id)}
                            className="delivery-payment-block__options_option_label_input"
                        />
                        {option.label}
                    </label>
                </div>
            ))}
            <div className="payment-method__comment">
                <label htmlFor="" className="payment-method__comment_label">
                    <p className="payment-method__comment_label_title">
                        Коментар
                    </p>
                    <textarea
                        placeholder="Ваш коментар"
                        className="payment-method__comment_label_text"
                    />
                </label>
            </div>
            <div className="payment-method__completion">
                <label className="filter__label">
                    <input className="filter__input" type="checkbox" />
                    <span className="filter__input_custom-input">
                        <span className="filter__input_custom-input_default" />
                        <span className="filter__input_custom-input_checked" />
                    </span>
                    <p className="payment-method__completion_input_title">
                        Не дзвонити для підтвердження
                    </p>
                </label>
                <NavLink to="/checkout/success">
                    <SubmitButton title="Оформити замовлення" />
                </NavLink>
            </div>
        </div>
    );
};

export default PaymentMethod;
