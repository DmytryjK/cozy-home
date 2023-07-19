import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import CategoriesList from './components/CategoriesList/CategoriesList';

const CategoryPage = () => {
    const crumbs = ['Головна', 'Каталог'];
    return (
        <>
            <Breadcrumbs crumbs={crumbs} />
            <CategoriesList />
        </>
    );
};

export default CategoryPage;
