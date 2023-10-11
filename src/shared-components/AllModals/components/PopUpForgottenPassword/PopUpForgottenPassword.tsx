import { useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import nextId from 'react-id-generator';
import Modal from '../../../Modal/Modal';
import { openPopUpForgottenPassword } from '../../../../store/reducers/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import './PopUpForgottenPassword.scss';
import ErrorMessageValidation from '../../../Header/Auth/ErrorMessageValidation/ErrorMessageValidation';

interface FormValues {
    email: string;
}

const PopUpForgottenPassword = () => {
    const MAX_QUANTITY_OF_CHARS = 300;
    const dispatch = useAppDispatch();
    const isPopUpOpenStore = useAppSelector(
        (state) => state.modals.isPasswordForgotten
    );
    const [isNotificationPopUpShow, setIsNotificationPopUpShow] =
        useState<boolean>(isPopUpOpenStore);
    const [currentTextAtCommentField, setCurrentTextAtCommentField] =
        useState<string>('');
    const [isLimitCharClassActive, setIsLimitCharClassActive] =
        useState<boolean>(false);

    const [isSubmitedFormNotification, setIsSubmitedFormNotification] =
        useState<boolean>(false);

    useEffect(() => {
        if (isPopUpOpenStore === isNotificationPopUpShow) return;
        setIsNotificationPopUpShow(isPopUpOpenStore);
    }, [isPopUpOpenStore]);

    useEffect(() => {
        if (isNotificationPopUpShow === isPopUpOpenStore) return;
        dispatch(openPopUpForgottenPassword(isNotificationPopUpShow));
    }, [isNotificationPopUpShow]);

    useEffect(() => {
        if (currentTextAtCommentField.length === MAX_QUANTITY_OF_CHARS) {
            setIsLimitCharClassActive(true);
        } else {
            setIsLimitCharClassActive(false);
        }
    }, [currentTextAtCommentField]);

    const [isEmailWrong, setIsEmailWrong] = useState<boolean>(false);
    const [notRegisteredError, setNotRegisteredError] =
        useState<boolean>(false);

    const formik6 = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const requiredMessage = "Це поле обов'язкове для заповнення";

            if (!values.email) {
                errors.email = requiredMessage;
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email =
                    'Введіть коректний емейл, наприклад example@domain.com';
            }

            if (notRegisteredError) {
                errors.email = 'Даний email не зареєстрований';
            }

            return errors;
        },
        onSubmit: () => {
            setIsSubmitedFormNotification(true);
        },
    });

    useEffect(() => {
        if (formik6.errors.email && formik6.touched.email) {
            setIsEmailWrong(true);
        } else {
            setIsEmailWrong(false);
        }
    }, [formik6.errors.email, formik6.touched]);

    return (
        <div className="forgotten-password__modal">
            <Modal
                active={isNotificationPopUpShow}
                setActive={setIsNotificationPopUpShow}
                isDataLoadedToServer={isSubmitedFormNotification}
                setisDataLoadedToServer={setIsSubmitedFormNotification}
                isSubmitedText="Готово!"
                isSubmitedSubText="Лист із новим паролем вже у Вас на пошті."
                maxwidth="500px"
                minHeightOnSubmit="100px"
            >
                <h1 className="forgotten-password__modal-title">
                    Відновлення паролю
                </h1>

                <form
                    onSubmit={formik6.handleSubmit}
                    // className="form-login"
                    // noValidate
                    className="forgotten-password__modal-form modal-form"
                >
                    <div className="forgotten-password__sign-in-wrapper">
                        <label className="forgotten-password__sign-in-label">
                            <input
                                className={`forgotten-password__sign-in-input forgotten-password__sign-in-email-input 
                                    ${
                                        formik6.errors.email
                                            ? 'forgotten-password__sign-in-input--error'
                                            : ''
                                    }`}
                                id={nextId('email')}
                                name="email"
                                onChange={formik6.handleChange}
                                onBlur={formik6.handleBlur}
                                value={formik6.values.email}
                                type="email"
                                placeholder="Ваш Email*"
                                required
                            />
                        </label>
                        {formik6.touched.email && formik6.errors.email ? (
                            <ErrorMessageValidation
                                message={formik6.errors.email}
                            />
                        ) : null}
                    </div>
                    <button
                        className="forgotten-password__sign-in-submit"
                        type="submit"
                    >
                        Відправити
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default PopUpForgottenPassword;
