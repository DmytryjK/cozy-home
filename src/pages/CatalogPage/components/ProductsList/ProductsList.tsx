import React, { useEffect } from 'react';
import nextId from 'react-id-generator';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { fetchCatalogProductsByFilters } from '../../../../store/reducers/catalogFilterSlice';
import ProductCard from '../../../../shared-components/ProductCard/ProductCard';

const ProductsList = () => {
    const dispatch = useAppDispatch();
    const { catalogProducts } = useAppSelector((state) => state.catalogFilters);

    useEffect(() => {
        const id = '64b6ddea032a9002059bdaee';
        const page = '';
        const size = '4';

        dispatch(
            fetchCatalogProductsByFilters({
                id,
                page,
                size,
            })
        );
    }, [dispatch]);

    useEffect(() => {
        console.log(catalogProducts);
    }, [catalogProducts]);

    const items = () => {
        return catalogProducts.map((catalogProduct) => {
            return (
                <li
                    key={nextId('card-of-catalogItem')}
                    className="new-items__card"
                >
                    <ProductCard product={catalogProduct} />
                </li>
            );
        });
    };

    return <div>{items()}</div>;
};

export default ProductsList;
