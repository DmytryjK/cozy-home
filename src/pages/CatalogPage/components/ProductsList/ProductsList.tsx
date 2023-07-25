import React, { useEffect } from 'react';
import nextId from 'react-id-generator';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { fetchCatalogProductsByFilters } from '../../../../store/reducers/catalogFilterSlice';
import ProductCard from '../../../../shared-components/ProductCard/ProductCard';
import renderServerData from '../../../../helpers/renderServerData';
import './ProductsList.scss';

const ProductsList = () => {
    const dispatch = useAppDispatch();
    const { catalogProducts, error, loading, globalFiltersQuery } =
        useAppSelector((state) => state.catalogFilters);

    const { id } = globalFiltersQuery;

    useEffect(() => {
        if (id) {
            dispatch(
                fetchCatalogProductsByFilters({ ...globalFiltersQuery, id })
            );
        }
    }, [id]);

    const items = () => {
        return catalogProducts.map((catalogProduct) => {
            return (
                <li
                    key={nextId('card-of-catalogItem')}
                    className="catalog-products__card"
                >
                    <ProductCard product={catalogProduct} />
                </li>
            );
        });
    };

    // catalog-products__list

    return (
        <section className="catalog-products">
            <ul className="catalog-products__list">
                {renderServerData({
                    error,
                    loading,
                    content: items,
                })}
            </ul>
        </section>
    );
};

export default ProductsList;
