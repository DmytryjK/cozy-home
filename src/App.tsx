import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage, CatalogPage, CategoryPage } from './pages';
import Layout from './shared-components/Layout/Layout';
import routes from './routes';
import './App.scss';

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {routes.map((link) => {
                        return (
                            <Route
                                key={link.path}
                                path={link.path}
                                element={link.element}
                            />
                        );
                    })}
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
