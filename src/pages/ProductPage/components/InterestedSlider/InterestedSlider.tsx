import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import { fetchMightBeInterestProducts } from '../../../../store/reducers/productsSliderSlice';
import ProductsSlider from '../../../../shared-components/ProductsSlider/ProductsSlider';

const InterestedSlider = () => {
    const { interestedProducts, loadingInterested, errorInterested } =
        useAppSelector((state) => state.productsSlider);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMightBeInterestProducts());
    }, [dispatch]);
    return (
        <section className="product-page__interested">
            <ProductsSlider
                title="Також може зацікавити"
                products={interestedProducts}
                loading={loadingInterested}
                error={errorInterested}
            />
        </section>
    );
};

export default InterestedSlider;
