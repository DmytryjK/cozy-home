import { useEffect, memo, useState } from 'react';
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
    updateUserProfileData,
    resetUserProfileDataStatus,
} from '../../../../store/reducers/userActionsSlice';
import formValidation from '../../../../utils/formValidation';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import Loader from '../../../../shared-components/Loader';
import {
    ErrorMessageSmall,
    SuccessMessage,
} from '../../../../shared-components/UserMessages/UserMessages';
import './UserContacts.scss';

interface FormValues {
    [key: string]: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    phoneNumber: string;
    password: string;
    oldpassword: string;
    repeatedPassword: string;
    email: string;
}

const UserContacts = () => {
    const dispatch = useAppDispatch();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const { loadingUserPersonalInfo, errorUserPersonalInfo, userProfileData } =
        useAppSelector((state) => state.userActions);

    useEffect(() => {
        dispatch(resetUserProfileDataStatus());
    }, []);

    const formik11 = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            birthdate: '',
            phoneNumber: '',
            oldpassword: '',
            password: '',
            repeatedPassword: '',
            email: '',
            ...userProfileData,
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const validationFields = [
                'firstName',
                'lastName',
                'birthdate',
                'email',
                'phoneNumber',
                'oldpassword',
                'password',
            ];
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

            if (values.password && formik11.touched.repeatedPassword) {
                if (!values.repeatedPassword) {
                    errors.repeatedPassword = 'Необхідно заповнити дане поле';
                } else if (values.repeatedPassword !== values.password) {
                    errors.repeatedPassword = 'Паролі мають співпадати';
                }
            }

            return errors;
        },
        onSubmit: (values) => {
            const {
                firstName,
                lastName,
                birthdate,
                phoneNumber,
                oldpassword,
                password,
                email,
                repeatedPassword,
            } = values;
            setIsFormSubmitted(true);
            dispatch(
                updateUserProfileData({
                    email,
                    oldPassword: oldpassword,
                    newPassword: password,
                    repeatedNewPassword: repeatedPassword,
                    birthday: birthdate,
                    firstName,
                    lastName,
                    phoneNumber,
                })
            );
        },
    });

    useEffect(() => {
        if (!userProfileData) return;
        formik11.setValues((prev) => {
            return {
                ...prev,
                ...userProfileData,
            };
        });
    }, [userProfileData]);

    return (
        <div className="user-contacts">
            <h1 className="user-contacts__title">Контактна інформація</h1>
            <form
                className="user-contacts__form"
                onSubmit={formik11.handleSubmit}
                noValidate
            >
                <div className="user-contacts__form-wrapper">
                    {loadingUserPersonalInfo === 'pending' ? (
                        <Loader className="user-contacts__loader" />
                    ) : (
                        ''
                    )}
                    <div className="user-contacts__form-left user-contacts__form-wrapper_start">
                        <FirstNameInput formik={formik11} />
                        <LastNameInput formik={formik11} />
                        <BirthDateInput formik={formik11} />
                        <EmailInput formik={formik11} />
                        <PhoneNumberInput formik={formik11} />
                    </div>
                    <button
                        className="user-contacts__form-submit"
                        type="submit"
                        disabled={loadingUserPersonalInfo === 'pending'}
                    >
                        Зберегти
                    </button>
                    {loadingUserPersonalInfo === 'succeeded' &&
                    isFormSubmitted ? (
                        <SuccessMessage text="Дані успішно збережені!" />
                    ) : (
                        ''
                    )}
                    {errorUserPersonalInfo ? (
                        <ErrorMessageSmall text="Щось пішло не так, спробуйте зберегти дані ще раз" />
                    ) : (
                        ''
                    )}
                </div>
            </form>
        </div>
    );
};

export default memo(UserContacts);
