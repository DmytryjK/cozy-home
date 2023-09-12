import { useState } from 'react';
import SubmitButton from '../../shared-components/SubmitButton/SubmitButton';
import './RegularCustomerLoggedIn.scss';

type Props = {
    handleSubmit: (isRegular: boolean) => void;
};

const RegularCustomerLoggedIn = (props: Props) => {
    const { handleSubmit } = props;
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const [userMobilePhone, setUserMobilePhone] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const userData = {
        userName: 'Anzhelika',
        userSurName: 'Bazhan',
        userMobilePhone: '+380951239999',
        userEmail: 'cozyhome@gmail.com',
    };

    return (
        <>
            <form className="customer-form">
                <label htmlFor="" className="customer-form__item">
                    <p>Ваше ім’я*</p>
                    <input
                        type="text"
                        placeholder="Ім’я"
                        className="customer-form__item_input"
                        value={userData.userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </label>
                <label htmlFor="" className="customer-form__item">
                    <p>Ваше прізвище*</p>
                    <input
                        type="text"
                        placeholder="Прізвище"
                        className="customer-form__item_input"
                        value={userData.userSurName}
                        onChange={(e) => setUserSurname(e.target.value)}
                    />
                </label>
                <label htmlFor="" className="customer-form__item">
                    <p>Телефон*</p>
                    <input
                        type="text"
                        placeholder="+38 (___) ___ - __ - __"
                        className="customer-form__item_input"
                        value={userData.userMobilePhone}
                        onChange={(e) => setUserMobilePhone(e.target.value)}
                    />
                </label>
                <label htmlFor="" className="customer-form__item">
                    <p>E-mail</p>
                    <input
                        type="text"
                        placeholder="example@gmail.com"
                        className="customer-form__item_input"
                        value={userData.userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </label>
            </form>
            <div className="button-wrapper">
                <SubmitButton title="Далі" onClick={() => handleSubmit(true)} />
            </div>
        </>
    );
};

export default RegularCustomerLoggedIn;
