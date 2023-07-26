import { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import nextId from 'react-id-generator';

import categoriesSprite from '../../../../assets/icons/categories/categories-sprite.svg';
import './CategoryList.scss';
import { useAppDispatch } from '../../../../hooks/hooks';
import { updateGlobalFiltersQuery } from '../../../../store/reducers/catalogFilterSlice';

const CategoryList = () => {
    const { categoryName, subCategoryName } = useParams();
    const dispatch = useAppDispatch();

    const categories = [
        {
            name: 'Дивани',
            spriteIcon: 'sofas',
            id: '64c02276a433c341db700c40',
        },
        {
            name: 'Крісла',
            spriteIcon: 'arm-chairs',
            id: '64c0225da433c341db700c1d',
        },
        {
            name: 'Комоди',
            spriteIcon: 'dressers',
            id: '64c022e9a433c341db700ccc',
        },
        {
            name: 'Декор',
            spriteIcon: 'decor',
            id: '64c022f3a433c341db700cdb',
        },
        {
            name: 'Шафи',
            spriteIcon: 'cabinets',
            id: '64c022cba433c341db700cac',
        },
        {
            name: 'Столи',
            spriteIcon: 'tables',
            id: '64c022aaa433c341db700c83',
        },
        {
            name: 'Стільці',
            spriteIcon: 'chairs',
            id: '64c0224ca433c341db700c08',
        },
        {
            name: 'Ліжка',
            spriteIcon: 'bed',
            id: '64c022eea433c341db700cd5',
        },
    ];

    useEffect(() => {
        if (!subCategoryName) {
            categories.forEach((category) => {
                if (categoryName === category.name) {
                    const { id } = category;
                    dispatch(
                        updateGlobalFiltersQuery({
                            id,
                            extraEndpoint: 'catalog/category?',
                        })
                    );
                }
            });
        }
    }, [categoryName, subCategoryName]);

    return (
        <section className="category">
            <div className="container">
                <ul className="category-list">
                    {categories.map((category) => {
                        const { name, spriteIcon, id } = category;
                        return (
                            <li
                                className="category-list__item"
                                key={nextId('catalog-category')}
                            >
                                <NavLink
                                    onClick={() =>
                                        dispatch(
                                            updateGlobalFiltersQuery({
                                                id,
                                                extraEndpoint:
                                                    'catalog/category?',
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
                                        <use
                                            href={`${categoriesSprite}#${spriteIcon}`}
                                        />
                                    </svg>
                                    <span className="category-list__title">
                                        {name}
                                    </span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default CategoryList;
