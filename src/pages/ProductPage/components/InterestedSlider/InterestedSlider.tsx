import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import { fetchMightBeInterestProducts } from '../../../../store/reducers/productsSliderSlice';
import ProductsSlider from '../../../../shared-components/ProductsSlider/ProductsSlider';

const InterestedSlider = () => {
    const { products, loading, error } = useAppSelector(
        (state) => state.productsSlider
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMightBeInterestProducts());
    }, [dispatch]);
    return (
        <section className="product-page__interested">
            <ProductsSlider
                title="Також може зацікавити"
                products={products}
                loading={loading}
                error={error}
            />
        </section>
    );
};

export default InterestedSlider;
