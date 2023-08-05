import { useEffect, useState } from 'react';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import nextId from 'react-id-generator';
import renderServerData from '../../../../helpers/renderServerData';
import categoriesSprite from '../../../../assets/icons/categories/categories-sprite.svg';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
    resetGlobalFiltersQueryByCategory,
    fetchFiltersOptionsByCategory,
    fetchFiltersOptionsBySubCategory,
    updateGlobalFiltersQuery,
} from '../../../../store/reducers/catalogFilterSlice';
import {
    fetchCatalogProductsByCategories,
    fetchCatalogProductsBySubCategories,
} from '../../../../store/reducers/catalogProductsSlice';
import useFetch from '../../../../hooks/useFetch';
import './CategoryList.scss';
import { Loading } from '../../../../types/types';

type CategoriesType = {
    id: string;
    name: string;
    spriteIcon: string;
};

const CategoryList = () => {
    const { categoryName, subCategoryName } = useParams();
    const { pathname } = useLocation();
    const [currentCategory, setCurrentCategory] = useState<{
        id: string;
        name: string;
    }>();
    const dispatch = useAppDispatch();
    const {
        loading,
        error,
        data,
    }: { loading: Loading; error: null | unknown; data: CategoriesType[] } =
        useFetch('category');

    useEffect(() => {
        if (data.length === 0 || loading !== 'succeeded') return;
        if (!subCategoryName) {
            const loadedCategory = data.find(
                (category) => category.name === categoryName
            );
            const { id } = loadedCategory as CategoriesType;
            dispatch(
                updateGlobalFiltersQuery({
                    parentCategoryId: id,
                })
            );
            dispatch(fetchFiltersOptionsByCategory(id));
            dispatch(fetchCatalogProductsByCategories(id));
        }
    }, [loading, data, pathname]);

    useEffect(() => {
        if (!currentCategory) return;
        const { id } = currentCategory;
        dispatch(resetGlobalFiltersQueryByCategory(id));
        dispatch(fetchCatalogProductsByCategories(id));
        dispatch(fetchFiltersOptionsByCategory(id));
    }, [currentCategory]);

    const renderedItems = () => {
        return data.map((category) => {
            const { name, id, spriteIcon } = category;
            return (
                <li
                    className="category-list__item"
                    key={nextId('catalog-category')}
                >
                    <NavLink
                        onClick={() =>
                            setCurrentCategory({
                                id,
                                name,
                            })
                        }
                        to={`/catalog/${name}`}
                        className={({ isActive }) => {
                            return isActive
                                ? 'category-list__link active'
                                : 'category-list__link';
                        }}
                    >
                        <svg
                            className="category-list__icon"
                            width="44"
                            height="44"
                        >
                            <use href={`${categoriesSprite}#${spriteIcon}`} />
                        </svg>
                        <span className="category-list__title">{name}</span>
                    </NavLink>
                </li>
            );
        });
    };

    return (
        <section className="category">
            <div className="container">
                <ul className="category-list">
                    {renderServerData({
                        loading,
                        error,
                        content: renderedItems,
                    })}
                </ul>
            </div>
        </section>
    );
};

export default CategoryList;
