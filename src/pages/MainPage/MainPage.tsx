import { lazy, Suspense } from 'react';
// import MainBanner from './components/MainBanner/MainBanner';
// import Promo from './components/Promo/Promo';
// import CatalogueBlock from './components/CatalogueBlock/CatalogueBlock';
// import NewItems from './components/NewItems/NewItems';
// import PopularItems from './components/PopularItems/PopularItems';
// import InformationBlock from './components/InformationBlock/InformationBlock';
import ArrowUp from '../../shared-components/ArrowUp';
import './MainPage.scss';

const MainBanner = lazy(() => import('./components/MainBanner/MainBanner'));
const Promo = lazy(() => import('./components/Promo/Promo'));
const CatalogueBlock = lazy(
    () => import('./components/CatalogueBlock/CatalogueBlock')
);
const InformationBlock = lazy(
    () => import('./components/InformationBlock/InformationBlock')
);
const NewItems = lazy(() => import('./components/NewItems/NewItems'));
const PopularItems = lazy(
    () => import('./components/PopularItems/PopularItems')
);

const MainPage = () => {
    return (
        <>
            <MainBanner />
            <CatalogueBlock />
            <Suspense fallback="Loading...">
                <NewItems />
            </Suspense>
            <InformationBlock />
            <Suspense fallback="Loading...">
                <PopularItems />
            </Suspense>
            <Promo />
            <ArrowUp />
        </>
    );
};

export default MainPage;
