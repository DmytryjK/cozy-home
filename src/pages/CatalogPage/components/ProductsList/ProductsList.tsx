import React, { useEffect } from 'react';
import nextId from 'react-id-generator';
import { useAppSelector } from '../../../../hooks/hooks';
import ProductCard from '../../../../shared-components/ProductCard/ProductCard';
import './ProductsList.scss';

const ProductsList = () => {
    const catalogProducts = useAppSelector(
        (state) => state.catalogProducts.catalogProducts
    );

    const renderItems = () => {
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

    return (
        <section className="catalog-products">
            <ul className="catalog-products__list">{renderItems()}</ul>
        </section>
    );
};

export default ProductsList;
