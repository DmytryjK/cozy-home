import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchMightBeInterestProducts } from '../../store/reducers/productsSliderSlice';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import ProductRating from './components/ProductRating/ProductRating';
import ColorSelection from './components/ColorSelection/ColorSelection';
import ProductPrice from './components/ProductPrice/ProductPrice';
import AddToCartBtn from './components/AddToCartBtn/AddToCartBtn';
import AddToFavoriteBtn from '../../shared-components/AddToFavoriteBtn/AddToFavoriteBtn';
import Accordeon from './components/Accordeon/Accordeon';
import ProductsSlider from '../../shared-components/ProductsSlider/ProductsSlider';
import pluralizeUkrainian from '../../helpers/pluralizeUkrainian';
import './ProductPage.scss';
import ProductImagesSlider from './components/ProductImagesSlider/ProductImagesSlider';
import EnlargedPhoto from './components/ProductImagesSlider/EnlargedPhoto/EnlargedPhoto';

const ProductPage = () => {
    const [largePhotoActive, setlargePhotoActive] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector(
        (state) => state.productsSlider
    );
    const countOfReviews = 12;
    useEffect(() => {
        dispatch(fetchMightBeInterestProducts());
    }, [dispatch]);

    useEffect(() => {
        document.body.style.overflow = largePhotoActive ? 'hidden' : 'visible';
        document.body.style.paddingTop = largePhotoActive ? '0' : '70px';
    }, [largePhotoActive]);

    return (
        <div className="product-page">
            {largePhotoActive ? (
                <EnlargedPhoto setlargePhotoActive={setlargePhotoActive} />
            ) : (
                ''
            )}
            <Breadcrumbs />
            <div className="container">
                <ProductImagesSlider
                    setlargePhotoActive={setlargePhotoActive}
                />
                <div className="product-page-right-content-wrapper">
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
                    <ProductPrice />
                    <div className="product-page__add-product">
                        <AddToCartBtn />
                        <AddToFavoriteBtn />
                    </div>
                    <Accordeon />
                </div>
            </div>
            <section className="product-page__interested">
                <ProductsSlider
                    title="Також може зацікавити"
                    products={products}
                    loading={loading}
                    error={error}
                />
            </section>
        </div>
    );
};

export default ProductPage;
