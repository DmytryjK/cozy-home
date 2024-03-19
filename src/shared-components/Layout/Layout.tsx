import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import Footer from '../Footer/Footer';
import { PagePreloader } from '../Loaders';
import './Layout.scss';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const AllModals = lazy(() => import('../AllModals/AllModals'));
const ReactLenis = lazy(() => import('@studio-freight/react-lenis'));
const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <Suspense fallback={<PagePreloader />}>
                <ReactLenis
                    options={{
                        duration: 0.7,
                        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
                        lerp: 0.1,
                        syncTouch: false,
                        syncTouchLerp: 1,
                    }}
                    root
                >
                    <Outlet />
                </ReactLenis>
            </Suspense>
            <AllModals />
            <ScrollToTop />
            <Footer />
        </div>
    );
};

export default Layout;
