import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { FormikErrors, useFormik } from 'formik';
import Modal from '../../../Modal/Modal';
import { openPopUpCreateNewPassword } from '../../../../store/reducers/modalsSlice';
import { userResetPassword } from '../../../../store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import formValidation from '../../../../utils/formValidation';
import { PasswordInput } from '../../../FormComponents/Inputs';
import Loader from '../../../Loader';
import './PopUpCreateNewPassword.scss';

interface FormValues {
    [key: string]: string;
    password: string;
}

const PopUpCreateNewPassword = () => {
    const dispatch = useAppDispatch();
    const { search } = useLocation();
    const resetToken = search.replace('?resetPasswordToken=', '');

    const { isCreateNewPasswordOpen } = useAppSelector((state) => state.modals);

    const { newPasswordError, newPasswordLoading } = useAppSelector(
        (state) => state.auth
    );
    const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(
        isCreateNewPasswordOpen
    );
    const [isPasswordLoadetToServer, setIsPasswordLoadetToServer] =
        useState<boolean>(false);

    const formik9 = useFormik({
        initialValues: {
            password: '',
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const fields = ['password'];

            fields.forEach((fieldName: string) => {
                const error = formValidation(fieldName, values[fieldName]);
                if (error) {
                    errors[fieldName] = error;
                }
            });

            if (isPopUpOpen === false) {
                delete errors.password;
            }
            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            if (resetToken) {
                dispatch(
                    userResetPassword({
                        resetPasswordToken: resetToken,
                        password: values.password,
                        resetForm,
                    })
                );
            }
        },
    });

    useEffect(() => {
        if (isPopUpOpen === isCreateNewPasswordOpen) return;
        dispatch(openPopUpCreateNewPassword(isPopUpOpen));
    }, [isPopUpOpen]);

    useEffect(() => {
        if (isPopUpOpen === isCreateNewPasswordOpen) return;
        setIsPopUpOpen(isCreateNewPasswordOpen);
    }, [isCreateNewPasswordOpen]);

    useEffect(() => {
        if (isPopUpOpen === false && newPasswordLoading !== 'pending') {
            formik9.resetForm();
        }
    }, [isPopUpOpen]);

    useEffect(() => {
        if (newPasswordError && typeof newPasswordError === 'string') {
            formik9.setErrors({
                password: newPasswordError,
            });
        }
    }, [newPasswordError]);

    useEffect(() => {
        if (newPasswordLoading === 'succeeded') {
            setIsPasswordLoadetToServer(true);
        }
    }, [newPasswordLoading]);

    return (
        <Modal
            active={isPopUpOpen}
            setActive={setIsPopUpOpen}
            isDataLoadedToServer={isPasswordLoadetToServer}
            setisDataLoadedToServer={setIsPasswordLoadetToServer}
            isSubmitedText="Готово!"
            isSubmitedSubText="Новий пароль збережений на сайті."
            maxwidth="500px"
            minHeight="334px"
            minHeightOnSubmit="100px"
        >
            <h1 className="create-password__title">Введіть новий пароль</h1>

            <form
                onSubmit={formik9.handleSubmit}
                noValidate
                className="create-password__form"
            >
                <PasswordInput
                    formik={formik9}
                    isLabelShow={false}
                    additionalClassName={`${
                        formik9.errors.password && formik9.touched.password
                            ? 'create-password__incorrect-password'
                            : ''
                    }`}
                />
                {newPasswordLoading === 'pending' ? (
                    <Loader className="create-password__loader" />
                ) : (
                    ''
                )}
                <button
                    className="create-password__submit"
                    type="submit"
                    disabled={newPasswordLoading === 'pending'}
                >
                    Зберегти
                </button>
            </form>
        </Modal>
    );
};

export default PopUpCreateNewPassword;
