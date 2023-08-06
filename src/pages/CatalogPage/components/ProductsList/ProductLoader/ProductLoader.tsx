import ErrorMessage from '../../../../../shared-components/ErrorMessage';
import Loader from '../../../../../shared-components/Loader';
import { useAppSelector } from '../../../../../hooks/hooks';

const ProductLoader = () => {
    const { loading, error } = useAppSelector((state) => state.catalogProducts);
    const renderItems = () => {
        if (error) {
            return <ErrorMessage />;
        }
        if (loading !== 'succeeded') {
            return (
                <div className="catalog-products__loading-wrapper">
                    <Loader maxHeight="80dvh" />
                </div>
            );
        }
        return '';
    };
    return <>{renderItems()}</>;
};

export default ProductLoader;
