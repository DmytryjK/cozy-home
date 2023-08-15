import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchNewItemsAllProducts } from '../../store/reducers/productsSliderSlice';
import PopularItems from './components/PopularItems/PopularItems';
import MainBanner from './components/MainBanner/MainBanner';
import ProductsSlider from '../../shared-components/ProductsSlider/ProductsSlider';
import Promo from './components/Promo/Promo';
import './MainPage.scss';
import CatalogueBlock from './components/CatalogueBlock/CatalogueBlock';
import InformationBlock from './components/InformationBlock/InformationBlock';
import ArrowUp from '../../shared-components/ArrowUp';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { newProducts, loadingNew, errorNew } = useAppSelector(
        (state) => state.productsSlider
    );

    useEffect(() => {
        dispatch(fetchNewItemsAllProducts());
    }, [dispatch]);

    return (
        <>
            <MainBanner />
            <CatalogueBlock />
            <section className="main-page__new-items">
                <ProductsSlider
                    title="Новинки"
                    products={newProducts}
                    loading={loadingNew}
                    error={errorNew}
                />
            </section>
            <InformationBlock />
            <PopularItems />
            <Promo />
            <ArrowUp />
        </>
    );
};

export default MainPage;
