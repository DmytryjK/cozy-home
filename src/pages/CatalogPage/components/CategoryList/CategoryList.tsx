import { useState } from 'react';
import nextId from 'react-id-generator';
import { NavLink } from 'react-router-dom';
import categoriesSprite from '../../../../assets/icons/categories/categories-sprite.svg';
import './CategoryList.scss';

const CategoryList = () => {
    // const [activeCategoryNumber, setActiveCategoryNumber] = useState<number>(1);
    const categories = [
        {
            name: 'Дивани',
            spriteIcon: 'sofas',
        },
        {
            name: 'Крісла',
            spriteIcon: 'arm-chairs',
        },
        {
            name: 'Комоди',
            spriteIcon: 'dressers',
        },
        {
            name: 'Декор',
            spriteIcon: 'decor',
        },
        {
            name: 'Шафи',
            spriteIcon: 'cabinets',
        },
        {
            name: 'Столи',
            spriteIcon: 'tables',
        },
        {
            name: 'Стільці',
            spriteIcon: 'chairs',
        },
        {
            name: 'Ліжка',
            spriteIcon: 'bed',
        },
    ];
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
