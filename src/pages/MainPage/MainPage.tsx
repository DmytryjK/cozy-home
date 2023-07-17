import PopularItems from './components/PopularItems/PopularItems';
import MainBanner from './components/MainBanner/MainBanner';
import NewItems from './components/NewItems/NewItems';
import Promo from './components/Promo/Promo';
import './MainPage.scss';
import CatalogueBlock from './components/CatalogueBlock/CatalogueBlock';
import InformationBlock from './components/InformationBlock/InformationBlock';
import ArrowUp from '../CatalogPage/components/ArrowUp/ArrowUp';

const MainPage = () => {
    return (
        <>
            <MainBanner />
            <CatalogueBlock />
            <NewItems />
            <InformationBlock />
            <PopularItems />
            <Promo />
            <Footer />
            <ArrowUp />
        </>
    );
};

export default MainPage;
