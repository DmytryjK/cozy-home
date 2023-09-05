import { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import ProductRating from './components/ProductRating/ProductRating';
import ColorSelection from './components/ColorSelection/ColorSelection';
import ProductPrice from './components/ProductPrice/ProductPrice';
import AddProductBlock from './components/AddProductBlock/AddProductBlock';
import Accordeon from './components/Accordeon/Accordeon';
import InterestedSlider from './components/InterestedSlider/InterestedSlider';
import pluralizeUkrainian from '../../helpers/pluralizeUkrainian';
import './ProductPage.scss';
import ProductImagesSlider from './components/ProductImagesSlider/ProductImagesSlider';
import CustomersReviewSlider from './components/CustomersReviewSlider/CustomersReviewSlider';

const ProductPage = () => {
    const [colorChange, setColorChange] = useState(false);
    const skuCode = useAppSelector(
        (state) => state.productInformation.productInfo.skuCode
    );
    const name = useAppSelector(
        (state) => state.productInformation.productInfo.name
    );
    const countOfReviews = useAppSelector(
        (state) => state.productInformation.productInfo.countOfReviews
    );

    return (
        <div className="product-page">
            <Breadcrumbs />
            <div className="product-page__wrapper container">
                <ProductImagesSlider colorChange={colorChange} />
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
                    <ColorSelection setColorChange={setColorChange} />
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
