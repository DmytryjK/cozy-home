import SubmitButton from '../../shared-components/SubmitButton/SubmitButton';
import './NewCustomerForm.scss';

type Props = {
    handleSubmit: (isRegular: boolean) => void;
};

const NewCustomerForm = (props: Props) => {
    const { handleSubmit } = props;

    return (
        <>
            <form className="customer-form">
                <label htmlFor="" className="customer-form__item">
                    <p>Ваше ім’я*</p>
                    <input
                        type="text"
                        placeholder="Ім’я"
                        className="customer-form__item_input"
                    />
                </label>
                <label htmlFor="" className="customer-form__item">
                    <p>Ваше прізвище*</p>
                    <input
                        type="text"
                        placeholder="Прізвище"
                        className="customer-form__item_input"
                    />
                </label>
                <label htmlFor="" className="customer-form__item">
                    <p>Телефон*</p>
                    <input
                        type="text"
                        placeholder="+38 (___) ___ - __ - __"
                        className="customer-form__item_input"
                    />
                </label>
                <label htmlFor="" className="customer-form__item">
                    <p>E-mail</p>
                    <input
                        type="text"
                        placeholder="example@gmail.com"
                        className="customer-form__item_input"
                    />
                </label>
            </form>
            <div className="button-wrapper">
                <SubmitButton title="Далі" onClick={() => handleSubmit(true)} />
            </div>
        </>
    );
};

export default NewCustomerForm;
