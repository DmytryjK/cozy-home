import { useAppSelector } from '../../../../hooks/hooks';
import './SearchedQuantity.scss';

const SearchedQuantity = () => {
    const countOfProducts = useAppSelector(
        (state) => state.catalogFilters.filterOptions?.countOfProducts
    );

    const pluralizeUkrainian = (number: number) => {
        const wordForms = ['товар', 'товари', 'товарів'];
        let result = `${number}`;
        if (number % 10 === 1 && number % 100 !== 11) {
            result += ` ${wordForms[0]}`;
        }
        if (
            [2, 3, 4].includes(number % 10) &&
            ![12, 13, 14].includes(number % 100)
        ) {
            result += ` ${wordForms[1]}`;
        } else {
            result += ` ${wordForms[2]}`;
        }
        return result;
    };

    return (
        <div className="main-content__search-quantity search-quantity">
            <span className="search-quantity__title">Знайдено:</span>
            <span className="search-quantity__result">
                {pluralizeUkrainian(countOfProducts || 0)}
            </span>
        </div>
    );
};

export default SearchedQuantity;
