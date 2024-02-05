import { useState, useContext, useEffect, memo } from 'react';
import NavigationListOfCategories from '../../../../shared-components/NavigationListOfCategories/NavigationListOfCategories';
import ProductCard from '../../../../shared-components/ProductCard/ProductCard';
import Pagination2 from '../../../../shared-components/Pagination2/Pagination2';
import { useAppSelector } from '../../../../hooks/hooks';
import Loader from '../../../../shared-components/Loader';
import type { ProductCardType } from '../../../../types/types';
import { FavoritesContext } from '../CabinetContent';

import './UserFavorites.scss';

const UserFavorites = () => {
    const {
        currentPage,
        setCurrentPage,
        activeCategory,
        setActiveCategory,
        setIsPaginationInit,
    } = useContext(FavoritesContext);

    const userFavorites = useAppSelector(
        (state) => state.userActions.userFavorites
    );
    const loadingUserFavorites = useAppSelector(
        (state) => state.userActions.loadingUserFavorites
    );
    const categories = useAppSelector(
        (state) => state.userActions.userFavoritsCategories
    );

    return (
        <div className="user-favorites">
            <h1 className="user-favorites__title">Список бажань</h1>
            <NavigationListOfCategories
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <ul className="user-favorites__products">
                {loadingUserFavorites !== 'succeeded' ? (
                    <Loader />
                ) : (
                    userFavorites?.products.map((product: ProductCardType) => {
                        return (
                            <li
                                className="user-favorites__item"
                                key={product.skuCode}
                            >
                                <ProductCard product={product} />
                            </li>
                        );
                    })
                )}
            </ul>
            <div className="user-favorites__pagination-wrapper">
                <Pagination2
                    countOfPages={userFavorites?.countOfPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setIsPaginationInit={setIsPaginationInit}
                />
            </div>
        </div>
    );
};

export default memo(UserFavorites);
