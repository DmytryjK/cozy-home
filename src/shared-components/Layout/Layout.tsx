import { ReactNode, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Header } from '../Header';
import AllModals from '../AllModals/AllModals';
import Footer from '../Footer/Footer';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.3,
            easing: (t) => Math.min(1, 1.001 - 2 ** (-7 * t)),
        });

        lenis.on('scroll', (e: any) => {
            console.log(e);
        });

        function raf(time: any) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    return (
        <div>
            <Header />
            {children}
            <AllModals />
            <Footer />
        </div>
    );
};

export default Layout;
