import { useState } from 'react';
import { useFormik, FormikErrors } from 'formik';
import SubmitButton from '../../shared-components/SubmitButton/SubmitButton';
import formValidation from '../../../../utils/formValidation';
import PasswordInput from '../../../../shared-components/FormComponents/PasswordInput/PasswordInput';
import EmailInput from '../../../../shared-components/FormComponents/EmailInput/EmailInput';
import './RegularCustomerAuth.scss';

type Props = {
    setResetPasswordActive: React.Dispatch<React.SetStateAction<boolean>>;
    setRegularLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

interface FormValues {
    [key: string]: string;
    password: string;
    email: string;
}

const RegularCustomerAuth = (props: Props) => {
    const { setResetPasswordActive, setRegularLoggedIn } = props;
    const [isPasswordHide, setIsPasswordHide] = useState<boolean>(true);

    const formik6 = useFormik({
        initialValues: {
            password: '',
            email: '',
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
            setRegularLoggedIn(true);
            resetForm();
        },
    });

    return (
        <div className="regular-customer">
            <div className="regular-customer__form">
                <form
                    className="customer-form"
                    onSubmit={formik6.handleSubmit}
                    noValidate
                >
                    <EmailInput formik={formik6} />
                    <PasswordInput formik={formik6} />
                    <div className="regular-customer__form_footer">
                        <button
                            type="button"
                            className="regular-customer__form_footer_password-reset"
                            onClick={() => setResetPasswordActive(true)}
                        >
                            Забули пароль?
                        </button>
                        <SubmitButton title="Увійти" />
                    </div>
                </form>
            </div>
            <span className="custom-line" />
            <div className="regular-customer__login">
                <p className="regular-customer__login_title">
                    Увійдіть як користувач
                </p>
                <button
                    type="button"
                    className="regular-customer__login_button"
                >
                    <span className="regular-customer__login_button-img" />
                    <span className="regular-customer__login_button-text">
                        Ввійти за допомогою Google
                    </span>
                </button>
            </div>
        </div>
    );
};

export default RegularCustomerAuth;
