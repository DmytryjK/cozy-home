import CategoryList from './components/CategoryList/CategoryList';
import Filters from './components/Filters/Filters';
import SortProducts from './components/SortProducts/SortProducts';
import SearchedQuantity from './components/SearchedQuantity/SearchedQuantity';
import Pagination from './components/Pagination/Pagination';
import ArrowUp from './components/ArrowUp/ArrowUp';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import ProductsList from './components/ProductsList/ProductsList';
import OpenFiltersButton from './components/OpenFiltersButton/OpenFiltersButton';
import './CatalogPage.scss';

const CatalogPage = () => {
    return (
        <>
            <Breadcrumbs />
            <CategoryList />
            <section className="catalog-content">
                <div className="container container_content-wrapper ">
                    <Filters />
                    <div className="catalog__main-content main-content">
                        <div className="main-content__top">
                            <SearchedQuantity quantityResults={1005} />
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
            </section>
            <ArrowUp />
        </>
    );
};

export default CatalogPage;
