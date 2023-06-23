import Header from '../../components/Header/Header';
import PopularItems from '../../components/PopularItems/PopularItems';
import MainBanner from '../../components/MainBanner/MainBanner';
import NewItems from '../../components/NewItems/NewItems';
import './MainPage.scss';
import CatalogueBlock from '../../components/CatalogueBlock/CatalogueBlock';

const MainPage = () => {
    return (
        <div>
            <Header />
            <MainBanner />
            <CatalogueBlock />
            <NewItems />
            <PopularItems />
        </div>
    );
};

export default MainPage;
