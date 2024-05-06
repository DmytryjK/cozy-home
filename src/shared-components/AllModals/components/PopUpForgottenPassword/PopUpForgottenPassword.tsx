import { useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { useLocation } from 'react-router';
import Modal from '../../../Modal/Modal';
import { openPopUpForgottenPassword } from '../../../../store/reducers/modalsSlice';
import { userForgotPasswordRequest } from '../../../../store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import formValidation from '../../../../utils/formValidation';
import { EmailInput } from '../../../FormComponents/Inputs';
import Loader from '../../../Loaders/components/Loader';
import './PopUpForgottenPassword.scss';

interface FormValues {
    [key: string]: string;
    email: string;
}

const PopUpForgottenPassword = () => {
    const dispatch = useAppDispatch();
    const isPopUpForgottenPAsswordOpen = useAppSelector(
        (state) => state.modals.isPasswordForgotten
    );
    const { pathname } = useLocation();

    const { emailLinksError, emailLinksLoading } = useAppSelector(
        (state) => state.auth
    );
    const [isNotificationPopUpShow, setIsNotificationPopUpShow] =
        useState<boolean>(isPopUpForgottenPAsswordOpen);

    const [isSubmitedFormNotification, setIsSubmitedFormNotification] =
        useState<boolean>(true);

    useEffect(() => {
        if (emailLinksLoading === 'succeeded') {
            localStorage.setItem('resetPassLocation', pathname);
        }
    }, [emailLinksLoading]);

    const formik8 = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const fields = ['email'];

            fields.forEach((fieldName: string) => {
                const error = formValidation(fieldName, values[fieldName]);
                if (error) {
                    errors[fieldName] = error;
                }
            });

            if (isNotificationPopUpShow === false) {
                delete errors.email;
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(userForgotPasswordRequest(values.email));
        },
    });

    useEffect(() => {
        if (isPopUpForgottenPAsswordOpen === isNotificationPopUpShow) return;
        setIsNotificationPopUpShow(isPopUpForgottenPAsswordOpen);
    }, [isPopUpForgottenPAsswordOpen]);

    useEffect(() => {
        if (isNotificationPopUpShow === isPopUpForgottenPAsswordOpen) return;
        dispatch(openPopUpForgottenPassword(isNotificationPopUpShow));
    }, [isNotificationPopUpShow]);

    useEffect(() => {
        if (
            isNotificationPopUpShow === false &&
            emailLinksLoading !== 'pending'
        ) {
            formik8.resetForm();
        }
    }, [isNotificationPopUpShow]);

    useEffect(() => {
        if (emailLinksError && typeof emailLinksError === 'string') {
            formik8.setErrors({
                email: emailLinksError,
            });
        }
    }, [emailLinksError]);

    useEffect(() => {
        if (emailLinksLoading === 'succeeded') {
            setIsSubmitedFormNotification(true);
        }
    }, [emailLinksLoading]);

    return (
        <div className="forgotten-password__modal">
            <Modal
                active={isNotificationPopUpShow}
                setActive={setIsNotificationPopUpShow}
                isDataLoadedToServer={isSubmitedFormNotification}
                setisDataLoadedToServer={setIsSubmitedFormNotification}
                isSubmitedText="Готово!"
                isSubmitedSubText="Лист з посиланням на відновлення паролю вже у Вас на пошті."
                maxwidth="500px"
                minHeight="334px"
                minHeightOnSubmit="100px"
            >
                <h1 className="forgotten-password__modal-title">
                    Відновлення паролю
                </h1>

                <form
                    onSubmit={formik8.handleSubmit}
                    noValidate
                    className="forgotten-password__modal-form modal-form"
                >
                    <div className="forgotten-password__sign-in-wrapper">
                        <EmailInput
                            formik={formik8}
                            required
                            isLabelShow={false}
                            additionalClassName={`${
                                formik8.errors.email && formik8.touched.email
                                    ? 'forgotten-password__sign-in-input--error'
                                    : ''
                            }`}
                        />
                    </div>
                    {emailLinksLoading === 'pending' ? (
                        <Loader className="forgotten-password__loader" />
                    ) : (
                        ''
                    )}
                    <button
                        className="forgotten-password__sign-in-submit"
                        type="submit"
                        disabled={emailLinksLoading === 'pending'}
                    >
                        Відправити
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default PopUpForgottenPassword;
