import { useState, useEffect } from 'react';
import { useFormik, FormikErrors } from 'formik';
import nextId from 'react-id-generator';
import ErrorMessageValidation from '../ErrorMessageValidation/ErrorMessageValidation';
import './LoginForm.scss';

interface FormValues {
    email: string;
    password: string;
}

const LoginForm = () => {
    const [isEmailWrong, setIsEmailWrong] = useState<boolean>(false);
    const [isPasswordWrong, setIsPasswordWrong] = useState<boolean>(false);
    const [isPasswordHide, setIsPasswordHide] = useState<boolean>(true);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};

            if (!values.email) {
                errors.email = 'Необхідно заповнити поле Email';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email =
                    'Введіть коректний емейл, наприклад example@domain.com';
            }

            if (!values.password) {
                errors.password = 'Необхідно заповнити поле Пароль';
            } else if (
                !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{4,}/g.test(
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
            } else if (values.password.length < 8) {
                errors.password = 'Мін. довжина - 8 символів';
            } else if (/\s/g.test(values.password)) {
                errors.password = 'Пароль не має містити пробілів';
            }

            return errors;
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    useEffect(() => {
        if (formik.errors.email && formik.touched.email) {
            setIsEmailWrong(true);
        } else {
            setIsEmailWrong(false);
        }

        if (formik.errors.password && formik.touched.password) {
            setIsPasswordWrong(true);
        } else {
            setIsPasswordWrong(false);
        }
    }, [formik.errors.password, formik.errors.email, formik.touched]);

    return (
        <form onSubmit={formik.handleSubmit} className="form-login" noValidate>
            <label className="form-login__label-email">
                <input
                    className={`form-login__input-email ${
                        isEmailWrong ? 'input_wrong' : ''
                    }`}
                    id={nextId('login-email')}
                    name="email"
                    type="email"
                    placeholder="Email*"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    autoComplete="off"
                    required
                />
            </label>
            {formik.touched.email && formik.errors.email ? (
                <ErrorMessageValidation message={formik.errors.email} />
            ) : null}
            <label className="form-login__label-password">
                <input
                    className={`form-login__input-password ${
                        isPasswordWrong ? 'input_wrong' : ''
                    }`}
                    id={nextId('login-password')}
                    name="password"
                    type={isPasswordHide ? 'password' : 'text'}
                    placeholder="Пароль*"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    autoComplete="off"
                    required
                />
                <button
                    className="form-login__toggle-visible-password"
                    type="button"
                    aria-label="показати / приховати пароль"
                    title="показати / приховати пароль"
                    onClick={() => setIsPasswordHide(!isPasswordHide)}
                />
            </label>
            {formik.touched.password && formik.errors.password ? (
                <ErrorMessageValidation message={formik.errors.password} />
            ) : null}
            <div className="form-login__additional-options">
                <label className="form-login__remember-user">
                    <input
                        className="form-login__remember-checkbox"
                        type="checkbox"
                    />
                    <span className="form-login__custom-checkbox" />
                    <span>Запам’ятати мене</span>
                </label>
                <button className="form-login__forgot-password" type="button">
                    Забули пароль?
                </button>
            </div>
            <div className="form-login__bottom-nav">
                <button className="form-login__submit" type="submit">
                    Увійти
                </button>
                <a className="form-login__register-link" href="/signin">
                    Зареєструватись
                </a>
            </div>
        </form>
    );
};

export default LoginForm;
