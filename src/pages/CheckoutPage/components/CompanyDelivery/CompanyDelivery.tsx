import { useState } from 'react';
import './CompanyDelivery.scss';
import { deliveryCompany } from '../DeliveryAndPaymentForm/DeliveryAndPaymentForm';

const CompanyDelivery = () => {
    const [companyName, setCompanyName] = useState('Оберіть');
    const [addressName, setAddressName] = useState('Оберіть');
    const [postServiceIsActive, setPostServiceIsActive] =
        useState<boolean>(false);
    const [addressIsActive, setAddressIsActive] = useState<boolean>(false);
    return (
        <form className="customer-form">
            <label
                htmlFor=""
                className={`customer-form__item ${
                    postServiceIsActive ? 'active' : ''
                }`}
            >
                <p>Поштовий сервіс*</p>
                <div className="customer-form__item_button_wrapper">
                    <div
                        className="customer-form__item_button"
                        onClick={() =>
                            setPostServiceIsActive(!postServiceIsActive)
                        }
                    >
                        {companyName}
                    </div>
                    {postServiceIsActive && (
                        <div className="customer-form__item_dropdown">
                            <ul className="customer-form__item_dropdown_list">
                                {deliveryCompany.map((company) => (
                                    <li
                                        onClick={() => {
                                            setCompanyName(company.title);
                                            setPostServiceIsActive(false);
                                        }}
                                        key={company.id}
                                        className={`customer-form__item_dropdown_list_item ${
                                            company.title === companyName &&
                                            'active'
                                        }`}
                                    >
                                        {company.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </label>
            <label htmlFor="" className="customer-form__item">
                <p>Область*</p>
                <input
                    type="text"
                    placeholder="Ваша область"
                    className="customer-form__item_input"
                />
            </label>
            <label htmlFor="" className="customer-form__item">
                <p>Місто*</p>
                <input
                    type="text"
                    placeholder="Ваше місто"
                    className="customer-form__item_input"
                />
            </label>
            <label
                htmlFor=""
                className={`customer-form__item ${
                    addressIsActive ? 'active' : ''
                }`}
            >
                <p>Відділення*</p>
                <div className="customer-form__item_button_wrapper">
                    <div
                        className="customer-form__item_button"
                        onClick={() => setAddressIsActive(!addressIsActive)}
                    >
                        {addressName}
                    </div>
                    {addressIsActive && (
                        <div className="customer-form__item_dropdown">
                            <ul className="customer-form__item_dropdown_list">
                                {deliveryCompany.map((company) => (
                                    <li
                                        onClick={() => {
                                            setAddressName(company.title);
                                            setAddressIsActive(false);
                                        }}
                                        key={company.id}
                                        className={`customer-form__item_dropdown_list_item ${
                                            company.title === addressName &&
                                            'active'
                                        }`}
                                    >
                                        {company.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </label>
        </form>
    );
};

export default CompanyDelivery;
