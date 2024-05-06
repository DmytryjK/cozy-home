import { useAppSelector } from '../../../../hooks/hooks';
import './ProductPrice.scss';

const ProductPrice = () => {
    const addSpaceToPrice = (price: number) => {
        let result = price.toString();
        if (price >= 1000) {
            const temporary = +price;
            result = temporary.toLocaleString().replace(',', ' ');
        }
        return result;
    };
    const productInfo = useAppSelector(
        (state) => state.productInformation.productInfo
    );
    const currentColor = useAppSelector(
        (state) => state.productInformation.currentColor
    );

    const { price, priceWithDiscount } = productInfo;

    const renderPrice = () => {
        return (
            <>
                {currentColor?.quantityStatus === 'Немає на складі' ||
                currentColor?.quantityStatus === 'Немає в наявності' ? null : (
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
                )}
                <span className="product-price__stock-status">
                    {currentColor?.quantityStatus}
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
