import { useEffect, useState } from 'react';
import AddressDelivery from './AddressDelivery/AddressDelivery';
import CompanyDelivery from './CompanyDelivery/CompanyDelivery';
import './DeliveryAndPaymentForm.scss';

export interface DeliveryOption {
    id: string;
    label: string;
    description: string;
}

export interface DeliveryCompany {
    id: number;
    title: string;
    value: string;
}

export const deliveryOptions: DeliveryOption[] = [
    {
        id: 'postal-delivery',
        label: 'Доставка у відділення',
        description:
            'Швидкий та надійний спосіб отримання замовлень. Наша послуга "Доставка у відділення" пропонує зручний спосіб отримати ваші покупки.',
    },
    {
        id: 'address-delivery',
        label: 'Адресна доставка',
        description:
            'Отримайте ваші замовлення прямо до дверей. Наша послуга "Адресна доставка" дозволяє зручно отримувати товари безпосередньо на вашу адресу.',
    },
];

type Props = {
    selectedDeliveryOption: string;
    setSelectedDeliveryOption: React.Dispatch<React.SetStateAction<string>>;
};

const DeliveryAndPaymentForm = (props: Props) => {
    const { selectedDeliveryOption, setSelectedDeliveryOption } = props;
    const [selectedDeliveryName, setSelectedDeliveryName] =
        useState<string>('');

    const handleOptionChange = (optionId: string) => {
        setSelectedDeliveryOption(optionId);
    };

    return (
        <>
            <div className="delivery-payment-block">
                <div className="delivery-payment-block__options">
                    {deliveryOptions.map((option) => (
                        <div
                            key={option.id}
                            className="delivery-payment-block__options_option"
                        >
                            <label className="delivery-payment-block__options_option_label">
                                <input
                                    type="radio"
                                    name="deliveryOption"
                                    value={option.id}
                                    checked={
                                        selectedDeliveryOption === option.id
                                    }
                                    onChange={() => {
                                        handleOptionChange(option.id);
                                        setSelectedDeliveryName(option.label);
                                    }}
                                    className="delivery-payment-block__options_option_label_input"
                                />
                                {option.label}
                            </label>
                            <p className="delivery-payment-block__options_option_description">
                                {option.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="delivery-payment-block__form">
                {selectedDeliveryOption === 'postal-delivery' ? (
                    <CompanyDelivery />
                ) : (
                    <AddressDelivery />
                )}
            </div>
        </>
    );
};

export default DeliveryAndPaymentForm;
