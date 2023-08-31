import './SummaryCart.scss';
import addSpaceToPrice from '../../../../utils/addSpaceToPrice';

const SummaryCart = () => {
    return (
        <div className="cart-summary">
            <div className="cart-summary__inner-content">
                <h3 className="cart-summary__title">Підсумки кошика</h3>
                <div className="cart-summary__products-info">
                    <span className="cart-summary__quantity">
                        Разом (<span>{1} товар</span>)
                    </span>
                    <span className="cart-summary__cost">
                        {addSpaceToPrice(801000)} UAH
                    </span>
                </div>
            </div>

            <button className="cart-summary__checkout" type="button">
                Оформити замовлення
            </button>
        </div>
    );
};

export default SummaryCart;
