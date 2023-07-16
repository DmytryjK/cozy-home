import { Header } from '../../shared-components/Header';
import Footer from '../../shared-components/Footer/Footer';
import CategoryList from './components/CategoryList/CategoryList';
import Filters from './components/Filters/Filters';
import SortProducts from './components/SortProducts/SortProducts';
import SearchedQuantity from './components/SearchedQuantity/SearchedQuantity';
import './CatalogPage.scss';

const CatalogPage = () => {
    return (
        <>
            <Header />
            <CategoryList />
            <section className="catalog-content">
                <div className="container container_content-wrapper ">
                    <Filters />
                    <div className="catalog__main-content main-content">
                        <div className="main-content__top">
                            <SearchedQuantity quantityResults={1005} />
                            <SortProducts />
                        </div>
                        <div className="main-content__products">dsfasdfa</div>
                        <div className="main-content__pagination">asdfasf</div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default CatalogPage;
