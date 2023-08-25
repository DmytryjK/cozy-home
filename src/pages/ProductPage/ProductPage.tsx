import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import ProductRating from './components/ProductRating/ProductRating';
import ColorSelection from './components/ColorSelection/ColorSelection';
import ProductPrice from './components/ProductPrice/ProductPrice';
// import AddToCartBtn from './components/AddProductBlock/AddToCartBtn/AddToCartBtn';
// import AddToFavoriteBtn from '../../shared-components/AddToFavoriteBtn/AddToFavoriteBtn';
import AddProductBlock from './components/AddProductBlock/AddProductBlock';
import Accordeon from './components/Accordeon/Accordeon';
import InterestedSlider from './components/InterestedSlider/InterestedSlider';
import pluralizeUkrainian from '../../helpers/pluralizeUkrainian';
import './ProductPage.scss';
import ProductImagesSlider from './components/ProductImagesSlider/ProductImagesSlider';
import EnlargedPhoto from './components/ProductImagesSlider/EnlargedPhoto/EnlargedPhoto';
import CustomersReviewSlider from './components/CustomersReviewSlider/CustomersReviewSlider';

const ProductPage = () => {
    const [largePhotoActive, setlargePhotoActive] = useState<boolean>(false);
    const productInfo = useAppSelector(
        (state) => state.productInformation.productInfo
    );
    const { skuCode, name, countOfReviews, colors } = productInfo;

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
            <div className="product-page__wrapper container">
                <ProductImagesSlider
                    setlargePhotoActive={setlargePhotoActive}
                />
                <div className="product-page-right-content-wrapper">
                    <h1 className="product-page__title">{name}</h1>
                    <div className="product-page__extra-info">
                        <p className="product-page__sku">{skuCode}</p>
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
                    <AddProductBlock />
                    <Accordeon />
                </div>
            </div>
            <CustomersReviewSlider />
            <InterestedSlider />
        </div>
    );
};

export default ProductPage;
