import { Dispatch, SetStateAction } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import Modal from '../../../Modal/Modal';
import './PopUpAuth.scss';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

const PopUpAuth = ({
    isActive,
    setIsActive,
    setIsBurgerOpen,
}: {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    setIsBurgerOpen: Dispatch<SetStateAction<boolean>>;
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
                <LoginForm
                    setIsPopUpMobileOpen={setIsActive}
                    setIsBurgerOpen={setIsBurgerOpen}
                />
                <GoogleAuth />
            </div>
        </Modal>
    );
};

export default PopUpAuth;
