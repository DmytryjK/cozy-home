import { useState, useEffect } from 'react';
import './PaymentMethod.scss';

type Props = {
    inputName: string;
    selectedValue: string;
    onChange: (value: string) => void;
};

export interface PaymentMethodInterface {
    id: string;
    label: string;
}

export const paymentMethodList: PaymentMethodInterface[] = [
    {
        id: 'cart',
        label: 'На карту',
    },
    {
        id: 'iban',
        label: 'На розрахунковий рахунок',
    },
    {
        id: 'cash',
        label: 'Готівкою при отриманні',
    },
];

const PaymentMethod = (props: Props) => {
    const { inputName, selectedValue, onChange } = props;
    const [selectedPaymentOption, setSelectedPaymentOption] =
        useState<string>(selectedValue);

    useEffect(() => {
        onChange(selectedPaymentOption);
    }, [selectedPaymentOption]);

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
                            name={inputName}
                            value={selectedPaymentOption}
                            checked={selectedPaymentOption === option.label}
                            onChange={() =>
                                setSelectedPaymentOption(option.label)
                            }
                            className="delivery-payment-block__options_option_label_input"
                        />
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default PaymentMethod;
