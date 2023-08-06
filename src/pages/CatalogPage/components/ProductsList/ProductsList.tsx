import nextId from 'react-id-generator';
import { useAppSelector } from '../../../../hooks/hooks';
import ProductCard from '../../../../shared-components/ProductCard/ProductCard';
import ProductLoader from './ProductLoader/ProductLoader';
import './ProductsList.scss';

const ProductsList = () => {
    const catalogProducts = useAppSelector(
        (state) => state.catalogProducts.catalogProducts
    );

    return (
        <section className="catalog-products">
            <ProductLoader />
            <ul className="catalog-products__list">
                {catalogProducts.map((catalogProduct) => {
                    return (
                        <li
                            key={nextId('card-of-catalogItem')}
                            className="catalog-products__card"
                        >
                            <ProductCard product={catalogProduct} />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default ProductsList;
