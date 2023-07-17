import { MainPage, CatalogPage } from './pages';
import './App.scss';
import Layout from './shared-components/Layout/Layout';

const App = () => {
    return (
        <Layout>
            {/* <MainPage /> */}
            <CatalogPage />
        </Layout>
    );
};

export default App;
