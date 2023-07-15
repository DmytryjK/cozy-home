import { Header } from '../../shared-components/Header';
import Footer from '../../shared-components/Footer/Footer';
import CategoryList from './components/CategoryList/CategoryList';

const CatalogPage = () => {
    return (
        <>
            <Header />
            <CategoryList />
            <Footer />
        </>
    );
};

export default CatalogPage;
