import { useAppSelector } from '../../../../hooks/hooks';
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
        </div>
    );
};

export default SearchedQuantity;
