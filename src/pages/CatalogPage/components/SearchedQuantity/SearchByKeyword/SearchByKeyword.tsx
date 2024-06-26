import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../../hooks/hooks';
import { fetchCatalogProductsByFilters } from '../../../../../store/reducers/catalogProductsSlice';
import { fetchFiltersOptionsForFilteredProducts } from '../../../../../store/reducers/catalogFilterSlice';
import './SearchByKeyword.scss';

const SearchByKeyword = () => {
    const dispatch = useAppDispatch();
    const [searchedKeyword, setSearchedKeyword] = useSearchParams();
    const keyWord = useAppSelector(
        (state) => state.catalogFilters.filterOptions?.keyWord
    );

    const handleClearSearch = () => {
        dispatch(
            fetchCatalogProductsByFilters({
                page: 0,
                isFiltersActive: false,
            })
        );
        dispatch(
            fetchFiltersOptionsForFilteredProducts({
                isFiltersActive: false,
            })
        ).then(() => {
            if (searchedKeyword) {
                setSearchedKeyword('');
            }
        });
    };

    return keyWord ? (
        <span className="search-quantity__keyword">
            <span className="search-quantity__keyword-title">за запитом </span>
            <span className="search-quantity__keyword_bold">
                <span className="search-quantity__keyword-word">
                    «{keyWord}»
                </span>
                <button
                    className="search-quantity__keyword_close"
                    type="button"
                    aria-label="очистити пошук"
                    onClick={handleClearSearch}
                >
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.474969 0.0794034C0.583625 -0.0264678 0.759791 -0.0264678 0.868446 0.0794034L9.91842 8.89746C10.0271 9.00333 10.0271 9.17498 9.91842 9.28085L9.52495 9.66425C9.41629 9.77012 9.24013 9.77012 9.13147 9.66425L0.0814917 0.846191C-0.027164 0.740319 -0.0271638 0.568668 0.0814919 0.462797L0.474969 0.0794034Z"
                            fill="#A3A3A3"
                        />
                        <path
                            d="M0.0815759 9.5372C-0.0270798 9.43133 -0.0270798 9.25968 0.0815759 9.15381L9.13155 0.335754C9.24021 0.229883 9.41638 0.229883 9.52503 0.335754L9.91851 0.719148C10.0272 0.825019 10.0272 0.99667 9.91851 1.10254L0.86853 9.9206C0.759875 10.0265 0.583709 10.0265 0.475053 9.9206L0.0815759 9.5372Z"
                            fill="#A3A3A3"
                        />
                    </svg>
                </button>
            </span>
        </span>
    ) : (
        <span />
    );
};

export default SearchByKeyword;
