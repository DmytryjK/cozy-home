import { useEffect } from 'react';
import nextId from 'react-id-generator';
import { useParams, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
    resetFilters,
    showHideFilters,
    fetchFiltersOptionsForFilteredProducts,
    updateFiltersBodyWithLocalFiltersState,
    updateCurrentPage,
} from '../../../../store/reducers/catalogFilterSlice';
import { fetchCatalogProductsByFilters } from '../../../../store/reducers/catalogProductsSlice';
import userScrollWidth from '../../../../utils/userScrollWidth';
import ColorFilter from './ColorFilter/ColorFilter';
import RangeFilter from './RangeFilter/RangeFilter';
import BooleanFilter from './BooleanFilter/BooleanFilter';
import CheckboxesFilter from './CheckboxesFilter/CheckboxesFilter';
import filtersData from './FiltersData';
import moveUserToPageUp from '../../../../utils/moveUserToPageUp';
import './Filters.scss';

const Filters = () => {
    const { categoryName, subCategoryName } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isFiltersShowed = useAppSelector(
        (state) => state.catalogFilters.isFiltersShowed
    );
    const isFiltersCleared = useAppSelector(
        (state) => state.catalogFilters.isFiltersCleared
    );
    const filterOptions = useAppSelector(
        (state) => state.catalogFilters.filterOptions
    );
    const id = useAppSelector(
        (state) => state.catalogFilters.filtersBody.parentCategoryId
    );
    const catalogProducts = useAppSelector(
        (state) => state.catalogProducts.catalogProducts
    );

    const filterLocalMap = filtersData();

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

    useEffect(() => {
        if (!isFiltersCleared) return;
        fetchCatalogProductsByFilters({
            page: 0,
            isFiltersActive: false,
        });
        fetchFiltersOptionsForFilteredProducts({
            isFiltersActive: true,
        });
    }, [isFiltersCleared]);

    const renderedFilters = (): JSX.Element | JSX.Element[] | any => {
        if (!filterOptions) return null;
        const render = Object.keys(filterOptions)
            .map((key: string) => {
                let result;
                if (!filterLocalMap[key]) return result;
                const { type, title } = filterLocalMap[key];

                if (type === 'colors' && filterOptions.colors.length > 0) {
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
                    if (option1 === undefined || option2 === undefined)
                        return result;
                    result = (
                        <BooleanFilter
                            key={nextId('boolean-filter')}
                            filterTitle={title}
                            firstOption={option1}
                            secondOption={option2}
                            valueName={key}
                        />
                    );
                }
                if (type === 'checkboxes' && filterOptions[key]) {
                    const checkboxesFilters = filterOptions[key] as Array<{
                        id: string;
                        name: string;
                        countOfProducts: number;
                    }>;
                    if (checkboxesFilters.length > 0) {
                        if (key !== 'maxLoad') {
                            result = (
                                <CheckboxesFilter
                                    key={nextId('checkboxes-filter')}
                                    filterTitle={title}
                                    options={checkboxesFilters}
                                    valueName={key}
                                />
                            );
                        } else {
                            result = (
                                <CheckboxesFilter
                                    key={nextId('checkboxes-filter')}
                                    filterTitle={title}
                                    maxLoadOptions={
                                        filterOptions[key] as Array<string>
                                    }
                                    valueName={key}
                                />
                            );
                        }
                    }
                }
                return result;
            })
            .filter((item) => item !== undefined)
            .sort((a, b) => {
                if (a?.props.filterTitle === filterLocalMap.colors.title)
                    return -1;
                if (b?.props.filterTitle === filterLocalMap.colors.title)
                    return 1;
                return 0;
            });

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
                {renderedFilters()}
            </div>
            {filterOptions && catalogProducts.length > 0 ? (
                <div className="buttons">
                    <button
                        type="button"
                        className="buttons__reject"
                        onClick={() => {
                            if (!id) return;
                            if (subCategoryName) {
                                navigate(`/catalog/${categoryName}`);
                                return;
                            }
                            dispatch(resetFilters(id));
                            dispatch(showHideFilters(false));
                        }}
                    >
                        <span className="buttons__reject_text">скасувати</span>
                    </button>
                    <button
                        type="button"
                        className="buttons__submit"
                        onClick={() => {
                            dispatch(
                                fetchCatalogProductsByFilters({
                                    page: 0,
                                    isFiltersActive: true,
                                })
                            );
                            dispatch(
                                fetchFiltersOptionsForFilteredProducts({
                                    isFiltersActive: true,
                                })
                            );
                            dispatch(updateFiltersBodyWithLocalFiltersState());
                            dispatch(updateCurrentPage(0));
                            dispatch(showHideFilters(false));
                            moveUserToPageUp();
                        }}
                    >
                        застосувати
                    </button>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default Filters;
