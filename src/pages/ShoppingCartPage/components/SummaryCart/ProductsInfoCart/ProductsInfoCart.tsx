import addSpaceToPrice from '../../../../../utils/addSpaceToPrice';

const ProductsInfoCart = () => {
    return (
        <div className="cart-summary__products-info">
            <span className="cart-summary__quantity">
                Разом (<span>{9} товарів</span>)
            </span>
            <span className="cart-summary__cost">
                {addSpaceToPrice(801000)} UAH
            </span>
        </div>
    );
};

export default ProductsInfoCart;
