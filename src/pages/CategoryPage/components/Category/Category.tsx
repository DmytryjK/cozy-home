import nextId from 'react-id-generator';
import './Category.scss';
import { useState, useEffect } from 'react';

type CategoryType = {
    parentId: string;
    parentName: string;
    categoryImagePath: string;
    list: { id: string; name: string }[];
};

const Category = ({ category }: { category: CategoryType }) => {
    const [isSubCategoriesHide, setIsSubCategoriesHide] = useState<boolean>();
    const { parentName, categoryImagePath, list } = category;

    useEffect(() => {
        if (list.length > 3) {
            setIsSubCategoriesHide(true);
        } else {
            setIsSubCategoriesHide(false);
        }
    }, [list.length]);

    const showHideBtn = () => {
        let button;
        if (list.length > 3) {
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
            <a
                className="category-card__img-link"
                href={`/catalog/${parentName}`}
            >
                <img
                    className="category-card__img"
                    src={categoryImagePath}
                    alt={parentName}
                />
            </a>
            <div className="category-card__content">
                <a
                    className="category-card__main-link"
                    href={`/catalog/${parentName}`}
                >
                    {parentName}
                </a>
                <ul
                    className={`category-card__subcategories-list ${
                        isSubCategoriesHide ? 'hide' : ''
                    }`}
                >
                    {list.map((subcategory) => {
                        return (
                            <li
                                className="category-card__subcategories-item"
                                key={nextId('subcategory-link')}
                            >
                                <a
                                    className="category-card__subcategories-link"
                                    href="/"
                                >
                                    {subcategory.name}
                                </a>
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
