import nextId from 'react-id-generator';
import Category from '../Category/Category';
import renderServerData from '../../../../helpers/renderServerData';
import useFetch from '../../../../hooks/useFetch';
import './CategoriesList.scss';

const CategoriesList = () => {
    const { loading, error, data } = useFetch('category/categories');

    const renderedCategories = () => {
        return data.map((category) => {
            return (
                <li
                    className="categories-page__item"
                    key={nextId('categories-page-item')}
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

export default CategoriesList;
