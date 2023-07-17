import PopularItems from './components/PopularItems/PopularItems';
import MainBanner from './components/MainBanner/MainBanner';
import NewItems from './components/NewItems/NewItems';
import Promo from './components/Promo/Promo';
import './MainPage.scss';
import CatalogueBlock from './components/CatalogueBlock/CatalogueBlock';
import InformationBlock from './components/InformationBlock/InformationBlock';

const MainPage = () => {
    return (
        <>
            <MainBanner />
            <CatalogueBlock />
            <NewItems />
            <InformationBlock />
            <PopularItems />
            <Promo />
        </>
    );
};

export default MainPage;
