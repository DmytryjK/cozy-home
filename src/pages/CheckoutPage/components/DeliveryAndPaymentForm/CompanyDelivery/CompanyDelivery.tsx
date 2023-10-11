import { useState } from 'react';
import { useFormik, FormikErrors } from 'formik';
import { useNavigate } from 'react-router';
import nextId from 'react-id-generator';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import SubmitButton from '../../../shared-components/SubmitButton/SubmitButton';
import ErrorMessageValidation from '../../../../../shared-components/Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import CustomSelect from '../../../../../shared-components/FormComponents/CustomSelect/CustomSelect';
import './CompanyDelivery.scss';

interface FormValues {
    postalService: string;
    region: string;
    city: string;
    postalOfficeNumber: string;
    paymentMethod: string;
    comment: string;
    callNeeded: boolean;
}

const CompanyDelivery = () => {
    const navigate = useNavigate();

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
            title: '1',
            fieldName: '1',
        },
        {
            title: '2',
            fieldName: '2',
        },
        {
            title: '3',
            fieldName: '3',
        },
        {
            title: '4',
            fieldName: '4',
        },
        {
            title: '5',
            fieldName: '5',
        },
    ];

    const formik4 = useFormik({
        initialValues: {
            postalService: '',
            region: '',
            city: '',
            postalOfficeNumber: '',
            paymentMethod: 'На карту',
            comment: '',
            callNeeded: true,
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const requiredMessage = "Це поле обов'язкове для заповнення";

            if (!values.postalService) {
                errors.postalService = requiredMessage;
            }

            if (!values.region) {
                errors.region = requiredMessage;
            }

            if (!values.city) {
                errors.city = requiredMessage;
            }

            if (!values.postalOfficeNumber) {
                errors.postalOfficeNumber = requiredMessage;
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            navigate('/checkout/success');
            resetForm();
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
                    selectNameOptions="postalService"
                    selectedValue={formik4.values.postalService}
                    onChange={(value) => {
                        formik4.setFieldValue('postalService', value);
                    }}
                />
                {formik4.touched.postalService &&
                formik4.errors.postalService ? (
                    <ErrorMessageValidation
                        message={formik4.errors.postalService}
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
                    selectNameOptions="postalOfficeNumber"
                    selectedValue={formik4.values.postalOfficeNumber}
                    onChange={(value) => {
                        formik4.setFieldValue('postalOfficeNumber', value);
                    }}
                />
                {formik4.touched.postalOfficeNumber &&
                formik4.errors.postalOfficeNumber ? (
                    <ErrorMessageValidation
                        message={formik4.errors.postalOfficeNumber}
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
                    <SubmitButton title="Оформити замовлення" />
                </div>
            </div>
        </form>
    );
};

export default CompanyDelivery;
