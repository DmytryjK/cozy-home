import './AddressDelivery.scss';

const AddressDelivery = () => {
    return (
        <form className="customer-form">
            <label htmlFor="" className="customer-form__item">
                <p>Місто*</p>
                <input
                    type="text"
                    placeholder="Ваше місто"
                    className="customer-form__item_input"
                />
            </label>
            <label htmlFor="" className="customer-form__item">
                <p>Будинок*</p>
                <input
                    type="text"
                    placeholder="Ваш будинок"
                    className="customer-form__item_input"
                />
            </label>
            <label htmlFor="" className="customer-form__item">
                <p>Вулиця*</p>
                <input
                    type="text"
                    placeholder="Ваша вулиця"
                    className="customer-form__item_input"
                />
            </label>
            <label htmlFor="" className="customer-form__item">
                <p>Квартира*</p>
                <input
                    type="text"
                    placeholder="Ваша квартира"
                    className="customer-form__item_input"
                />
            </label>
        </form>
    );
};

export default AddressDelivery;
