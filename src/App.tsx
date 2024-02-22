import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';
import Layout from './shared-components/Layout/Layout';
import routes from './routes';
import ScrollToTop from './shared-components/ScrollToTop/ScrollToTop';
import './App.scss';

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <ReactLenis
                options={{
                    duration: 1,
                    easing: (t) => Math.min(1, 1.001 - 2 ** (-13 * t)),
                    lerp: 0.08,
                }}
                root
            >
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
