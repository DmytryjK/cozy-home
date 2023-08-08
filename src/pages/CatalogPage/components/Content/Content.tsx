import Filters from '../Filters/Filters';
import SortProducts from '../SortProducts/SortProducts';
import SearchedQuantity from '../SearchedQuantity/SearchedQuantity';
import Pagination from '../Pagination/Pagination';
import ProductsList from '../ProductsList/ProductsList';
import OpenFiltersButton from '../OpenFiltersButton/OpenFiltersButton';

const Content = () => {
    return (
        <div className="container container_content-wrapper ">
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
        </div>
    );
};

export default Content;
