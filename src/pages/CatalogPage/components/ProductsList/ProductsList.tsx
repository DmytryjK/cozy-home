import nextId from 'react-id-generator';
import { useAppSelector } from '../../../../hooks/hooks';
import ProductCard from '../../../../shared-components/ProductCard/ProductCard';
import ProductLoader from './ProductLoader/ProductLoader';
import './ProductsList.scss';
import Skeleton from '../../../../shared-components/ProductCard/Skeleton/Skeleton';

const ProductsList = () => {
    const skeletonKeys = [...Array(6)].map((_, index) =>
        nextId(`skeleton-card`)
    );
    const catalogProducts = useAppSelector(
        (state) => state.catalogProducts.catalogProducts
    );
    const loading = useAppSelector((state) => state.catalogProducts.loading);
    const error = useAppSelector((state) => state.catalogProducts.error);
    const firstLoadingPage = () => {
        return skeletonKeys.map((skeleton) => {
            return <Skeleton key={nextId('skeleton-catalog-products')} />;
        });
    };

    return (
        <section className="catalog-products">
            <ProductLoader />
            <ul className="catalog-products__list">
                {catalogProducts.length === 0 &&
                !error &&
                loading !== 'succeeded'
                    ? firstLoadingPage()
                    : ''}
                {!error &&
                    catalogProducts.map((catalogProduct) => {
                        return (
                            <li
                                key={`card-of-catalogItem-${catalogProduct.skuCode}`}
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
