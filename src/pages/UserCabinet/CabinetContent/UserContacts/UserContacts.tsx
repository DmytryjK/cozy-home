import { useFormik, FormikErrors } from 'formik';
import {
    FirstNameInput,
    LastNameInput,
    EmailInput,
    PhoneNumberInput,
    PasswordInput,
    BirthDateInput,
} from '../../../../shared-components/FormComponents/Inputs';
import { reverseBirthdayForServer } from '../../../../utils/birthdateChanges/birthdateChanges';
import formValidation from '../../../../utils/formValidation';
import './UserContacts.scss';

interface FormValues {
    [key: string]: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    phone: string;
    password: string;
    oldpassword: string;
    repeatedPassword: string;
    email: string;
}

const UserContacts = () => {
    const formik11 = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            birthdate: '',
            phone: '',
            oldpassword: '',
            password: '',
            repeatedPassword: '',
            email: '',
        },
        validate: (values: FormValues) => {
            const errors: FormikErrors<FormValues> = {};
            const validationFields = [
                'firstName',
                'lastName',
                'birthdate',
                'email',
                'phone',
                'oldpassword',
                'password',
            ];

            validationFields.forEach((fieldName: string) => {
                let error;
                if (fieldName === 'password') {
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
        onSubmit: (values, { resetForm }) => {
            const {
                firstName,
                lastName,
                birthdate,
                phone,
                oldpassword,
                password,
                email,
            } = values;
            alert(
                JSON.stringify({
                    firstName,
                    lastName,
                    birthdate: reverseBirthdayForServer(birthdate),
                    phone,
                    oldpassword,
                    password,
                    email,
                })
            );
            resetForm();
        },
    });
    return (
        <div className="user-contacts">
            <h1 className="user-contacts__title">Контактна інформація</h1>
            <form
                className="user-contacts__form"
                onSubmit={formik11.handleSubmit}
                noValidate
            >
                <div className="user-contacts__form-wrapper">
                    <div className="user-contacts__form-left">
                        <FirstNameInput formik={formik11} />
                        <LastNameInput formik={formik11} />
                        <BirthDateInput formik={formik11} />
                        <EmailInput formik={formik11} />
                        <PhoneNumberInput formik={formik11} />
                    </div>
                    <div className="user-contacts__form-right">
                        <PasswordInput
                            formik={formik11}
                            label="Старий пароль"
                            name="oldpassword"
                        />
                        <PasswordInput
                            formik={formik11}
                            label="Новий пароль"
                            isRequired={false}
                        />
                        <PasswordInput
                            formik={formik11}
                            label="Повторіть пароль*"
                            name="repeatedPassword"
                        />
                    </div>
                    <button
                        className="user-contacts__form-submit"
                        type="submit"
                    >
                        Зберегти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserContacts;
