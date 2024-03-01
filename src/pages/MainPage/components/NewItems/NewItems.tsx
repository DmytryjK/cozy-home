import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import { fetchNewItemsAllProducts } from '../../../../store/reducers/productsSliderSlice';
import ProductsSlider from '../../../../shared-components/ProductsSlider/ProductsSlider';

// const NewItems = () => {
//     const { newProducts, loadingNew, errorNew } = useAppSelector(
//         (state) => state.productsSlider
//     );
//     const dispatch = useAppDispatch();
//     useEffect(() => {
//         if (newProducts.length === 0) {
//             dispatch(fetchNewItemsAllProducts());
//         }
//     }, [dispatch]);
//     return (
//         <section className="main-page__new-items">
//             <ProductsSlider
//                 title="Новинки"
//                 products={newProducts}
//                 loading={loadingNew}
//                 error={errorNew}
//             />
//         </section>
//     );
// };
const NewItems = () => {
    const { loadingNew, errorNew } = useAppSelector(
        (state) => state.productsSlider
    );
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     if (newProducts.length === 0) {
    //         dispatch(fetchNewItemsAllProducts());
    //     }
    // }, [dispatch]);

    const newProducts = [
        {
            skuCode: '240006',
            name: 'Крісло Signal',
            shortDescription: 'Крісло шкіряне з металевими ніжками',
            price: 3999,
            discount: null,
            priceWithDiscount: null,
            imageDtoList: [
                {
                    id: '65503db305a833099a1e0f8b',
                    imagePath:
                        'https://cozy-home.onrender.com/api/v1/image?imageName=products/240006 grey_1 photo_preview_path(328x428).jpg',
                    color: 'Сірий',
                },
            ],
            colorDtoList: [
                {
                    id: '#545454',
                    name: 'Сірий',
                    quantityStatus: 'В наявності',
                },
                {
                    id: '#C57100',
                    name: 'Коричневий',
                    quantityStatus: 'В наявності',
                },
            ],
            productQuantityStatus: 'В наявності',
            favorite: false,
        },
        {
            skuCode: '240007',
            name: 'Крісло Signal',
            shortDescription: 'Крісло шкіряне з металевими ніжками',
            price: 3999,
            discount: null,
            priceWithDiscount: null,
            imageDtoList: [
                {
                    id: '65503db305a833099a1e0f8b',
                    imagePath:
                        'https://cozy-home.onrender.com/api/v1/image?imageName=products/240006 grey_1 photo_preview_path(328x428).jpg',
                    color: 'Сірий',
                },
            ],
            colorDtoList: [
                {
                    id: '#545454',
                    name: 'Сірий',
                    quantityStatus: 'В наявності',
                },
                {
                    id: '#C57100',
                    name: 'Коричневий',
                    quantityStatus: 'В наявності',
                },
            ],
            productQuantityStatus: 'В наявності',
            favorite: false,
        },
        {
            skuCode: '240008',
            name: 'Крісло Signal',
            shortDescription: 'Крісло шкіряне з металевими ніжками',
            price: 3999,
            discount: null,
            priceWithDiscount: null,
            imageDtoList: [
                {
                    id: '65503db305a833099a1e0f8b',
                    imagePath:
                        'https://cozy-home.onrender.com/api/v1/image?imageName=products/240006 grey_1 photo_preview_path(328x428).jpg',
                    color: 'Сірий',
                },
            ],
            colorDtoList: [
                {
                    id: '#545454',
                    name: 'Сірий',
                    quantityStatus: 'В наявності',
                },
                {
                    id: '#C57100',
                    name: 'Коричневий',
                    quantityStatus: 'В наявності',
                },
            ],
            productQuantityStatus: 'В наявності',
            favorite: false,
        },
        {
            skuCode: '240009',
            name: 'Крісло Signal',
            shortDescription: 'Крісло шкіряне з металевими ніжками',
            price: 3999,
            discount: null,
            priceWithDiscount: null,
            imageDtoList: [
                {
                    id: '65503db305a833099a1e0f8b',
                    imagePath:
                        'https://cozy-home.onrender.com/api/v1/image?imageName=products/240006 grey_1 photo_preview_path(328x428).jpg',
                    color: 'Сірий',
                },
            ],
            colorDtoList: [
                {
                    id: '#545454',
                    name: 'Сірий',
                    quantityStatus: 'В наявності',
                },
                {
                    id: '#C57100',
                    name: 'Коричневий',
                    quantityStatus: 'В наявності',
                },
            ],
            productQuantityStatus: 'В наявності',
            favorite: false,
        },
        {
            skuCode: '240010',
            name: 'Крісло Signal',
            shortDescription: 'Крісло шкіряне з металевими ніжками',
            price: 3999,
            discount: null,
            priceWithDiscount: null,
            imageDtoList: [
                {
                    id: '65503db305a833099a1e0f8b',
                    imagePath:
                        'https://cozy-home.onrender.com/api/v1/image?imageName=products/240006 grey_1 photo_preview_path(328x428).jpg',
                    color: 'Сірий',
                },
            ],
            colorDtoList: [
                {
                    id: '#545454',
                    name: 'Сірий',
                    quantityStatus: 'В наявності',
                },
                {
                    id: '#C57100',
                    name: 'Коричневий',
                    quantityStatus: 'В наявності',
                },
            ],
            productQuantityStatus: 'В наявності',
            favorite: false,
        },
        {
            skuCode: '240011',
            name: 'Крісло Signal',
            shortDescription: 'Крісло шкіряне з металевими ніжками',
            price: 3999,
            discount: null,
            priceWithDiscount: null,
            imageDtoList: [
                {
                    id: '65503db305a833099a1e0f8b',
                    imagePath:
                        'https://cozy-home.onrender.com/api/v1/image?imageName=products/240006 grey_1 photo_preview_path(328x428).jpg',
                    color: 'Сірий',
                },
            ],
            colorDtoList: [
                {
                    id: '#545454',
                    name: 'Сірий',
                    quantityStatus: 'В наявності',
                },
                {
                    id: '#C57100',
                    name: 'Коричневий',
                    quantityStatus: 'В наявності',
                },
            ],
            productQuantityStatus: 'В наявності',
            favorite: false,
        },
        {
            skuCode: '240012',
            name: 'Крісло Signal',
            shortDescription: 'Крісло шкіряне з металевими ніжками',
            price: 3999,
            discount: null,
            priceWithDiscount: null,
            imageDtoList: [
                {
                    id: '65503db305a833099a1e0f8b',
                    imagePath:
                        'https://cozy-home.onrender.com/api/v1/image?imageName=products/240006 grey_1 photo_preview_path(328x428).jpg',
                    color: 'Сірий',
                },
            ],
            colorDtoList: [
                {
                    id: '#545454',
                    name: 'Сірий',
                    quantityStatus: 'В наявності',
                },
                {
                    id: '#C57100',
                    name: 'Коричневий',
                    quantityStatus: 'В наявності',
                },
            ],
            productQuantityStatus: 'В наявності',
            favorite: false,
        },
        {
            skuCode: '240013',
            name: 'Крісло Signal',
            shortDescription: 'Крісло шкіряне з металевими ніжками',
            price: 3999,
            discount: null,
            priceWithDiscount: null,
            imageDtoList: [
                {
                    id: '65503db305a833099a1e0f8b',
                    imagePath:
                        'https://cozy-home.onrender.com/api/v1/image?imageName=products/240006 grey_1 photo_preview_path(328x428).jpg',
                    color: 'Сірий',
                },
            ],
            colorDtoList: [
                {
                    id: '#545454',
                    name: 'Сірий',
                    quantityStatus: 'В наявності',
                },
                {
                    id: '#C57100',
                    name: 'Коричневий',
                    quantityStatus: 'В наявності',
                },
            ],
            productQuantityStatus: 'В наявності',
            favorite: false,
        },
        {
            skuCode: '240014',
            name: 'Крісло Signal',
            shortDescription: 'Крісло шкіряне з металевими ніжками',
            price: 3999,
            discount: null,
            priceWithDiscount: null,
            imageDtoList: [
                {
                    id: '65503db305a833099a1e0f8b',
                    imagePath:
                        'https://cozy-home.onrender.com/api/v1/image?imageName=products/240006 grey_1 photo_preview_path(328x428).jpg',
                    color: 'Сірий',
                },
            ],
            colorDtoList: [
                {
                    id: '#545454',
                    name: 'Сірий',
                    quantityStatus: 'В наявності',
                },
                {
                    id: '#C57100',
                    name: 'Коричневий',
                    quantityStatus: 'В наявності',
                },
            ],
            productQuantityStatus: 'В наявності',
            favorite: false,
        },
    ];
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
