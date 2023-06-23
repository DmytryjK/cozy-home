import Header from '../../components/Header/Header';
import PopularItems from '../../components/PopularItems/PopularItems';
import NewItems from '../../components/NewItems/NewItems';
import './MainPage.scss';

const MainPage = () => {
    return (
        <div>
            <Header />
            <NewItems />
            <PopularItems />
        </div>
    );
};

export default MainPage;
