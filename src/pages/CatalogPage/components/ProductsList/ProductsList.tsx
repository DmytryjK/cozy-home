import React, { useEffect } from 'react';
import nextId from 'react-id-generator';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { fetchCatalogProductsByFilters } from '../../../../store/reducers/catalogProductsSlice';
import ProductCard from '../../../../shared-components/ProductCard/ProductCard';
import renderServerData from '../../../../helpers/renderServerData';
import './ProductsList.scss';

const ProductsList = () => {
    const dispatch = useAppDispatch();
    const { catalogProducts, error, loading } = useAppSelector(
        (state) => state.catalogProducts
    );
    const endpoint = useAppSelector(
        (state) => state.catalogFilters.globalFiltersQuery.extraEndpoint
    );
    const categoryId = useAppSelector(
        (state) => state.catalogFilters.globalFiltersQuery.id
    );
    const currentPage = useAppSelector(
        (state) => state.catalogFilters.globalFiltersQuery.page
    );

    useEffect(() => {
        if (categoryId) {
            dispatch(
                fetchCatalogProductsByFilters({
                    extraEndpoint: endpoint,
                    id: categoryId,
                    page: currentPage,
                    size: '12',
                })
            );
        }
    }, [categoryId, currentPage]);

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
