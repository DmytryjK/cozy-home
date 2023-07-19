import { MainPage, CatalogPage, CategoryPage } from './pages';
import './App.scss';
import Layout from './shared-components/Layout/Layout';

const App = () => {
    return (
        <Layout>
            {/* <MainPage /> */}
            <CategoryPage />
            <CatalogPage />
        </Layout>
    );
};

export default App;
