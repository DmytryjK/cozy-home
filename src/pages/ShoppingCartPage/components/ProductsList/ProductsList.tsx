import nextId from 'react-id-generator';
import ProductItem from '../ProductItem/ProductItem';
import './ProductsList.scss';

const ProductsList = () => {
    const quantityProducts: number[] = [1, 5, 0, 50, 300, 10, 0, 9, 7];
    return (
        <div className="cart-table">
            <ul className="cart-table__header">
                <li
                    className="cart-table__header-item"
                    aria-label="видалити товар"
                />
                <li className="cart-table__header-item cart-table__header-item_pdl">
                    Товар
                </li>
                <ul className="cart-table__header-right">
                    <li className="cart-table__header-item">Кількість</li>
                    <li className="cart-table__header-item">Наявність</li>
                    <li className="cart-table__header-item">Вартість</li>
                </ul>
            </ul>
            <ul className="cart-table__items">
                {quantityProducts.map((quantity) => {
                    return (
                        <li
                            className="cart-table__item"
                            key={nextId('product_for-cart')}
                        >
                            <ProductItem
                                key={nextId('cart-product_on-page')}
                                quantityProducts={quantity}
                            />
                        </li>
                    );
                })}
            </ul>
            <div className="cart-table__clear-wrapper">
                <button className="cart-table__clear-cart" type="button">
                    Очистити кошик
                </button>
            </div>
        </div>
    );
};

export default ProductsList;
