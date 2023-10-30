import { useState, useEffect, useContext } from 'react';
import NavigationListOfCategories from '../../../../shared-components/NavigationListOfCategories/NavigationListOfCategories';
import ProductCard from '../../../../shared-components/ProductCard/ProductCard';
import Pagination2 from '../../../../shared-components/Pagination2/Pagination2';
import Loader from '../../../../shared-components/Loader';
import { ActiveCategory, ProductCardType } from '../../../../types/types';
import { FavoritesContext } from '../CabinetContent';
import './UserFavorites.scss';

const UserFavorites = () => {
    const [activeCategory, setActiveCategory] = useState<ActiveCategory>({
        name: 'Всі товари',
        id: '',
    });
    const categories = [
        {
            id: '112342341234',
            name: 'Test1',
        },
        {
            id: '1123412341234',
            name: 'Test2',
        },
        {
            id: '112341234234',
            name: 'Test3',
        },
        {
            id: '112`341234123',
            name: 'Test4',
        },
    ];
    const countOfPages = 10;
    const [currentPage, setCurrentPage] = useState<number>(0);

    const { data, loading } = useContext(FavoritesContext);

    return (
        <div className="user-favorites">
            <h1 className="user-favorites__title">Список бажань</h1>
            <NavigationListOfCategories
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <ul className="user-favorites__products">
                {loading !== 'succeeded' ? (
                    <Loader />
                ) : (
                    data.map((product: ProductCardType) => {
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
                    countOfPages={countOfPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default UserFavorites;
