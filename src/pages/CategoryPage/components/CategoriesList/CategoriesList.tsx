import { memo } from 'react';
import Category from '../Category/Category';
import renderServerData from '../../../../helpers/renderServerData';
import { useAppSelector } from '../../../../hooks/hooks';
import './CategoriesList.scss';

const CategoriesList = () => {
    const { loading, error, data } = useAppSelector(
        (store) => store.categories
    );

    const renderedCategories = () => {
        return data.map((category) => {
            return (
                <li
                    className="categories-page__item"
                    key={`catalog-subcategory-${category.id}-${category.name}`}
                >
                    <Category category={category} />
                </li>
            );
        });
    };
    return (
        <section className="categories-page">
            <div className="container">
                <ul
                    className={
                        loading !== 'succeeded' ? '' : 'categories-page__list'
                    }
                >
                    {renderServerData({
                        error,
                        loading,
                        content: renderedCategories,
                    })}
                </ul>
            </div>
        </section>
    );
};

export default memo(CategoriesList);
