import './DeliveryTerms.scss';

const DeliveryTerms = ({ extraClass }: { extraClass?: string }) => {
    return (
        <div className={`delivery-terms ${extraClass}`}>
            <b className="delivery-terms__main">Оплата:</b> <br />
            При отриманні накладеним платежем <b>(вся Україна)</b> або готівкою
            кур'єру <b>(Київ)</b>
            <br /> На банківську карту (передоплата)
            <br /> На розрахунковий рахунок (передоплата)
            <br />
            <br />
            <b className="delivery-terms__main">Доставка:</b>
            <br />
            Безкоштовна доставка всіма поштовими службами: <b>
                Нова Пошта
            </b>, <b>Укрпошта</b>, <b>Meest</b>
        </div>
    );
};

DeliveryTerms.defaultProps = {
    extraClass: '',
};

export default DeliveryTerms;
