import nextId from 'react-id-generator';
import ProductItem from '../ProductItem/ProductItem';
import './ProductsList.scss';

const ProductsList = () => {
    const quantityProducts: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    return (
        <div className="cart-table">
            <table className="cart-products">
                <thead className="cart-products__header">
                    <tr>
                        <th aria-label="Корзина" />
                        <th>Товар</th>
                        <th aria-label="Інформація про товар" />
                        <th>Кількість</th>
                        <th>Наявність</th>
                        <th>Вартість</th>
                    </tr>
                </thead>
                <tbody className="cart-products__items">
                    {quantityProducts.map((item) => {
                        return (
                            <ProductItem
                                key={nextId('cart-product_on-page')}
                                quantityProducts={quantityProducts.length}
                            />
                        );
                    })}
                </tbody>
            </table>
            <div className="cart-table__clear-wrapper">
                <button className="cart-table__clear-cart" type="button">
                    Очистити кошик
                </button>
            </div>
        </div>
    );
};

export default ProductsList;
