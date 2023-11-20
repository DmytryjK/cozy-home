import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import InterestedSlider from './components/InterestedSlider/InterestedSlider';
import ProductInfoContainer from './components/ProductInfoContainer/ProductInfoContainer';
import CustomersReviewSlider from './components/CustomersReviewSlider/CustomersReviewSlider';
import './ProductPage.scss';

const ProductPage = () => {
    return (
        <div className="product-page" id="productPage">
            <Breadcrumbs />
            <ProductInfoContainer />
            <CustomersReviewSlider />
            <InterestedSlider />
        </div>
    );
};

export default ProductPage;
