import React, { Dispatch, SetStateAction } from 'react';
import nextId from 'react-id-generator';
import { ProductCategory } from '../../pages/MainPage/components/PopularItems/types';
import { NavigationCategory } from '../../types/types';
import './NavigationListOfCategories.scss';

const NavigationListOfCategories = ({
    categories,
    activeCategory,
    setActiveCategory,
    setIsCategoryClicked,
}: {
    categories: ProductCategory[];
    activeCategory: NavigationCategory;
    setActiveCategory: Dispatch<SetStateAction<NavigationCategory>>;
    setIsCategoryClicked?: Dispatch<SetStateAction<boolean>> | null;
}) => {
    const handleChangeTab = (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        const currentCategory = e.currentTarget.getAttribute('data-value');
        if (!currentCategory || id === activeCategory.id) return;
        if (setIsCategoryClicked) {
            setIsCategoryClicked(true);
        }
        setActiveCategory({
            name: currentCategory,
            id,
        });
    };

    const renderedCategories = () => {
        const renderResult: ProductCategory[] = [
            { id: '', name: 'Всі товари' },
        ];
        if (Object.keys(categories).length !== 0) {
            renderResult.push(...categories);
        }
        return renderResult;
    };
    return (
        <nav className="categories-nav">
            <ul className="categories-nav__list">
                {renderedCategories().map((category) => {
                    const { name, id } = category;
                    return (
                        <li
                            key={nextId('category-nav')}
                            className="categories-nav__item"
                        >
                            <button
                                className={
                                    activeCategory.name === name
                                        ? 'categories-nav__btn active'
                                        : 'categories-nav__btn'
                                }
                                type="button"
                                data-value={name}
                                onClick={(e) => handleChangeTab(e, id)}
                            >
                                {name}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

NavigationListOfCategories.defaultProps = {
    setIsCategoryClicked: null,
};

export default NavigationListOfCategories;
