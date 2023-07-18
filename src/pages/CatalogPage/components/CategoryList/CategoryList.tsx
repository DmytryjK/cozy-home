import { useState } from 'react';
import nextId from 'react-id-generator';
import categoriesSprite from '../../../../assets/icons/categories/categories-sprite.svg';
import './CategoryList.scss';

const CategoryList = () => {
    const [activeCategoryNumber, setActiveCategoryNumber] = useState<number>(1);
    const categories = [
        {
            name: 'ДИВАНИ',
            spriteIcon: 'sofas',
        },
        {
            name: 'КРІСЛА',
            spriteIcon: 'arm-chairs',
        },
        {
            name: 'КОМОДИ',
            spriteIcon: 'dressers',
        },
        {
            name: 'ДЕКОР',
            spriteIcon: 'decor',
        },
        {
            name: 'ШАФИ',
            spriteIcon: 'cabinets',
        },
        {
            name: 'СТОЛИ',
            spriteIcon: 'tables',
        },
        {
            name: 'СТІЛЬЦІ',
            spriteIcon: 'chairs',
        },
        {
            name: 'ЛІЖКА',
            spriteIcon: 'bed',
        },
    ];
    return (
        <section className="category">
            <div className="container">
                <ul className="category-list">
                    {categories.map((category, index) => {
                        const { name, spriteIcon } = category;
                        return (
                            <li
                                className="category-list__item"
                                key={nextId('catalog-category')}
                            >
                                <button
                                    className={`category-list__button ${
                                        activeCategoryNumber === index + 1
                                            ? 'active'
                                            : ''
                                    }`}
                                    type="button"
                                    onClick={() =>
                                        setActiveCategoryNumber(index + 1)
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
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default CategoryList;
