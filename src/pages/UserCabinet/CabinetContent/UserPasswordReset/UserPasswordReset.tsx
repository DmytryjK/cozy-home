import { useEffect, useState, memo } from 'react';
import { useFormik, FormikErrors } from 'formik';
import {
    FirstNameInput,
    LastNameInput,
    EmailInput,
    PhoneNumberInput,
    PasswordInput,
    BirthDateInput,
} from '../../../../shared-components/FormComponents/Inputs';
import {
    updatetUserProfilePassword,
    resetUpdatePasswordStatus,
} from '../../../../store/reducers/userActionsSlice';
import formValidation from '../../../../utils/formValidation';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import Loader from '../../../../shared-components/Loader';
import './UserPasswordReset.scss';

interface FormValues {
    [key: string]: string;
    password: string;
    oldpassword: string;
    repeatedPassword: string;
}

const UserPasswordReset = () => {
    const dispatch = useAppDispatch();
    const { updatePasswordStatus, errorUpdatePassword } = useAppSelector(
        (state) => state.userActions
    );

    useEffect(() => {
        dispatch(resetUpdatePasswordStatus());
    }, []);

    const formik12 = useFormik({
        initialValues: {
            oldpassword: '',
            password: '',
            repeatedPassword: '',
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const validationFields = ['oldpassword', 'password'];
            validationFields.forEach((fieldName: string) => {
                let error;
                if (fieldName === 'password' || fieldName === 'oldpassword') {
                    error = formValidation(fieldName, values[fieldName], false);
                } else {
                    error = formValidation(fieldName, values[fieldName]);
                }

                if (error) {
                    errors[fieldName] = error;
                }
            });

            if (values.password && formik12.touched.repeatedPassword) {
                if (!values.repeatedPassword) {
                    errors.repeatedPassword = 'Необхідно заповнити дане поле';
                } else if (values.repeatedPassword !== values.password) {
                    errors.repeatedPassword = 'Паролі мають співпадати';
                }
            }

            return errors;
        },
        onSubmit: (values) => {
            const { oldpassword, password, repeatedPassword } = values;
            if (!oldpassword || !password || !repeatedPassword) {
                formik12.setErrors({
                    oldpassword: oldpassword
                        ? ''
                        : 'Необхідно заповнити дане поле',
                    password: password ? '' : 'Необхідно заповнити дане поле',
                    repeatedPassword: repeatedPassword
                        ? ''
                        : 'Необхідно заповнити дане поле',
                });
                return;
            }
            dispatch(
                updatetUserProfilePassword({
                    oldPassword: oldpassword,
                    newPassword: password,
                    repeatedNewPassword: repeatedPassword,
                })
            );
        },
    });

    return (
        <div className="user-contacts">
            <h1 className="user-contacts__title">Змінити пароль</h1>
            <form
                className="user-contacts__form"
                onSubmit={formik12.handleSubmit}
                noValidate
            >
                <div className="user-contacts__form-wrapper">
                    {updatePasswordStatus === 'pending' ? (
                        <Loader className="user-contacts__loader" />
                    ) : (
                        ''
                    )}
                    <div className="user-contacts__form-left">
                        <input
                            hidden
                            type="text"
                            name="username"
                            defaultValue=""
                            autoComplete="username"
                            style={{ display: 'none' }}
                        />
                        <PasswordInput
                            formik={formik12}
                            label="Старий пароль"
                            name="oldpassword"
                            isRequired={false}
                        />
                        <PasswordInput
                            formik={formik12}
                            label="Новий пароль"
                            isRequired={false}
                        />
                        <PasswordInput
                            formik={formik12}
                            label="Повторіть пароль*"
                            name="repeatedPassword"
                        />
                    </div>
                    {updatePasswordStatus === 'succeeded' ? (
                        <div className="update-password__success">
                            Пароль успішно змінено
                        </div>
                    ) : (
                        ''
                    )}
                    {errorUpdatePassword ? (
                        <div className="update-password__failed">
                            {errorUpdatePassword as string}
                        </div>
                    ) : (
                        ''
                    )}
                    <button
                        className="user-contacts__form-submit"
                        type="submit"
                        disabled={updatePasswordStatus === 'pending'}
                    >
                        Зберегти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default memo(UserPasswordReset);
