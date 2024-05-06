import { memo } from 'react';
import { useFormik, FormikErrors } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import formValidation from '../../../utils/formValidation';
import {
    FirstNameInput,
    LastNameInput,
    EmailInput,
    PasswordInput,
    PhoneNumberInput,
    BirthDateInput,
} from '../../../shared-components/FormComponents/Inputs';
import { reverseBirthdayForServer } from '../../../utils/birthdateChanges/birthdateChanges';
import { userSignInByEmail } from '../../../store/reducers/authSlice';
import {
    ErrorMessageSmall,
    SuccessMessage,
} from '../../../shared-components/UserMessages/UserMessages';
import './SignInForm.scss';

interface FormValues {
    [key: string]: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    phoneNumber: string;
    password: string;
    repeatedPassword: string;
    email: string;
}

const SignInForm = () => {
    const emailLinksLoading = useAppSelector(
        (state) => state.auth.emailLinksLoading
    );
    const emailLinksError = useAppSelector(
        (state) => state.auth.emailLinksError
    );
    const dispatch = useAppDispatch();

    const formik2 = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            birthdate: '',
            phoneNumber: '',
            password: '',
            repeatedPassword: '',
            email: '',
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};

            const validationFields = [
                'firstName',
                'lastName',
                'phoneNumber',
                'password',
                'email',
                'birthdate',
            ];

            validationFields.forEach((fieldName: string) => {
                const error = formValidation(fieldName, values[fieldName]);
                if (error) {
                    errors[fieldName] = error;
                }
            });

            if (values.password && formik2.touched.repeatedPassword) {
                if (!values.repeatedPassword) {
                    errors.repeatedPassword = 'Необхідно заповнити дане поле';
                } else if (values.repeatedPassword !== values.password) {
                    errors.repeatedPassword = 'Паролі мають співпадати';
                }
            }

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            const {
                firstName,
                lastName,
                birthdate,
                phoneNumber,
                password,
                email,
            } = values;
            dispatch(
                userSignInByEmail({
                    authData: {
                        email,
                        password,
                        firstName,
                        lastName,
                        birthday: reverseBirthdayForServer(birthdate),
                        phoneNumber,
                        roles: ['admin'],
                    },
                    resetForm,
                })
            );
        },
    });
    return (
        <form
            className={`signin-form ${
                emailLinksLoading === 'pending' ? 'loading-data' : ''
            }`}
            onSubmit={formik2.handleSubmit}
            noValidate
        >
            <FirstNameInput formik={formik2} />
            <LastNameInput formik={formik2} />
            <BirthDateInput formik={formik2} />
            <PhoneNumberInput formik={formik2} />
            <PasswordInput formik={formik2} />
            <PasswordInput
                formik={formik2}
                label="Повтор пароля*"
                name="repeatedPassword"
            />
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
            <button
                className="signin-form__submit"
                type="submit"
                disabled={emailLinksLoading === 'pending'}
            >
                Зареєструватися
                <span className="submit-button__loading-dots">
                    <span className="submit-button__loading-dot" />
                    <span className="submit-button__loading-dot" />
                    <span className="submit-button__loading-dot" />
                </span>
            </button>
            {emailLinksLoading === 'succeeded' ? (
                <SuccessMessage text="Для активації акаунту перейдіть по посиланню на вашій електронній пошті." />
            ) : (
                ''
            )}
            {emailLinksError ? (
                <ErrorMessageSmall text={emailLinksError as string} />
            ) : (
                ''
            )}
        </form>
    );
};

export default memo(SignInForm);
