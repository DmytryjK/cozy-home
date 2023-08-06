import { useAppSelector } from '../../../../hooks/hooks';
import Filters from '../Filters/Filters';
import SortProducts from '../SortProducts/SortProducts';
import SearchedQuantity from '../SearchedQuantity/SearchedQuantity';
import Pagination from '../Pagination/Pagination';
import ProductsList from '../ProductsList/ProductsList';
import OpenFiltersButton from '../OpenFiltersButton/OpenFiltersButton';
import Loader from '../../../../shared-components/Loader';
import ErrorMessage from '../../../../shared-components/ErrorMessage';

const Content = () => {
    const productsLoading = useAppSelector(
        (state) => state.catalogProducts.loading
    );
    const productsError = useAppSelector(
        (state) => state.catalogProducts.error
    );
    const filterLoadError = useAppSelector(
        (state) => state.catalogFilters.error
    );
    const filterLoading = useAppSelector(
        (state) => state.catalogFilters.loading
    );

    const renderContent = () => {
        if (productsError || filterLoadError) {
            return <ErrorMessage />;
        }
        if (productsLoading === 'succeeded' && filterLoading === 'succeeded') {
            return (
                <>
                    <Filters />
                    <div className="catalog__main-content main-content">
                        <div className="main-content__top">
                            <SearchedQuantity />
                            <OpenFiltersButton />
                            <SortProducts />
                        </div>
                        <div className="main-content__products">
                            <ProductsList />
                        </div>
                        <div className="main-content__bottom">
                            <Pagination />
                        </div>
                    </div>
                </>
            );
        }
        return <Loader minHeight="60dvh" />;
    };
    return (
        <div className="container container_content-wrapper ">
            {renderContent()}
        </div>
    );
};

export default Content;
