import Header from '../../components/Header/Header';
import PopularItems from '../../components/PopularItems/PopularItems';
import MainBanner from '../../components/MainBanner/MainBanner';
import NewItems from '../../components/NewItems/NewItems';
import './MainPage.scss';

const MainPage = () => {
    return (
        <div>
            <Header />
            <MainBanner />
            <NewItems />
            <PopularItems />
        </div>
    );
};

export default MainPage;
