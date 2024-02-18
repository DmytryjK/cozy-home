import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AddressDelivery from './AddressDelivery/AddressDelivery';
import CompanyDelivery from './CompanyDelivery/CompanyDelivery';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import './DeliveryAndPaymentForm.scss';
import {
    setDeliveryInfo,
    makeOrder,
    resetOrderFormData,
} from '../../../../store/reducers/orderSlice';
import type { OrderData } from '../../../../types/types';

export interface DeliveryOption {
    id: string;
    label: string;
    description: string;
    value: string;
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
        value: 'postal-delivery',
    },
    {
        id: 'address-delivery',
        label: 'Адресна доставка',
        description:
            'Отримайте ваші замовлення прямо до дверей. Наша послуга "Адресна доставка" дозволяє зручно отримувати товари безпосередньо на вашу адресу.',
        value: 'address-delivery',
    },
];

type Props = {
    selectedDeliveryOption: string;
    setSelectedDeliveryOption: React.Dispatch<React.SetStateAction<string>>;
};

const DeliveryAndPaymentForm = (props: Props) => {
    const { selectedDeliveryOption, setSelectedDeliveryOption } = props;
    const localOrderData: OrderData | null = JSON.parse(
        localStorage.getItem('orderData') || JSON.stringify(null)
    );
    const { loading, error, orderNumber } = useAppSelector(
        (state) => state.order
    );
    const [selectedDeliveryName, setSelectedDeliveryName] =
        useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading === 'succeeded' && orderNumber) {
            dispatch(resetOrderFormData());
            navigate('/checkout/success');
        }
    }, [loading, error, orderNumber]);

    useEffect(() => {
        if (localOrderData?.delivery?.deliveryType) {
            setSelectedDeliveryOption(localOrderData.delivery.deliveryType);
        }
    }, []);

    const handleOptionChange = (optionValue: string) => {
        dispatch(
            setDeliveryInfo({
                deliveryType: optionValue,
                deliveryCompanyName: '',
                region: '',
                city: '',
                postOffice: '',
                house: '',
                street: '',
                apartment: '',
            })
        );
        setTimeout(() => {
            setSelectedDeliveryOption(optionValue);
        }, 50);
    };

    const handleSubmitOrderForm = () => {
        dispatch(makeOrder());
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
                                    value={option.value}
                                    checked={
                                        selectedDeliveryOption === option.id
                                    }
                                    onChange={() => {
                                        handleOptionChange(option.value);
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
                    <CompanyDelivery
                        handleSubmitOrderForm={handleSubmitOrderForm}
                        animationClass={`${
                            loading === 'pending' ? 'loading' : ''
                        }`}
                    />
                ) : (
                    <AddressDelivery
                        handleSubmitOrderForm={handleSubmitOrderForm}
                        animationClass={`${
                            loading === 'pending' ? 'loading' : ''
                        }`}
                    />
                )}
            </div>
        </>
    );
};

export default DeliveryAndPaymentForm;
