import { useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { NavLink } from 'react-router-dom';
import categoriesSprite from '../../../../assets/icons/categories/categories-sprite.svg';
import './CategoryList.scss';
import { useAppDispatch } from '../../../../hooks/hooks';
import { updateCurrentProductCategory } from '../../../../store/reducers/catalogFilterSlice';

const CategoryList = () => {
    const dispatch = useAppDispatch();
    const categories = [
        {
            name: 'Дивани',
            spriteIcon: 'sofas',
            id: '64bd341e5cbf64609a807ffb',
        },
        {
            name: 'Крісла',
            spriteIcon: 'arm-chairs',
            id: '64bd34075cbf64609a807fd8',
        },
        {
            name: 'Комоди',
            spriteIcon: 'dressers',
            id: '64bd348b5cbf64609a808087',
        },
        {
            name: 'Декор',
            spriteIcon: 'decor',
            id: '64bd34955cbf64609a808096',
        },
        {
            name: 'Шафи',
            spriteIcon: 'cabinets',
            id: '64bd34705cbf64609a808067',
        },
        {
            name: 'Столи',
            spriteIcon: 'tables',
            id: '64bd34505cbf64609a80803e',
        },
        {
            name: 'Стільці',
            spriteIcon: 'chairs',
            id: '64bd33f75cbf64609a807fc3',
        },
        {
            name: 'Ліжка',
            spriteIcon: 'bed',
            id: '64bd34915cbf64609a808090',
        },
    ];
    const [currentProductCategory, setCurrentProductCategory] =
        useState<string>(categories[0].id);

    useEffect(() => {
        dispatch(updateCurrentProductCategory(currentProductCategory));
    }, [currentProductCategory]);

    return (
        <section className="category">
            <div className="container">
                <ul className="category-list">
                    {categories.map((category) => {
                        const { name, spriteIcon } = category;
                        return (
                            <li
                                className="category-list__item"
                                key={nextId('catalog-category')}
                            >
                                <NavLink
                                    onClick={() =>
                                        setCurrentProductCategory(category.id)
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
