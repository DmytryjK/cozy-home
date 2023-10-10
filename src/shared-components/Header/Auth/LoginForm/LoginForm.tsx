/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { useFormik, FormikErrors } from 'formik';
import nextId from 'react-id-generator';
import ErrorMessageValidation from '../ErrorMessageValidation/ErrorMessageValidation';
import ShowHidePusswordBtn from '../../../FormComponents/ShowHidePusswordBtn/ShowHidePusswordBtn';
import formValidation from '../../../../utils/formValidation';
import './LoginForm.scss';
import { useAppDispatch } from '../../../../hooks/hooks';
import { recoverPassword } from '../../../../store/reducers/recoverPasswordSlice';
import { setIsAuthDropdownActive } from '../../../../store/reducers/dropdownAuthSlice';
import { openPopUpForgottenPassword } from '../../../../store/reducers/modalsSlice';

interface FormValues {
    [key: string]: string;
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
            const validationFields = ['password', 'email'];

            validationFields.forEach((fieldName: string) => {
                const error = formValidation(fieldName, values[fieldName]);
                if (error) {
                    errors[fieldName] = error;
                }
            });

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
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

    const dispatch = useAppDispatch();

    function handleForgotPasswordClick() {
        dispatch(recoverPassword(true));
        dispatch(setIsAuthDropdownActive(false));
        dispatch(openPopUpForgottenPassword(true));
    }

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
                <ShowHidePusswordBtn
                    setIsPasswordHide={setIsPasswordHide}
                    isPasswordHide={isPasswordHide}
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
                <button
                    className="form-login__forgot-password"
                    type="button"
                    onClick={handleForgotPasswordClick}
                >
                    Забули пароль
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
