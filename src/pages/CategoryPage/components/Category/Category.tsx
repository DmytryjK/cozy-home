import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import { cacheImage, getCachedImage } from '../../../../utils/cacheImage';
import transliterate from '../../../../utils/transliterate';
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
    const [cachedImageUrl, setCachedImageUrl] = useState('');
    const transliteratedCategoryName = transliterate(name);

    useEffect(() => {
        cacheImage(categoryImagePath);
        getCachedImage(categoryImagePath).then((cachedImageUrl) => {
            setCachedImageUrl(cachedImageUrl);
        });
    }, []);

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
                className={({ isPending }) =>
                    `category-card__img-link ${isPending ? 'pending' : ''}`
                }
                to={`/catalog/${transliteratedCategoryName}&categoryId=${id}`}
            >
                <LazyLoad>
                    <img
                        className="category-card__img"
                        width={304}
                        height={200}
                        src={cachedImageUrl || categoryImagePath}
                        loading="lazy"
                        alt={name}
                    />
                </LazyLoad>
            </NavLink>
            <div className="category-card__content">
                <NavLink
                    className="category-card__main-link"
                    to={`/catalog/${transliteratedCategoryName}&categoryId=${id}`}
                >
                    {name}
                </NavLink>
                <ul
                    className={`category-card__subcategories-list ${
                        isSubCategoriesHide ? 'hide' : ''
                    }`}
                >
                    {categoryDtos.map((subcategory) => {
                        const subId = subcategory.id;
                        const subName = subcategory.name;
                        return (
                            <li
                                className="category-card__subcategories-item"
                                key={`catalog-subcategory-${subId}-${subName}`}
                            >
                                <NavLink
                                    className="category-card__subcategories-link"
                                    to={`/catalog/${transliteratedCategoryName}&categoryId=${id}&subId=${subId}`}
                                >
                                    {subName}
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
