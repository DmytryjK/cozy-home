import { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import nextId from 'react-id-generator';
import renderServerData from '../../../../helpers/renderServerData';
import categoriesSprite from '../../../../assets/icons/categories/categories-sprite.svg';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
    updateGlobalFiltersQuery,
    fetchFiltersOptionsByCategory,
} from '../../../../store/reducers/catalogFilterSlice';
import { fetchCatalogProductsByCategories } from '../../../../store/reducers/catalogProductsSlice';
import useFetch from '../../../../hooks/useFetch';
import './CategoryList.scss';
import { Loading } from '../../../../types/types';

type CategoriesType = {
    name: string;
    id: string;
    spriteIcon: string;
};

const CategoryList = () => {
    const { categoryName, subCategoryName } = useParams();
    const dispatch = useAppDispatch();
    const {
        loading,
        error,
        data,
    }: { loading: Loading; error: null | unknown; data: CategoriesType[] } =
        useFetch('category');

    useEffect(() => {
        if (data.length > 0 && !subCategoryName) {
            data.forEach((category) => {
                if (categoryName === category.name) {
                    const { id } = category;
                    dispatch(
                        updateGlobalFiltersQuery({
                            parentCategoryId: id,
                        })
                    );
                    dispatch(fetchCatalogProductsByCategories(id));
                    dispatch(
                        fetchFiltersOptionsByCategory({
                            parentCategoryId: id,
                            size: 12,
                        })
                    );
                }
            });
        }
    }, [categoryName, data, subCategoryName]);

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
                            dispatch(
                                updateGlobalFiltersQuery({
                                    parentCategoryId: id,
                                })
                            )
                        }
                        to={`/catalog/${name}`}
                        className={({ isActive }) =>
                            isActive
                                ? 'category-list__link active'
                                : 'category-list__link'
                        }
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
