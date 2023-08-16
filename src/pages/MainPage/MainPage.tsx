import PopularItems from './components/PopularItems/PopularItems';
import NewItems from './components/NewItems/NewItems';
import MainBanner from './components/MainBanner/MainBanner';
import Promo from './components/Promo/Promo';
import './MainPage.scss';
import CatalogueBlock from './components/CatalogueBlock/CatalogueBlock';
import InformationBlock from './components/InformationBlock/InformationBlock';
import ArrowUp from '../../shared-components/ArrowUp';

const MainPage = () => {
    return (
        <>
            <MainBanner />
            <CatalogueBlock />
            <NewItems />
            <InformationBlock />
            <PopularItems />
            <Promo />
            <ArrowUp />
        </>
    );
};

export default MainPage;
