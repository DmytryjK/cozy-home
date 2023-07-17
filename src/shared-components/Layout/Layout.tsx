import React, { ReactNode } from 'react';
import { Header } from '../Header';
import Footer from '../Footer/Footer';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
