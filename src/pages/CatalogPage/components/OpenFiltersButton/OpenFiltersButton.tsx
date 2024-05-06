import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { showHideFilters } from '../../../../store/reducers/catalogFilterSlice';

const OpenFiltersButton = () => {
    const dispatch = useAppDispatch();
    const { isFiltersShowed } = useAppSelector((state) => state.catalogFilters);
    const filtersLoading = useAppSelector(
        (state) => state.catalogFilters.loading
    );
    const productsLoading = useAppSelector(
        (state) => state.catalogProducts.loading
    );

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(showHideFilters(!isFiltersShowed));
    };

    return productsLoading === 'succeeded' && filtersLoading === 'succeeded' ? (
        <button
            className="main-content__filters-btn"
            type="button"
            onClick={handleClick}
        >
            Фільтри
        </button>
    ) : (
        <span />
    );
};

export default OpenFiltersButton;
