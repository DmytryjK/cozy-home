import './ProductPrice.scss';

type ProductPriceType = {
    price: number;
    priceWithDiscount: number | null;
    isLowQuantity: boolean;
};

const ProductPrice = () => {
    const priceData = {
        price: 15000,
        priceWithDiscount: 12000,
        isLowQuantity: true,
    };
    const addSpaceToPrice = (price: number) => {
        let result = '';
        if (price >= 1000) {
            const temporary = +price;
            result = temporary.toLocaleString().replace(',', ' ');
        }
        return result;
    };
    const renderPrice = () => {
        const { price, priceWithDiscount, isLowQuantity } = priceData;
        return (
            <>
                <div className="product-price__wrapper">
                    {priceWithDiscount ? (
                        <>
                            <span className="product-price__discount product-price_bold-text">
                                {addSpaceToPrice(priceWithDiscount)} UAH
                            </span>
                            <span className="product-price__default product-price_strikethrough-text">
                                {addSpaceToPrice(price)} UAH
                            </span>
                        </>
                    ) : (
                        <span className="product-price__default product-price_bold-text">
                            {addSpaceToPrice(price)} UAH
                        </span>
                    )}
                </div>
                <span className="product-price__stock-status">
                    {isLowQuantity ? 'Закінчується' : 'В наявності'}
                </span>
            </>
        );
    };
    return (
        <div className="product-page__product-price product-price">
            {renderPrice()}
        </div>
    );
};

export default ProductPrice;
