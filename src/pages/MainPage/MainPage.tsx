import { Header } from '../../shared-components/Header';
import PopularItems from './components/PopularItems/PopularItems';
import MainBanner from './components/MainBanner/MainBanner';
import NewItems from './components/NewItems/NewItems';
import Promo from './components/Promo/Promo';
import './MainPage.scss';
import CatalogueBlock from './components/CatalogueBlock/CatalogueBlock';
import Footer from '../../shared-components/Footer/Footer';
import InformationBlock from './components/InformationBlock/InformationBlock';

const MainPage = () => {
    return (
        <div>
            <Header />
            <MainBanner />
            <CatalogueBlock />
            <NewItems />
            <InformationBlock />
            <PopularItems />
            <Promo />
            <Footer />
        </div>
    );
};

export default MainPage;
