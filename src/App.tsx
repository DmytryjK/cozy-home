import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './shared-components/Layout/Layout';
import routes from './routes';
import ScrollToTop from './shared-components/ScrollToTop/ScrollToTop';
import './App.scss';

const App = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.3,
            easing: (t) => Math.min(1, 1.001 - 2 ** (-7 * t)),
        });

        function raf(time: any) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);
    return (
        <BrowserRouter>
            <ScrollToTop />
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
