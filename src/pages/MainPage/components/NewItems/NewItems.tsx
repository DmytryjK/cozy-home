import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import { fetchNewItemsAllProducts } from '../../../../store/reducers/productsSliderSlice';
import ProductsSlider from '../../../../shared-components/ProductsSlider/ProductsSlider';

const NewItems = () => {
    const { newProducts, loadingNew, errorNew } = useAppSelector(
        (state) => state.productsSlider
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchNewItemsAllProducts());
    }, [dispatch]);
    return (
        <section className="main-page__new-items">
            <ProductsSlider
                title="Новинки"
                products={newProducts}
                loading={loadingNew}
                error={errorNew}
            />
        </section>
    );
};

export default NewItems;
