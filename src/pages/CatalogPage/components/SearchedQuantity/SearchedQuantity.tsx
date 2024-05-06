import { useAppSelector } from '../../../../hooks/hooks';
import SearchByKeyword from './SearchByKeyword/SearchByKeyword';
import pluralizeUkrainian from '../../../../helpers/pluralizeUkrainian';
import './SearchedQuantity.scss';

const SearchedQuantity = () => {
    const countOfProducts = useAppSelector(
        (state) => state.catalogFilters.filterOptions?.countOfProducts
    );

    return (
        <div className="main-content__search-quantity search-quantity">
            <span className="search-quantity__title">Знайдено:</span>
            <span className="search-quantity__result">
                {pluralizeUkrainian(countOfProducts || 0, [
                    'товар',
                    'товари',
                    'товарів',
                ])}
            </span>
            <SearchByKeyword />
        </div>
    );
};

export default SearchedQuantity;
