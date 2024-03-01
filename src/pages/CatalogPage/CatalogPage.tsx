import { motion } from 'framer-motion';
import CategoryList from './components/CategoryList/CategoryList';
import ArrowUp from '../../shared-components/ArrowUp';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import Filters from './components/Filters/Filters';
import SortProducts from './components/SortProducts/SortProducts';
import SearchedQuantity from './components/SearchedQuantity/SearchedQuantity';
import Navigation from './components/Navigation/Navigation';
import ProductsList from './components/ProductsList/ProductsList';
import OpenFiltersButton from './components/OpenFiltersButton/OpenFiltersButton';
import './CatalogPage.scss';

const CatalogPage = () => {
    const variant = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                delay: 0,
                easing: 'easy-out',
            },
        },
    };

    return (
        <motion.section
            initial="hidden"
            variants={variant}
            whileInView="visible"
            viewport={{ once: true }}
            className="catalog"
        >
            <Breadcrumbs />
            <CategoryList />
            <div className="catalog-content" id="catalog-content">
                <div className="container container_content-wrapper">
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
                            {/* <Pagination /> */}
                            <Navigation />
                        </div>
                    </div>
                </div>
            </div>
            <ArrowUp />
        </motion.section>
    );
};

export default CatalogPage;
