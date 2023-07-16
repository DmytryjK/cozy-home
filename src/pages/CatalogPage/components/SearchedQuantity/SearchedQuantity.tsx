import './SearchedQuantity.scss';

type Props = {
    quantityResults: number;
};

const SearchedQuantity = (props: Props) => {
    const { quantityResults } = props;
    return (
        <div className="main-content__search-quantity search-quantity">
            <span className="search-quantity__title">Знайдено:</span>
            <span className="search-quantity__result">
                {quantityResults} товарів
            </span>
        </div>
    );
};

export default SearchedQuantity;
