import { useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import ProductImagesSlider from '../ProductImagesSlider/ProductImagesSlider';
import ProductRating from '../ProductRating/ProductRating';
import ColorSelection from '../ColorSelection/ColorSelection';
import ProductPrice from '../ProductPrice/ProductPrice';
import AddProductBlock from '../AddProductBlock/AddProductBlock';
import Accordeon from '../Accordeon/Accordeon';
import pluralizeUkrainian from '../../../../helpers/pluralizeUkrainian';
import Loader from '../../../../shared-components/Loader';

const ProductInfoContainer = () => {
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
    const { loading } = useAppSelector((state) => state.productInformation);

    return (
        <div className="product-page__wrapper container">
            {loading === 'pending' ? (
                <Loader className="product-page__loader" />
            ) : (
                ''
            )}
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
    );
};

export default ProductInfoContainer;
