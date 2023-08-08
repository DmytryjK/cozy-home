import CategoryList from './components/CategoryList/CategoryList';
import ArrowUp from '../../shared-components/ArrowUp';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import Filters from './components/Filters/Filters';
import SortProducts from './components/SortProducts/SortProducts';
import SearchedQuantity from './components/SearchedQuantity/SearchedQuantity';
import Pagination from './components/Pagination/Pagination';
import ProductsList from './components/ProductsList/ProductsList';
import OpenFiltersButton from './components/OpenFiltersButton/OpenFiltersButton';
import './CatalogPage.scss';

const CatalogPage = () => {
    return (
        <section className="catalog">
            <Breadcrumbs />
            <CategoryList />
            <div className="catalog-content">
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
            </div>
            <ArrowUp />
        </section>
    );
};

export default CatalogPage;
