import './NewCustomerForm.scss';

type Props = {
    handleSubmit: (isRegular: boolean) => void;
};

const NewCustomerForm = (props: Props) => {
    const { handleSubmit } = props;

    return (
        <>
            <form className="new-customer-form">
                <label htmlFor="" className="new-customer-form__item">
                    <p>Ваше ім’я*</p>
                    <input
                        type="text"
                        placeholder="Ім’я"
                        className="new-customer-form__item_input"
                    />
                </label>
                <label htmlFor="" className="new-customer-form__item">
                    <p>Ваше прізвище*</p>
                    <input
                        type="text"
                        placeholder="Прізвище"
                        className="new-customer-form__item_input"
                    />
                </label>
                <label htmlFor="" className="new-customer-form__item">
                    <p>Телефон*</p>
                    <input
                        type="text"
                        placeholder="+38 (___) ___ - __ - __"
                        className="new-customer-form__item_input"
                    />
                </label>
                <label htmlFor="" className="new-customer-form__item">
                    <p>E-mail</p>
                    <input
                        type="text"
                        placeholder="example@gmail.com"
                        className="new-customer-form__item_input"
                    />
                </label>
            </form>
            <button
                onClick={() => handleSubmit(true)}
                className="submit-button"
                type="button"
            >
                Далі
            </button>
        </>
    );
};

export default NewCustomerForm;
