import nextId from 'react-id-generator';
import { useAppSelector } from '../../../../hooks/hooks';
import addSpaceToPrice from '../../../../utils/addSpaceToPrice';
import './ProductsList.scss';

const ProductsList = () => {
    const productsInfoToCheckout = useAppSelector(
        (state) => state.cart.productsInfoToCheckout
    );
    return (
        <div className="checkout__products">
            <div className="checkout__products-header products-header">
                <span className="products-header__left">Товар</span>
                <span className="products-header__right">Ціна</span>
            </div>
            <ul className="checkout__products-list products-list">
                {productsInfoToCheckout.map((item) => {
                    return (
                        <li
                            className="products-list__item"
                            key={nextId('checkout-product-item')}
                        >
                            <span className="products-list__item-name">
                                {item.productName}, {item.skuCode},{' '}
                                <span className="products-list__item-nowrap">
                                    {item.colorName}{' '}
                                    <span className="products-list__item-quantity">
                                        x {item.quantityToCheckout}
                                    </span>
                                </span>
                            </span>
                            <span className="products-list__item-price">
                                {addSpaceToPrice(item.price)} UAH
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ProductsList;
