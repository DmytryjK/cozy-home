import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import { fetchMightBeInterestProducts } from '../../../../store/reducers/productsSliderSlice';
import ProductsSlider from '../../../../shared-components/ProductsSlider/ProductsSlider';

const InterestedSlider = () => {
    const { interestedProducts, loadingInterested, errorInterested } =
        useAppSelector((state) => state.productsSlider);
    const productInfo = useAppSelector(
        (state) => state.productInformation.productInfo
    );
    const storageCurrentSku = localStorage.getItem('productSkuCode');
    const dispatch = useAppDispatch();
    const { collection, skuCode } = productInfo;
    useEffect(() => {
        if (!collection.id || skuCode !== storageCurrentSku) return;
        dispatch(
            fetchMightBeInterestProducts({
                collectionId: collection.id,
                productSkuCode: skuCode,
            })
        );
    }, [productInfo]);
    return (
        <section className="product-page__interested">
            <ProductsSlider
                title="Також може зацікавити"
                products={interestedProducts}
                loading={loadingInterested}
                error={errorInterested}
            />
        </section>
    );
};

export default InterestedSlider;
