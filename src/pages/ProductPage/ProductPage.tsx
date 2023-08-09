import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchMightBeInterestProducts } from '../../store/reducers/productsSliderSlice';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import ProductRating from './components/ProductRating/ProductRating';
import ColorSelection from './components/ColorSelection/ColorSelection';
import ProductsSlider from '../../shared-components/ProductsSlider/ProductsSlider';
import pluralizeUkrainian from '../../helpers/pluralizeUkrainian';
import './ProductPage.scss';

const ProductPage = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector(
        (state) => state.productsSlider
    );
    const countOfReviews = 12;
    useEffect(() => {
        dispatch(fetchMightBeInterestProducts());
    }, [dispatch]);

    return (
        <section className="product-page">
            <Breadcrumbs />
            <div className="container">
                <h1 className="product-page__title">Крісло COMFORT</h1>
                <div className="product-page__extra-info">
                    <p className="product-page__sku">240003</p>
                    <ProductRating />
                    <a className="product-page__feedbacks-link" href="/">
                        {pluralizeUkrainian(countOfReviews, [
                            'відгуг',
                            'відгука',
                            'відгуків',
                        ])}
                    </a>
                </div>
                <ColorSelection />
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
