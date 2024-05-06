import { useLocation } from 'react-router';
import { useAppSelector } from '../../hooks/hooks';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import InterestedSlider from './components/InterestedSlider/InterestedSlider';
import ProductInfoContainer from './components/ProductInfoContainer/ProductInfoContainer';
import CustomersReviewSlider from './components/CustomersReviewSlider/CustomersReviewSlider';
import './ProductPage.scss';

const ProductPage = () => {
    const productName = useAppSelector(
        (state) => state.productInformation.productInfo.name
    );
    const productCategory = useAppSelector(
        (state) => state.productInformation.productInfo.categoryName
    );
    const { pathname } = useLocation();
    const splittedPath = pathname.split('/');
    const productPath = `/${splittedPath[3]}`;
    const categoryPath = `/${splittedPath[2]}`;
    return (
        <div className="product-page" id="productPage">
            {productName ? (
                <Breadcrumbs
                    dynamicParams={[
                        {
                            path: categoryPath,
                            name: productCategory,
                        },
                        {
                            path: productPath,
                            name: productName,
                        },
                    ]}
                />
            ) : (
                ''
            )}
            <ProductInfoContainer />
            <CustomersReviewSlider />
            <InterestedSlider />
        </div>
    );
};

export default ProductPage;
