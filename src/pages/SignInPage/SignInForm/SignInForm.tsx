import { useState, useEffect } from 'react';
import { useFormik, FormikErrors } from 'formik';
import nextId from 'react-id-generator';
import InputMask from 'react-input-mask';
import ErrorMessageValidation from '../../../shared-components/Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import './SignInForm.scss';

interface FormValues {
    firstName: string;
    lastName: string;
    birthdate: string;
    phone: string;
    password: string;
    repeatedPassword: string;
    email: string;
}

const SignInForm = () => {
    const [isPassShow, setIsPassShow] = useState<boolean>(false);
    const [isRepeatedPassShow, setIsRepeatedPassShow] =
        useState<boolean>(false);
    const formik2 = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            birthdate: '',
            phone: '',
            password: '',
            repeatedPassword: '',
            email: '',
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const requiredMessage = "Це поле обов'язкове для заповнення";
            const phoneNumberRegex = /^\+38 \(\d{3}\) \d{3} - \d{2} - \d{2}$/;

            const currentDate = values.birthdate.split('.');

            if (!values.firstName) {
                errors.firstName = requiredMessage;
            }

            if (!values.lastName) {
                errors.lastName = requiredMessage;
            }

            if (+currentDate[0] > 31) {
                errors.birthdate = 'введіть коректний день народження';
            } else if (+currentDate[1] > 12) {
                errors.birthdate = 'введіть коректний місяць народження';
            } else if (+currentDate[2] > new Date().getFullYear()) {
                errors.birthdate = 'введіть коректний рік народження';
            }

            if (values.phone === '+38 (___) ___ - __ - __') {
                errors.phone = requiredMessage;
            } else if (!phoneNumberRegex.test(values.phone)) {
                errors.phone =
                    'введіть повний номер телефону, наприклад +38 099 999 99 99';
            }

            if (!values.password) {
                errors.password = requiredMessage;
            } else if (
                !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(
                    values.password
                )
            ) {
                if (/[А-Яа-яёЁЇїІіЄєҐґ]/g.test(values.password)) {
                    errors.password = 'Використовуйте латинські літери';
                } else {
                    errors.password =
                        'Пароль має складатись з великих, малих літер та спецсимволів';
                }
            } else if (/[А-Яа-яёЁЇїІіЄєҐґ]/g.test(values.password)) {
                errors.password = 'Використовуйте латинські літери';
            }

            if (!values.repeatedPassword) {
                errors.repeatedPassword = requiredMessage;
            } else if (values.repeatedPassword !== values.password) {
                errors.repeatedPassword = 'Пароль не співпадає';
            }

            if (!values.email) {
                errors.email = requiredMessage;
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email =
                    'Введіть коректний емейл, наприклад example@domain.com';
            }

            return errors;
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form
            className="signin-form"
            onSubmit={formik2.handleSubmit}
            noValidate
        >
            <div className="signin-form__wrapper">
                <label className="signin-form__label">
                    <span>Ваше ім’я*</span>
                    <input
                        className="signin-form__input signin-form__firstName-input"
                        id={nextId('first-name')}
                        name="firstName"
                        type="text"
                        placeholder="Ім’я"
                        onChange={formik2.handleChange}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.firstName}
                        required
                    />
                </label>
                {formik2.touched.firstName && formik2.errors.firstName ? (
                    <ErrorMessageValidation
                        message={formik2.errors.firstName}
                    />
                ) : null}
            </div>
            <div className="signin-form__wrapper">
                <label className="signin-form__label">
                    <span>Ваше прізвище*</span>
                    <input
                        className="signin-form__input signin-form__lastName-input"
                        id={nextId('last-name')}
                        name="lastName"
                        type="text"
                        placeholder="Прізвище"
                        onChange={formik2.handleChange}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.lastName}
                        required
                    />
                </label>
                {formik2.touched.lastName && formik2.errors.lastName ? (
                    <ErrorMessageValidation message={formik2.errors.lastName} />
                ) : null}
            </div>
            <div className="signin-form__wrapper">
                <label className="signin-form__label">
                    <span>Дата народження</span>
                    <InputMask
                        mask="99.99.9999"
                        className="signin-form__input ssignin-form__birthday-input"
                        id={nextId('birth-date')}
                        name="birthdate"
                        onChange={formik2.handleChange}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.birthdate}
                        placeholder="дд/мм/рррр"
                        required
                    />
                </label>
                {formik2.touched.birthdate && formik2.errors.birthdate ? (
                    <ErrorMessageValidation
                        message={formik2.errors.birthdate}
                    />
                ) : null}
            </div>
            <div className="signin-form__wrapper">
                <label className="signin-form__label">
                    <span>Телефон*</span>
                    <InputMask
                        mask="+38 (999) 999 - 99 - 99"
                        className="signin-form__input signin-form__phone-input"
                        id={nextId('phone')}
                        type="phone"
                        name="phone"
                        onChange={formik2.handleChange}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.phone}
                        placeholder="+38 (___) ___ - __ - __"
                        required
                    />
                </label>
                {formik2.touched.phone && formik2.errors.phone ? (
                    <ErrorMessageValidation message={formik2.errors.phone} />
                ) : null}
            </div>
            <div className="signin-form__wrapper">
                <label className="signin-form__label">
                    <span>Пароль*</span>
                    <span className="signin-form__input-wrapper">
                        <input
                            className="signin-form__input signin-form__password-input"
                            id={nextId('password')}
                            name="password"
                            onChange={formik2.handleChange}
                            onBlur={formik2.handleBlur}
                            value={formik2.values.password}
                            type={isPassShow ? 'text' : 'password'}
                            placeholder="Пароль"
                            required
                        />
                        <button
                            className="signin-form__toggle-visible-password"
                            type="button"
                            aria-label="показати / приховати пароль"
                            title="показати / приховати пароль"
                            onClick={() => setIsPassShow(!isPassShow)}
                        />
                    </span>
                </label>
                {formik2.touched.password && formik2.errors.password ? (
                    <ErrorMessageValidation message={formik2.errors.password} />
                ) : null}
            </div>
            <div className="signin-form__wrapper">
                <label className="signin-form__label">
                    <span>Повтор пароля*</span>
                    <span className="signin-form__input-wrapper">
                        <input
                            className="signin-form__input signin-form__password-input"
                            id={nextId('repeatedPassword')}
                            name="repeatedPassword"
                            onChange={formik2.handleChange}
                            onBlur={formik2.handleBlur}
                            value={formik2.values.repeatedPassword}
                            type={isRepeatedPassShow ? 'text' : 'password'}
                            placeholder="Повтор пароля"
                            required
                        />
                        <button
                            className="signin-form__toggle-visible-password"
                            type="button"
                            aria-label="показати / приховати пароль"
                            title="показати / приховати пароль"
                            onClick={() =>
                                setIsRepeatedPassShow(!isRepeatedPassShow)
                            }
                        />
                    </span>
                </label>
                {formik2.touched.repeatedPassword &&
                formik2.errors.repeatedPassword ? (
                    <ErrorMessageValidation
                        message={formik2.errors.repeatedPassword}
                    />
                ) : null}
            </div>
            <div className="signin-form__wrapper">
                <label className="signin-form__label">
                    <span>Email*</span>
                    <input
                        className="signin-form__input signin-form__email-input"
                        id={nextId('email')}
                        name="email"
                        onChange={formik2.handleChange}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.email}
                        type="email"
                        placeholder="example@gmail.com"
                        required
                    />
                </label>
                {formik2.touched.email && formik2.errors.email ? (
                    <ErrorMessageValidation message={formik2.errors.email} />
                ) : null}
            </div>
            <div className="signin-form__wrapper_checkbox">
                <label
                    className="signin-form__email-label"
                    htmlFor="signin-form__checkbox"
                >
                    <input
                        className="signin-form__checkbox"
                        id="signin-form__checkbox"
                        type="checkbox"
                    />
                    <span className="signin-form__checkbox_custom" />
                    <span>Отримувати повідомлення про знижки та акції</span>
                </label>
            </div>
            <button className="signin-form__submit" type="submit">
                Зареєструватися
            </button>
        </form>
    );
};

export default SignInForm;
