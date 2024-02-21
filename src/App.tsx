import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import Layout from './shared-components/Layout/Layout';
import routes from './routes';
import ScrollToTop from './shared-components/ScrollToTop/ScrollToTop';
import './App.scss';

const App = () => {
    const lenis = useLenis(({ scroll }) => {
        // called every scroll
    });

    return (
        <BrowserRouter>
            <ScrollToTop />
            <ReactLenis root>
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
            </ReactLenis>
        </BrowserRouter>
    );
};

export default App;
