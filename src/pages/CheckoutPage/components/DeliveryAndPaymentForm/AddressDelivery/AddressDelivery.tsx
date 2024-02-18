import { useEffect, useCallback } from 'react';
import { useFormik, FormikErrors } from 'formik';
import nextId from 'react-id-generator';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import SubmitButton from '../../../shared-components/SubmitButton/SubmitButton';
import ErrorMessageValidation from '../../../../../shared-components/Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import { useAppDispatch } from '../../../../../hooks/hooks';
import { setDeliveryInfo } from '../../../../../store/reducers/orderSlice';
import type { OrderData } from '../../../../../types/types';
import debounce from '../../../../../utils/debounce';
import Loader from '../../../../../shared-components/Loader';
import './AddressDelivery.scss';

interface FormValues {
    city: string;
    house: string;
    street: string;
    apartment: string;
    comment: string;
    paymentMethod: string;
    callNeeded: boolean;
}

const AddressDelivery = ({
    isResetAddress,
    handleSubmitOrderForm,
    animationClass,
}: {
    isResetAddress?: boolean;
    handleSubmitOrderForm: () => void;
    animationClass: string;
}) => {
    const dispatch = useAppDispatch();

    const localOrderData: OrderData | null = JSON.parse(
        localStorage.getItem('orderData') || JSON.stringify(null)
    );

    const debouncedUpdateOrderDelivery = useCallback(
        debounce((values) => {
            dispatch(setDeliveryInfo({ ...values }));
        }, 800),
        []
    );

    const formik5 = useFormik({
        initialValues: {
            city: localOrderData?.delivery?.city || '',
            house: localOrderData?.delivery?.house || '',
            street: localOrderData?.delivery?.street || '',
            apartment: localOrderData?.delivery?.apartment || '',
            comment: localOrderData?.delivery?.comment || '',
            paymentMethod: localOrderData?.delivery?.paymentMethod || 'CARD',
            callNeeded: true,
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const requiredMessage = "Це поле обов'язкове для заповнення";

            if (!values.city) {
                errors.city = requiredMessage;
            }

            if (!values.house) {
                errors.house = requiredMessage;
            }

            if (!values.street) {
                errors.street = requiredMessage;
            }

            if (!values.apartment) {
                errors.apartment = requiredMessage;
            }
            debouncedUpdateOrderDelivery(values);
            return errors;
        },
        onSubmit: (values, { resetForm }) => {
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

    useEffect(() => {
        if (isResetAddress) {
            formik5.resetForm();
        }
    }, [isResetAddress]);

    return (
        <form
            className="customer-form"
            onSubmit={formik5.handleSubmit}
            noValidate
        >
            <label className="customer-form__item">
                <p>Місто*</p>
                <input
                    className="customer-form__item_input"
                    id={nextId('city')}
                    name="city"
                    type="text"
                    placeholder="Ваше місто"
                    onChange={formik5.handleChange}
                    onBlur={formik5.handleBlur}
                    value={formik5.values.city}
                    required
                />
                {formik5.touched.city && formik5.errors.city ? (
                    <ErrorMessageValidation message={formik5.errors.city} />
                ) : null}
            </label>
            <label className="customer-form__item">
                <p>Будинок*</p>
                <input
                    className="customer-form__item_input"
                    id={nextId('house')}
                    name="house"
                    type="text"
                    placeholder="Ваш будинок"
                    onChange={formik5.handleChange}
                    onBlur={formik5.handleBlur}
                    value={formik5.values.house}
                    required
                />
                {formik5.touched.house && formik5.errors.house ? (
                    <ErrorMessageValidation message={formik5.errors.house} />
                ) : null}
            </label>
            <label className="customer-form__item">
                <p>Вулиця*</p>
                <input
                    className="customer-form__item_input"
                    id={nextId('street')}
                    name="street"
                    type="text"
                    placeholder="Ваша вулиця"
                    onChange={formik5.handleChange}
                    onBlur={formik5.handleBlur}
                    value={formik5.values.street}
                    required
                />
                {formik5.touched.street && formik5.errors.street ? (
                    <ErrorMessageValidation message={formik5.errors.street} />
                ) : null}
            </label>
            <label className="customer-form__item">
                <p>Квартира*</p>
                <input
                    className="customer-form__item_input"
                    id={nextId('apartment')}
                    name="apartment"
                    type="text"
                    placeholder="Ваша квартира"
                    onChange={formik5.handleChange}
                    onBlur={formik5.handleBlur}
                    value={formik5.values.apartment}
                    required
                />
                {formik5.touched.apartment && formik5.errors.apartment ? (
                    <ErrorMessageValidation
                        message={formik5.errors.apartment}
                    />
                ) : null}
            </label>
            <PaymentMethod
                inputName="paymentMethod"
                selectedValue={formik5.values.paymentMethod}
                onChange={(value) => {
                    formik5.setFieldValue('paymentMethod', value);
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
                        value={formik5.values.comment}
                        rows={6}
                        onChange={formik5.handleChange}
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
                            checked={formik5.values.callNeeded === false}
                            onChange={() => {
                                formik5.setFieldValue(
                                    'callNeeded',
                                    !formik5.values.callNeeded
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

AddressDelivery.defaultProps = {
    isResetAddress: false,
};

export default AddressDelivery;
