import nextId from 'react-id-generator';
import Category from '../Category/Category';
import categoriesData from './CategoriesListData';
import './CategoriesList.scss';

const CategoriesList = () => {
    return (
        <section className="categories-page">
            <div className="container">
                <ul className="categories-page__list">
                    {categoriesData().map((category) => {
                        return (
                            <li
                                className="categories-page__item"
                                key={nextId('categories-page-item')}
                            >
                                <Category category={category} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default CategoriesList;
