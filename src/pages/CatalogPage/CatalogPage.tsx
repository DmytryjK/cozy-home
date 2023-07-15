import { Header } from '../../shared-components/Header';
import Footer from '../../shared-components/Footer/Footer';
import CategoryList from './components/CategoryList/CategoryList';
import Filters from './components/Filters/Filters';

const CatalogPage = () => {
    return (
        <>
            <Header />
            <CategoryList />
            <Filters />
            <Footer />
        </>
    );
};

export default CatalogPage;
