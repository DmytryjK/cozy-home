import { memo, SetStateAction, Dispatch, useEffect } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import './DropdownAuth.scss';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

const DropdownAuth = ({
    isActive,
    setIsInputFocused,
    isInputFocused,
    setIsAuthDropdownActive,
}: {
    isActive: boolean;
    isInputFocused: boolean;
    setIsAuthDropdownActive: Dispatch<SetStateAction<boolean>>;
    setIsInputFocused?: Dispatch<SetStateAction<boolean>>;
}) => {
    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                !target.matches('.header') &&
                !target.matches('.header__icons') &&
                !target.closest('.header__icons-profile') &&
                !target.closest('.auth-dropdown') &&
                !isInputFocused
            ) {
                setIsAuthDropdownActive(false);
            }
        };
        if (isActive) {
            window.addEventListener('mousedown', closeDropdown);
        }
        return () => window.removeEventListener('mousedown', closeDropdown);
    }, [isActive]);
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
            <button
                className="auth-dropdown__close"
                type="button"
                aria-label="закрити вікно"
                onClick={() => setIsAuthDropdownActive(false)}
            />
            <LoginForm setIsInputFocused={setIsInputFocused} />
            <GoogleAuth />
            {/* <div className="auth-dropdown__login-by-service login-by-service">
                <h3 className="login-by-service__title">
                    Увійдіть як користувач
                </h3>
                <a className="login-by-service__link" href="/">
                    <img src={googleIcon} alt="увійти через гугл аккаунт" />
                </a>
            </div> */}
        </div>
    );
};
export default memo(DropdownAuth);
