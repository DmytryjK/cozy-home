import { useEffect } from 'react';
import nextId from 'react-id-generator';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
    resetFilters,
    showHideFilters,
    fetchFiltersOptionsByCategory,
    fetchFiltersOptionsForFilteredProducts,
} from '../../../../store/reducers/catalogFilterSlice';
import {
    fetchCatalogProductsByCategories,
    fetchCatalogProductsByFilters,
} from '../../../../store/reducers/catalogProductsSlice';
import userScrollWidth from '../../../../utils/userScrollWidth';
import ColorFilter from './ColorFilter/ColorFilter';
import './Filters.scss';
import RangeFilter from './RangeFilter/RangeFilter';
import BooleanFilter from './BooleanFilter/BooleanFilter';
import CheckboxesFilter from './CheckboxesFilter/CheckboxesFilter';
import filtersData from './FiltersData';
import renderServerData from '../../../../helpers/renderServerData';

const Filters = () => {
    const dispatch = useAppDispatch();
    const isFiltersShowed = useAppSelector(
        (state) => state.catalogFilters.isFiltersShowed
    );
    const filterOptions = useAppSelector(
        (state) => state.catalogFilters.filterOptions
    );
    const loading = useAppSelector((state) => state.catalogFilters.loading);
    const error = useAppSelector((state) => state.catalogFilters.error);
    const id = useAppSelector(
        (state) => state.catalogFilters.globalFiltersQuery.parentCategoryId
    );

    const filterLocalMap = filtersData();

    useEffect(() => {
        if (id) {
            dispatch(
                fetchFiltersOptionsByCategory({
                    parentCategoryId: id,
                    size: 12,
                })
            );
        }
    }, [dispatch]);

    useEffect(() => {
        const header = document.querySelector('.header') as HTMLElement;
        const headerCart = document.querySelector(
            '.header__mobile_icons_cart-counter'
        ) as HTMLElement;

        if (isFiltersShowed) {
            header.style.paddingRight = `${userScrollWidth() + 16}px`;
            headerCart.style.right = `${userScrollWidth() + 52}px`;
            document.body.style.paddingRight = `${userScrollWidth()}px`;
        } else {
            header.style.paddingRight = '16px';
            headerCart.style.right = '52px';
            document.body.style.paddingRight = '0';
        }
        document.body.style.overflow = isFiltersShowed ? 'hidden' : 'visible';
    }, [isFiltersShowed]);

    const renderedFilters = (): JSX.Element | JSX.Element[] | any => {
        if (!filterOptions) return null;
        const render = Object.keys(filterOptions)
            .map((key: string) => {
                let result;
                if (!filterLocalMap[key]) return result;
                const { type, title } = filterLocalMap[key];
                if (type === 'colors') {
                    result = (
                        <ColorFilter
                            key={nextId('color-filter')}
                            filterTitle={title}
                            colors={filterOptions[key]}
                        />
                    );
                }
                if (type === 'range') {
                    const valueName = key.replace('Max', '');
                    const minValueName = `${valueName}Min`;
                    const maxValueName = `${valueName}Max`;
                    const minValue = filterOptions[minValueName];
                    const maxValue = filterOptions[maxValueName];

                    if (maxValue && minValue && +maxValue > 0) {
                        result = (
                            <RangeFilter
                                key={nextId('range-filter')}
                                filterTitle={title}
                                minValue={+minValue}
                                maxValue={+maxValue}
                                rangeMinName={minValueName}
                                rangeMaxName={maxValueName}
                            />
                        );
                    }
                }
                if (type === 'boolean' && filterOptions[key]) {
                    const { option1, option2 } = filterLocalMap[key];
                    result = (
                        <BooleanFilter
                            key={nextId('range-filter')}
                            filterTitle={title}
                            firstValue={option1 || ''}
                            secondValue={option2 || ''}
                        />
                    );
                }
                if (type === 'checkboxes' && filterOptions[key]) {
                    const checkboxesFilters = filterOptions[key] as Array<{
                        id: string;
                        name: string;
                        countOfProducts: number;
                    }>;
                    const filteredCheckboxes = checkboxesFilters.filter(
                        (filter) => filter.countOfProducts !== 0
                    );
                    if (filteredCheckboxes.length > 0) {
                        result = (
                            <CheckboxesFilter
                                key={nextId('range-filter')}
                                filterTitle={title}
                                options={filteredCheckboxes}
                            />
                        );
                    }
                }
                return result;
            })
            .filter((item) => item !== undefined);
        return render || null;
    };

    return (
        <div className={`filters-wrapper ${isFiltersShowed ? 'active' : ''}`}>
            <div className="filters">
                <div className="filters__navigation">
                    <h2 className="filters__title-mobile">Фільтри</h2>
                    <button
                        className="filters__close-filter"
                        type="button"
                        aria-label="закрити фільтри"
                        onClick={() =>
                            dispatch(showHideFilters(!isFiltersShowed))
                        }
                    />
                </div>
                {renderServerData({
                    error,
                    loading,
                    content: renderedFilters,
                })}
            </div>
            <div className="buttons">
                <button
                    type="button"
                    className="buttons__reject"
                    onClick={() => {
                        dispatch(resetFilters(false));
                        dispatch(fetchCatalogProductsByCategories(id || ''));
                    }}
                >
                    <span className="buttons__reject_text">скасувати</span>
                </button>
                <button
                    type="button"
                    className="buttons__submit"
                    onClick={() => {
                        dispatch(resetFilters(true));
                        dispatch(fetchCatalogProductsByFilters());
                        dispatch(fetchFiltersOptionsForFilteredProducts());
                    }}
                >
                    застосувати
                </button>
            </div>
        </div>
    );
};

export default Filters;
