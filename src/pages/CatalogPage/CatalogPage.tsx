import CategoryList from './components/CategoryList/CategoryList';
import ArrowUp from '../../shared-components/ArrowUp';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import Content from './components/Content/Content';
import './CatalogPage.scss';

const CatalogPage = () => {
    return (
        <section className="catalog">
            <Breadcrumbs />
            <CategoryList />
            <div className="catalog-content">
                <div className="container container_content-wrapper ">
                    <Content />
                </div>
            </div>
            <ArrowUp />
        </section>
    );
};

export default CatalogPage;
