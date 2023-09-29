import { useState, Dispatch, SetStateAction } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import googleIcon from '../../../../assets/icons/auth/google-icon.svg';
import Modal from '../../../Modal/Modal';
import './PopUpAuth.scss';

const PopUpAuth = ({
    isActive,
    setIsActive,
}: {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <Modal
            active={isActive}
            setActive={setIsActive}
            background="#FAFAF9"
            maxwidth="884px"
            display="flex"
        >
            <div className="auth-popup">
                <h2 className="auth-popup__title">
                    Вхід до особистого кабінету
                </h2>
                <LoginForm />
                <div className="auth-popup__login-by-service login-by-service">
                    <h3 className="login-by-service__title">
                        Увійдіть як користувач
                    </h3>
                    <a className="login-by-service__link" href="/">
                        <img src={googleIcon} alt="увійти через гугл аккаунт" />
                    </a>
                </div>
            </div>
        </Modal>
    );
};

export default PopUpAuth;
