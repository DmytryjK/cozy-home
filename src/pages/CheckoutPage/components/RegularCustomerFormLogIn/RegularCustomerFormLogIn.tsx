import SubmitButton from '../../shared-components/SubmitButton/SubmitButton';
import './RegularCustomerFormLogIn.scss';

const RegularCustomerFormLogIn = () => {
    return (
        <div className="regular-customer">
            <div className="regular-customer__form">
                <form className="customer-form">
                    <label htmlFor="" className="customer-form__item">
                        <p>E-mail</p>
                        <input
                            type="text"
                            placeholder="example@gmail.com"
                            className="customer-form__item_input"
                        />
                    </label>
                    <label htmlFor="" className="customer-form__item">
                        <p>Пароль</p>
                        <input
                            type="text"
                            placeholder="Ваш пароль"
                            className="customer-form__item_input"
                        />
                    </label>
                </form>
                <div className="regular-customer__form_footer">
                    <button
                        type="button"
                        className="regular-customer__form_footer_password-reset"
                    >
                        Забули пароль?
                    </button>
                    <SubmitButton title="Увійти" />
                </div>
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
                    Ввійти за допомогою Google
                </button>
            </div>
        </div>
    );
};

export default RegularCustomerFormLogIn;
