import { useState } from 'react';
import CategoryList from './components/CategoryList/CategoryList';
import Filters from './components/Filters/Filters';
import SortProducts from './components/SortProducts/SortProducts';
import SearchedQuantity from './components/SearchedQuantity/SearchedQuantity';
import Pagination from './components/Pagination/Pagination';
import ArrowUp from './components/ArrowUp/ArrowUp';
import './CatalogPage.scss';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import ProductsList from './components/ProductsList/ProductsList';

const CatalogPage = () => {
    const crumbs = ['Головна', 'Каталог', 'Дивани'];
    const [isFilterShowed, setIsFilterShowed] = useState<boolean>(false);
    return (
        <>
            <Breadcrumbs crumbs={crumbs} />
            <CategoryList />
            <section className="catalog-content">
                <div className="container container_content-wrapper ">
                    <Filters
                        showFilter={isFilterShowed}
                        setShowFilter={setIsFilterShowed}
                    />
                    <div className="catalog__main-content main-content">
                        <div className="main-content__top">
                            <SearchedQuantity quantityResults={1005} />
                            <button
                                className="main-content__filters-btn"
                                type="button"
                                onClick={() =>
                                    setIsFilterShowed(!isFilterShowed)
                                }
                            >
                                Фільтри
                            </button>
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
