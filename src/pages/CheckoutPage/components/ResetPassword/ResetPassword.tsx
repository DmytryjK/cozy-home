import { useState } from 'react';
import SubmitButton from '../../shared-components/SubmitButton/SubmitButton';
import './ResetPassword.scss';
import Modal from '../../../../shared-components/Modal/Modal';

type Props = {
    setResetPasswordActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResetPassword = (props: Props) => {
    const [modalIsActive, setModalIsActive] = useState(false);
    const { setResetPasswordActive } = props;
    return (
        <>
            <div className="reset-password">
                <div className="reset-password__form">
                    <form className="customer-form">
                        <label htmlFor="" className="customer-form__item">
                            <p>E-mail</p>
                            <input
                                type="text"
                                placeholder="example@gmail.com"
                                className="customer-form__item_input"
                            />
                        </label>
                    </form>
                </div>
                <div className="reset-password__buttons">
                    <button
                        type="button"
                        className="reset-password__buttons_return"
                        onClick={() => setResetPasswordActive(false)}
                    >
                        Згадали?
                    </button>
                    <SubmitButton
                        title="Нагадати"
                        onClick={() => setModalIsActive(true)}
                    />
                </div>
            </div>
            {modalIsActive && (
                <div className="reset-password-modal">
                    <Modal
                        active={modalIsActive}
                        setActive={setModalIsActive}
                        isSubmitedText="Ваш відгук успішно додано!"
                        maxwidth="500px"
                    >
                        <h1 className="reset-password-modal__title">
                            На адресу вашої електронної пошти було надіслано
                            посилання для встановлення нового пароля.
                        </h1>
                        <p className="reset-password-modal__text">
                            Крім папки "Вхідні" перевірте також папку "Спам"
                            вашої поштової скриньки. Можливо, лист потрапив
                            туди.
                        </p>
                    </Modal>
                </div>
            )}
        </>
    );
};

export default ResetPassword;
