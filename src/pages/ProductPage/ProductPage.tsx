import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchMightBeInterestProducts } from '../../store/reducers/productsSliderSlice';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import ProductsSlider from '../../shared-components/ProductsSlider/ProductsSlider';

const ProductPage = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector(
        (state) => state.productsSlider
    );
    useEffect(() => {
        dispatch(fetchMightBeInterestProducts());
    }, [dispatch]);

    return (
        <section className="product-page">
            <Breadcrumbs />
            <div className="container">
                <h1 className="product-page__title">Крісло COMFORT</h1>
            </div>

            <ProductsSlider
                title="Також може зацікавити"
                products={products}
                loading={loading}
                error={error}
            />
        </section>
    );
};

export default ProductPage;
