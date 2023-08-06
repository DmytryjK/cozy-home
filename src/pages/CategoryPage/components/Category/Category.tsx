import nextId from 'react-id-generator';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Category.scss';

type CategoryType = {
    id: string;
    name: string;
    categoryImagePath: string;
    categoryDtos: { id: string; name: string }[];
};

const Category = ({ category }: { category: CategoryType }) => {
    const [isSubCategoriesHide, setIsSubCategoriesHide] = useState<boolean>();
    const { id, name, categoryImagePath, categoryDtos } = category;

    useEffect(() => {
        if (categoryDtos.length > 3) {
            setIsSubCategoriesHide(true);
        } else {
            setIsSubCategoriesHide(false);
        }
    }, [categoryDtos]);

    const showHideBtn = () => {
        let button;
        if (categoryDtos.length > 3) {
            button = (
                <li className="category-card__subcategories-btn">
                    <button
                        className="category-card__show-btn"
                        type="button"
                        onClick={() =>
                            setIsSubCategoriesHide(!isSubCategoriesHide)
                        }
                    >
                        {isSubCategoriesHide ? 'Показати всі' : 'Згорнути'}
                    </button>
                </li>
            );
        }
        return button;
    };

    return (
        <div className="categories-page__card category-card">
            <NavLink
                className="category-card__img-link"
                to={`/catalog/${name}`}
                reloadDocument
            >
                <img
                    className="category-card__img"
                    width={304}
                    height={200}
                    src={categoryImagePath}
                    alt={name}
                />
            </NavLink>
            <div className="category-card__content">
                <NavLink
                    className="category-card__main-link"
                    to={`/catalog/${name}`}
                    reloadDocument
                >
                    {name}
                </NavLink>
                <ul
                    className={`category-card__subcategories-list ${
                        isSubCategoriesHide ? 'hide' : ''
                    }`}
                >
                    {categoryDtos.map((subcategory) => {
                        const subName = subcategory.name;
                        const subId = subcategory.id;
                        return (
                            <li
                                className="category-card__subcategories-item"
                                key={nextId('subcategory-link')}
                            >
                                <NavLink
                                    className="category-card__subcategories-link"
                                    to={`/catalog/${name}/${subName}`}
                                    reloadDocument
                                >
                                    {subcategory.name}
                                </NavLink>
                            </li>
                        );
                    })}
                    {showHideBtn()}
                </ul>
            </div>
        </div>
    );
};

export default Category;
