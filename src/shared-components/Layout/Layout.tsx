import { ReactNode } from 'react';
import { Header } from '../Header';
import AllModals from '../AllModals/AllModals';
import Footer from '../Footer/Footer';
import PrivateRoutes from '../../PrivateRoutes';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
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
