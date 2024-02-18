import { useState, memo } from 'react';
import LoginForm from '../../../../shared-components/Header/Auth/LoginForm/LoginForm';

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
    const [isLoginBtnClicked, setIsLoginBtnClicked] = useState(false);

    return (
        <div className="regular-customer">
            <div className="regular-customer__form">
                {/* <form
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
                </form> */}
                <LoginForm
                    styleClass="customer-form"
                    setIsLoginBtnClicked={setIsLoginBtnClicked}
                />
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

export default memo(RegularCustomerAuth);
