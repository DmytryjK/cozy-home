import { useState } from 'react';
import { useFormik, FormikErrors } from 'formik';
import nextId from 'react-id-generator';
import InputMask from 'react-input-mask';
import ErrorMessageValidation from '../../../shared-components/Header/Auth/ErrorMessageValidation/ErrorMessageValidation';
import ShowHidePusswordBtn from '../../../shared-components/FormComponents/ShowHidePusswordBtn/ShowHidePusswordBtn';
import formValidation from '../../../utils/formValidation';
import {
    FirstNameInput,
    LastNameInput,
    EmailInput,
    PasswordInput,
    PhoneNumberInput,
} from '../../../shared-components/FormComponents/Inputs';
import './SignInForm.scss';

interface FormValues {
    [key: string]: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    phone: string;
    password: string;
    repeatedPassword: string;
    email: string;
}

const SignInForm = () => {
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
            const currentDate = values.birthdate.split('.');

            const validationFields = [
                'firstName',
                'lastName',
                'phone',
                'password',
                'email',
            ];

            validationFields.forEach((fieldName: string) => {
                const error = formValidation(fieldName, values[fieldName]);
                if (error) {
                    errors[fieldName] = error;
                }
            });

            if (currentDate[0] !== '') {
                if (+currentDate[0] > 31 || +currentDate[0] < 1) {
                    errors.birthdate = 'введіть коректний день народження';
                } else if (+currentDate[1] > 12 || +currentDate[1] < 1) {
                    errors.birthdate = 'введіть коректний місяць народження';
                } else if (
                    +currentDate[2] > new Date().getFullYear() ||
                    +currentDate[2] < 1900
                ) {
                    errors.birthdate = 'введіть коректний рік народження';
                }

                if (!values.repeatedPassword) {
                    errors.repeatedPassword = requiredMessage;
                } else if (values.repeatedPassword !== values.password) {
                    errors.repeatedPassword = 'Пароль не співпадає';
                }
            }

            if (!values.repeatedPassword) {
                errors.repeatedPassword = requiredMessage;
            } else if (values.repeatedPassword !== values.password) {
                errors.repeatedPassword = 'Пароль не співпадає';
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
        },
    });
    return (
        <form
            className="signin-form"
            onSubmit={formik2.handleSubmit}
            noValidate
        >
            <FirstNameInput formik={formik2} />
            <LastNameInput formik={formik2} />
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
            <PhoneNumberInput formik={formik2} />
            <PasswordInput formik={formik2} />
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
                            autoComplete="new-password"
                            required
                        />
                        <ShowHidePusswordBtn
                            setIsPasswordHide={setIsRepeatedPassShow}
                            isPasswordHide={isRepeatedPassShow}
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
            <EmailInput formik={formik2} />
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
