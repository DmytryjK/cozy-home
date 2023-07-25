import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { showHideFilters } from '../../../../store/reducers/catalogFilterSlice';

const OpenFiltersButton = () => {
    const dispatch = useAppDispatch();
    const { isFiltersShowed } = useAppSelector((state) => state.catalogFilters);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(showHideFilters(!isFiltersShowed));
    };

    return (
        <button
            className="main-content__filters-btn"
            type="button"
            onClick={handleClick}
        >
            Фільтри
        </button>
    );
};

export default OpenFiltersButton;
