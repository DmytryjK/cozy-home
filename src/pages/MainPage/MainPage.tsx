import Header from '../../components/Header/Header';
import MainBanner from '../../components/MainBanner/MainBanner';
import NewItems from '../../components/NewItems/NewItems';
import './MainPage.scss';

const MainPage = () => {
    return (
        <div>
            <Header />
            <MainBanner />
            <NewItems />
        </div>
    );
};

export default MainPage;
