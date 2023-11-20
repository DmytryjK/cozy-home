import { memo } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import googleIcon from '../../../../assets/icons/auth/google-icon.svg';
import './DropdownAuth.scss';

const DropdownAuth = ({ isActive }: { isActive: boolean }) => {
    return (
        <div
            className={`auth-dropdown ${
                isActive ? 'auth-dropdown_active' : ''
            }`}
        >
            <svg
                className="auth-dropdown__decorative-icon"
                width="22"
                height="15"
                viewBox="0 0 22 15"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M11 0L21.3923 15H0.607696L11 0Z" />
            </svg>
            <h2 className="auth-dropdown__title">
                Вхід до особистого кабінету
            </h2>
            <LoginForm />
            <div className="auth-dropdown__login-by-service login-by-service">
                <h3 className="login-by-service__title">
                    Увійдіть як користувач
                </h3>
                <a className="login-by-service__link" href="/">
                    <img src={googleIcon} alt="увійти через гугл аккаунт" />
                </a>
            </div>
        </div>
    );
};
export default memo(DropdownAuth);
