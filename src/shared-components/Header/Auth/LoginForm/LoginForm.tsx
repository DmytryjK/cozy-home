/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useFormik, FormikErrors } from 'formik';
import nextId from 'react-id-generator';
import ErrorMessageValidation from '../ErrorMessageValidation/ErrorMessageValidation';
import ShowHidePusswordBtn from '../../../FormComponents/ShowHidePusswordBtn/ShowHidePusswordBtn';
import formValidation from '../../../../utils/formValidation';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { openPopUpForgottenPassword } from '../../../../store/reducers/modalsSlice';
import {
    userLogIn,
    userLogOut,
    setJwtToken,
} from '../../../../store/reducers/authSlice';
import Loader from '../../../Loader';
import './LoginForm.scss';

interface FormValues {
    [key: string]: string | boolean;
    email: string;
    password: string;
    isUserRemember: boolean;
}

const LoginForm = () => {
    const [isEmailWrong, setIsEmailWrong] = useState<boolean>(false);
    const [isPasswordWrong, setIsPasswordWrong] = useState<boolean>(false);
    const [isPasswordHide, setIsPasswordHide] = useState<boolean>(true);

    const { jwtToken, loginError, loginLoading } = useAppSelector(
        (state) => state.auth
    );
    const sessionStorJwt = sessionStorage.getItem('token');
    const localStorJwt = localStorage.getItem('token');

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!jwtToken && (sessionStorJwt || localStorJwt)) {
            dispatch(setJwtToken(sessionStorJwt || localStorJwt || ''));
        }
    }, [sessionStorJwt, localStorJwt]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            isUserRemember: false,
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const validationFields = ['password', 'email'];

            validationFields.forEach((fieldName: string) => {
                if (typeof values[fieldName] === 'boolean') return;
                const error = formValidation(
                    fieldName,
                    values[fieldName] as string
                );
                if (error) {
                    errors[fieldName] = error;
                }
            });

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            dispatch(
                userLogIn({
                    email: values.email,
                    password: values.password,
                    isUserRemember: values.isUserRemember,
                    resetForm,
                })
            );
        },
    });

    useEffect(() => {
        if (loginError && typeof loginError === 'string') {
            formik.setErrors({
                email: loginError,
                password: loginError,
            });
        }
    }, [loginError]);

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

    function handleForgotPasswordClick() {
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
            {loginLoading === 'pending' ? (
                <Loader className="form-login__loader" />
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
                        name="isUserRemember"
                        onChange={formik.handleChange}
                        checked={formik.values.isUserRemember}
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
