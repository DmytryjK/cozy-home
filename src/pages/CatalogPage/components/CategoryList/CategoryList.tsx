import { useEffect, useState } from 'react';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import nextId from 'react-id-generator';
import renderServerData from '../../../../helpers/renderServerData';
import categoriesSprite from '../../../../assets/icons/categories/categories-sprite.svg';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
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

type SubCategoryType = {
    id: string;
    name: string;
};

const CategoryList = () => {
    const { categoryName, subCategoryName } = useParams();
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const {
        loading,
        error,
        data,
    }: { loading: Loading; error: null | unknown; data: CategoriesType[] } =
        useFetch('category');
    const categories = useAppSelector((state) => state.categories.data);

    useEffect(() => {
        if (data.length === 0 || loading !== 'succeeded') return;
        if (categories.length === 0) return;

        const loadedCategory = data.find(
            (category) => category.name === categoryName
        );
        const { id } = loadedCategory as CategoriesType;

        if (!subCategoryName) {
            dispatch(
                updateGlobalFiltersQuery({
                    parentCategoryId: id,
                })
            );
            dispatch(fetchFiltersOptionsByCategory(id));
            dispatch(fetchCatalogProductsByCategories(id));
        } else if (subCategoryName) {
            const loadedSubCategory = categories
                .map((category) => {
                    return category.categoryDtos.find((subCategory) => {
                        return subCategory.name === subCategoryName;
                    });
                })
                .filter((subcategory) => subcategory !== undefined);

            const subCategory = loadedSubCategory[0] as SubCategoryType;
            const subId = subCategory.id;

            dispatch(
                updateGlobalFiltersQuery({
                    parentCategoryId: id,
                    subCategories: [subId],
                })
            );
            dispatch(fetchCatalogProductsBySubCategories(subId));
            dispatch(
                fetchFiltersOptionsBySubCategory({
                    parentCategoryId: id,
                    subCategoryId: subId,
                })
            );
        }
    }, [loading, data, pathname, categories]);

    const renderedItems = () => {
        return data.map((category) => {
            const { name, id, spriteIcon } = category;
            return (
                <li
                    className="category-list__item"
                    key={nextId('catalog-category')}
                >
                    <NavLink
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
