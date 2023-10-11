import { useFormik, FormikErrors } from 'formik';
import { useNavigate } from 'react-router';
import nextId from 'react-id-generator';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import SubmitButton from '../../../shared-components/SubmitButton/SubmitButton';
import ErrorMessageValidation from '../../../../../shared-components/Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import './AddressDelivery.scss';

interface FormValues {
    city: string;
    houseNumber: string;
    street: string;
    flat: string;
    comment: string;
    paymentMethod: string;
    callNeeded: boolean;
}

const AddressDelivery = () => {
    const navigate = useNavigate();

    const formik5 = useFormik({
        initialValues: {
            city: '',
            houseNumber: '',
            street: '',
            flat: '',
            comment: '',
            paymentMethod: 'На карту',
            callNeeded: true,
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const requiredMessage = "Це поле обов'язкове для заповнення";

            if (!values.city) {
                errors.city = requiredMessage;
            }

            if (!values.houseNumber) {
                errors.houseNumber = requiredMessage;
            }

            if (!values.street) {
                errors.street = requiredMessage;
            }

            if (!values.flat) {
                errors.flat = requiredMessage;
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
                    id={nextId('houseNumber')}
                    name="houseNumber"
                    type="text"
                    placeholder="Ваш будинок"
                    onChange={formik5.handleChange}
                    onBlur={formik5.handleBlur}
                    value={formik5.values.houseNumber}
                    required
                />
                {formik5.touched.houseNumber && formik5.errors.houseNumber ? (
                    <ErrorMessageValidation
                        message={formik5.errors.houseNumber}
                    />
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
                    id={nextId('flat')}
                    name="flat"
                    type="text"
                    placeholder="Ваша квартира"
                    onChange={formik5.handleChange}
                    onBlur={formik5.handleBlur}
                    value={formik5.values.flat}
                    required
                />
                {formik5.touched.flat && formik5.errors.flat ? (
                    <ErrorMessageValidation message={formik5.errors.flat} />
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
                    <SubmitButton title="Оформити замовлення" />
                </div>
            </div>
        </form>
    );
};

export default AddressDelivery;
