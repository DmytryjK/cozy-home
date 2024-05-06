import { useState, memo } from 'react';
import LoginForm from '../../../../shared-components/Header/Auth/LoginForm/LoginForm';

import './RegularCustomerAuth.scss';
import GoogleAuth from '../../../../shared-components/Header/Auth/GoogleAuth/GoogleAuth';

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
                <GoogleAuth
                    additionalClass="regular-customer__login_button"
                    textBtn="Увійти за допомогою Google"
                    isTitleShow={false}
                />
            </div>
        </div>
    );
};

export default memo(RegularCustomerAuth);
