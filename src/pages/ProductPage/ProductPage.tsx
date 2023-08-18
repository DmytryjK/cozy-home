import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import {
    fetchProductInfoByScuWithColor,
    updateProductColor,
    updateProductSku,
} from '../../store/reducers/productInformationSlice';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import ProductRating from './components/ProductRating/ProductRating';
import ColorSelection from './components/ColorSelection/ColorSelection';
import ProductPrice from './components/ProductPrice/ProductPrice';
import AddToCartBtn from './components/AddToCartBtn/AddToCartBtn';
import AddToFavoriteBtn from '../../shared-components/AddToFavoriteBtn/AddToFavoriteBtn';
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
    const currentSkuCode = useAppSelector(
        (state) => state.productInformation.currentSku
    );
    const dispatch = useAppDispatch();

    const { skuCode, name, countOfReviews } = productInfo;
    const hex = localStorage.getItem('hex');
    const productSkuCode = localStorage.getItem('productSkuCode');
    const colorName = localStorage.getItem('colorName');

    useEffect(() => {
        if (!hex || !productSkuCode || !colorName) return;
        dispatch(
            updateProductColor({
                name: colorName,
                id: hex,
            })
        );
        dispatch(
            fetchProductInfoByScuWithColor({
                productSkuCode,
                colorHex: hex,
            })
        );
    }, [dispatch, currentSkuCode]);

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
                    <div className="product-page__add-product">
                        <AddToCartBtn />
                        <AddToFavoriteBtn />
                    </div>
                    <Accordeon />
                </div>
            </div>
            <CustomersReviewSlider />
            <InterestedSlider />
        </div>
    );
};

export default ProductPage;
