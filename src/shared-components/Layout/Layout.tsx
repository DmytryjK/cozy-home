import { ReactNode, Suspense, useRef } from 'react';
import { Header } from '../Header';
import Footer from '../Footer/Footer';
import PagePreloader from '../PagePreloader/PagePreloader';
import AllModals from '../AllModals/AllModals';
import './Layout.scss';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const headerRef = useRef<HTMLDivElement | null>(null);
    const footerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="layout">
            <Header ref={headerRef} />
            <Suspense
                fallback={
                    <PagePreloader
                        headerRef={headerRef}
                        footerRef={footerRef}
                    />
                }
            >
                {children}
            </Suspense>
            <AllModals />
            <Footer ref={footerRef} />
        </div>
    );
};

export default Layout;
