import { useCallback } from 'react';
import { useFormik, FormikErrors } from 'formik';
import nextId from 'react-id-generator';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import SubmitButton from '../../../shared-components/SubmitButton/SubmitButton';
import ErrorMessageValidation from '../../../../../shared-components/Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import CustomSelect from '../../../../../shared-components/FormComponents/CustomSelect/CustomSelect';
import { useAppDispatch } from '../../../../../hooks/hooks';
import { setDeliveryInfo } from '../../../../../store/reducers/orderSlice';
import debounce from '../../../../../utils/debounce';
import type { OrderData } from '../../../../../types/types';
import './CompanyDelivery.scss';

interface FormValues {
    deliveryCompanyName: string;
    region: string;
    city: string;
    postOffice: string;
    paymentMethod: string;
    comment: string;
    callNeeded: boolean;
}

const CompanyDelivery = ({
    handleSubmitOrderForm,
    animationClass,
}: {
    handleSubmitOrderForm: () => void;
    animationClass: string;
}) => {
    const dispatch = useAppDispatch();
    const deliveryOptions = [
        {
            title: 'Укрпошта',
            fieldName: 'ukrposhta',
        },
        {
            title: 'Нова пошта',
            fieldName: 'navaposhta',
        },
        {
            title: 'Meest',
            fieldName: 'meest',
        },
        {
            title: 'Автолюкс',
            fieldName: 'autolux',
        },
        {
            title: 'Делівері',
            fieldName: 'delivery',
        },
    ];
    const postalOptions = [
        {
            title: 'Відділення 1',
            fieldName: '1',
        },
        {
            title: 'Відділення 2',
            fieldName: '2',
        },
        {
            title: 'Відділення 3',
            fieldName: '3',
        },
        {
            title: 'Відділення 4',
            fieldName: '4',
        },
        {
            title: 'Відділення 5',
            fieldName: '5',
        },
    ];

    const localOrderData: OrderData | null = JSON.parse(
        localStorage.getItem('orderData') || JSON.stringify(null)
    );

    const debouncedUpdateOrderDelivery = useCallback(
        debounce((values) => {
            dispatch(setDeliveryInfo({ ...values }));
        }, 800),
        []
    );

    const formik4 = useFormik({
        initialValues: {
            deliveryCompanyName:
                localOrderData?.delivery?.deliveryCompanyName || '',
            region: localOrderData?.delivery?.region || '',
            city: localOrderData?.delivery?.city || '',
            postOffice: localOrderData?.delivery?.postOffice || '',
            paymentMethod: localOrderData?.delivery?.paymentMethod || 'CARD',
            comment: localOrderData?.delivery?.comment || '',
            callNeeded: true,
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const requiredMessage = "Це поле обов'язкове для заповнення";

            if (!values.deliveryCompanyName) {
                errors.deliveryCompanyName = requiredMessage;
            }

            if (!values.region) {
                errors.region = requiredMessage;
            }

            if (!values.city) {
                errors.city = requiredMessage;
            }

            if (!values.postOffice) {
                errors.postOffice = requiredMessage;
            }
            debouncedUpdateOrderDelivery(values);
            return errors;
        },
        onSubmit: (values) => {
            dispatch(
                setDeliveryInfo({
                    ...values,
                })
            );
            setTimeout(() => {
                handleSubmitOrderForm();
            }, 100);
        },
    });

    return (
        <form
            className="customer-form"
            noValidate
            onSubmit={formik4.handleSubmit}
        >
            <div className="customer-form__item">
                <p>Поштовий сервіс*</p>
                <CustomSelect
                    selectFields={deliveryOptions}
                    defaulTitle="Оберіть"
                    selectNameOptions="deliveryCompanyName"
                    selectedValue={formik4.values.deliveryCompanyName}
                    onChange={(value) => {
                        formik4.setFieldValue('deliveryCompanyName', value);
                    }}
                />
                {formik4.touched.deliveryCompanyName &&
                formik4.errors.deliveryCompanyName ? (
                    <ErrorMessageValidation
                        message={formik4.errors.deliveryCompanyName}
                    />
                ) : null}
            </div>
            <label className="customer-form__item">
                <p>Область*</p>
                <input
                    className="customer-form__item_input"
                    id={nextId('region')}
                    name="region"
                    type="text"
                    placeholder="Ваша область"
                    onChange={formik4.handleChange}
                    onBlur={formik4.handleBlur}
                    value={formik4.values.region}
                    required
                />
                {formik4.touched.region && formik4.errors.region ? (
                    <ErrorMessageValidation message={formik4.errors.region} />
                ) : null}
            </label>
            <label className="customer-form__item">
                <p>Місто*</p>
                <input
                    className="customer-form__item_input"
                    id={nextId('city')}
                    name="city"
                    type="text"
                    placeholder="Ваше місто"
                    onChange={formik4.handleChange}
                    onBlur={formik4.handleBlur}
                    value={formik4.values.city}
                    required
                />
                {formik4.touched.city && formik4.errors.city ? (
                    <ErrorMessageValidation message={formik4.errors.city} />
                ) : null}
            </label>
            <div className="customer-form__item">
                <p>Відділення*</p>
                <CustomSelect
                    selectFields={postalOptions}
                    defaulTitle="Оберіть"
                    selectNameOptions="postOffice"
                    selectedValue={formik4.values.postOffice}
                    onChange={(value) => {
                        formik4.setFieldValue('postOffice', value);
                    }}
                />
                {formik4.touched.postOffice && formik4.errors.postOffice ? (
                    <ErrorMessageValidation
                        message={formik4.errors.postOffice}
                    />
                ) : null}
            </div>
            <PaymentMethod
                inputName="paymentMethod"
                selectedValue={formik4.values.paymentMethod}
                onChange={(value) => {
                    formik4.setFieldValue('paymentMethod', value);
                }}
            />
            <div className="payment-method__comment">
                <label className="payment-method__comment_label">
                    <p className="payment-method__comment_label_title">
                        Коментар
                    </p>
                    <textarea
                        placeholder="Ваш коментар"
                        className="payment-method__comment_label_text"
                        name="comment"
                        value={formik4.values.comment}
                        rows={6}
                        onChange={formik4.handleChange}
                    />
                </label>
            </div>
            <div className="customer-form__bottom">
                <div className="payment-method__completion">
                    <label className="filter__label">
                        <input
                            className="filter__input"
                            type="checkbox"
                            name="callNeeded"
                            checked={formik4.values.callNeeded === false}
                            onChange={() => {
                                formik4.setFieldValue(
                                    'callNeeded',
                                    !formik4.values.callNeeded
                                );
                            }}
                        />
                        <span className="filter__input_custom-input">
                            <span className="filter__input_custom-input_default" />
                            <span className="filter__input_custom-input_checked" />
                        </span>
                        <p className="payment-method__completion_input_title">
                            Не дзвонити для підтвердження
                        </p>
                    </label>
                </div>
                <div className="button-wrapper">
                    <SubmitButton
                        title="Оформити замовлення"
                        className={animationClass}
                    />
                </div>
            </div>
        </form>
    );
};

export default CompanyDelivery;
