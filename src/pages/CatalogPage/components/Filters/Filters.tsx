import { useCallback, useEffect } from 'react';
import nextId from 'react-id-generator';
import { useParams, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
    resetFilters,
    showHideFilters,
    fetchFiltersOptionsForFilteredProducts,
    updateFiltersBodyWithLocalFiltersState,
    updateCurrentPage,
    duplicateFilterOptions,
    setIsFiltersActive,
    updateCurrentCategory,
} from '../../../../store/reducers/catalogFilterSlice';
import { fetchCatalogProductsByFilters } from '../../../../store/reducers/catalogProductsSlice';
import userScrollWidth from '../../../../utils/userScrollWidth';
import ColorFilter from './ColorFilter/ColorFilter';
import RangeFilter from './RangeFilter/RangeFilter';
import BooleanFilter from './BooleanFilter/BooleanFilter';
import CheckboxesFilter from './CheckboxesFilter/CheckboxesFilter';
import filtersData from './FiltersData';
import moveUserToPageUp from '../../../../utils/moveUserToPageUp';
import { FilterOptions } from '../../../../types/catalogFiltersTypes';
import './Filters.scss';
import useGetCatIdSubIdFromParams from '../../../../hooks/useGetCatIdSubIdFromParams';

const clearHistoryWithSubId = (subcategoryId: string) => {
    const currentLocation = window.location.href;
    const hostName = currentLocation.slice(
        0,
        currentLocation.indexOf('/catalog')
    );
    const newLocation = currentLocation
        .replace(`&subId=${subcategoryId}`, '')
        .replace(hostName, '');
    window.history.replaceState(null, 'Каталог', newLocation);
};

const Filters = () => {
    const { categoryName, subCategoryName, categoryParams } = useParams();
    const [searchQuery, setSearchQuery] = useSearchParams();
    const searchKeyword = searchQuery.get('search');
    const { categoryId, subcategoryId } =
        useGetCatIdSubIdFromParams(categoryParams);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isFiltersShowed = useAppSelector(
        (state) => state.catalogFilters.isFiltersShowed
    );
    const isFiltersCleared = useAppSelector(
        (state) => state.catalogFilters.isFiltersCleared
    );
    let filterOptions = useAppSelector(
        (state) => state.catalogFilters.filterOptions
    );
    const filterOptionsDuplicate = useAppSelector(
        (state) => state.catalogFilters.filterOptionsDuplicate
    );
    const filterLoading = useAppSelector(
        (state) => state.catalogFilters.loading
    );
    const id = useAppSelector(
        (state) => state.catalogFilters.filtersBody.parentCategoryId
    );
    const productsLoading = useAppSelector(
        (state) => state.catalogProducts.loading
    );
    const filterLocalMap = filtersData();

    useEffect(() => {
        const header = document.querySelector('.header') as HTMLElement;
        if (isFiltersShowed) {
            header.style.paddingRight = `${userScrollWidth() + 16}px`;
            document.body.style.paddingRight = `${userScrollWidth()}px`;
        } else {
            header.style.paddingRight = '16px';
            document.body.style.paddingRight = '0';
        }
        document.body.style.overflow = isFiltersShowed ? 'hidden' : 'visible';
    }, [isFiltersShowed]);

    useEffect(() => {
        if (!isFiltersCleared) return;
        dispatch(
            fetchCatalogProductsByFilters({
                page: 0,
                isFiltersActive: false,
                search: searchKeyword,
            })
        );
        dispatch(
            fetchFiltersOptionsForFilteredProducts({
                isFiltersActive: false,
                search: searchKeyword,
            })
        );
        if (subcategoryId) {
            clearHistoryWithSubId(subcategoryId);
        }
    }, [isFiltersCleared]);

    useEffect(() => {
        if (searchKeyword) {
            dispatch(updateCurrentCategory(categoryId || ''));
            if (id === categoryId) {
                dispatch(
                    fetchCatalogProductsByFilters({
                        page: 0,
                        isFiltersActive: false,
                        search: searchKeyword,
                    })
                );
                dispatch(
                    fetchFiltersOptionsForFilteredProducts({
                        isFiltersActive: false,
                        search: searchKeyword,
                    })
                );
            }
        }
    }, [searchKeyword, id, categoryId]);

    useEffect(() => {
        if (!filterOptions) return;
        if (filterOptions.countOfProducts === 0) return;
        if (productsLoading === 'succeeded') {
            dispatch(duplicateFilterOptions(filterOptions));
        }
    }, [filterOptions, productsLoading]);

    const renderedFilters = (): JSX.Element | JSX.Element[] | any => {
        if (!filterOptions || !filterOptionsDuplicate) return null;
        if (filterOptions.countOfProducts === 0) {
            filterOptions = { ...filterOptionsDuplicate } as FilterOptions;
        }
        if (productsLoading === 'pending' || filterLoading === 'pending') {
            filterOptions = { ...filterOptionsDuplicate } as FilterOptions;
        }
        const render = Object.keys(filterOptions)
            .reduce((result: JSX.Element[], key: string) => {
                if (!filterLocalMap[key]) return result;
                const { type, title } = filterLocalMap[key];
                if (
                    type === 'colors' &&
                    (filterOptions as FilterOptions).colors.length > 0
                ) {
                    result.push(
                        <ColorFilter
                            key={nextId('color-filter')}
                            filterTitle={title}
                            colors={(filterOptions as FilterOptions)[key]}
                        />
                    );
                }
                if (type === 'range') {
                    const valueName = key.replace('Max', '');
                    const minValueName = `${valueName}Min`;
                    const maxValueName = `${valueName}Max`;
                    const minValue = (filterOptions as FilterOptions)[
                        minValueName
                    ];
                    const maxValue = (filterOptions as FilterOptions)[
                        maxValueName
                    ];

                    if (maxValue && minValue && +maxValue > 0) {
                        result.push(
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
                if (
                    type === 'boolean' &&
                    (filterOptions as FilterOptions)[key]
                ) {
                    const { option1, option2 } = filterLocalMap[key];
                    if (option1 === undefined || option2 === undefined)
                        return result;
                    result.push(
                        <BooleanFilter
                            key={nextId('boolean-filter')}
                            filterTitle={title}
                            firstOption={option1}
                            secondOption={option2}
                            valueName={key}
                        />
                    );
                }
                if (
                    type === 'checkboxes' &&
                    (filterOptions as FilterOptions)[key]
                ) {
                    const checkboxesFilters = (filterOptions as FilterOptions)[
                        key
                    ] as Array<{
                        id: string;
                        name: string;
                        countOfProducts: number;
                    }>;
                    if (checkboxesFilters.length > 0) {
                        if (key !== 'maxLoad') {
                            result.push(
                                <CheckboxesFilter
                                    key={nextId('checkboxes-filter')}
                                    filterTitle={title}
                                    options={checkboxesFilters}
                                    valueName={key}
                                />
                            );
                        } else {
                            result.push(
                                <CheckboxesFilter
                                    key={nextId('checkboxes-filter')}
                                    filterTitle={title}
                                    maxLoadOptions={
                                        (filterOptions as FilterOptions)[
                                            key
                                        ] as Array<string>
                                    }
                                    valueName={key}
                                />
                            );
                        }
                    }
                }
                return result;
            }, [])
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
        <div
            className={`filters-wrapper ${isFiltersShowed ? 'active' : ''} ${
                filterLoading === 'pending' || productsLoading === 'pending'
                    ? 'pending-content'
                    : ''
            }`}
        >
            {filterOptions ? (
                <div
                    className="filters"
                    data-lenis-prevent
                    data-lenis-prevent-wheel
                    data-lenis-prevent-touch
                >
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
            ) : (
                ''
            )}
            {filterOptions ? (
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
                            dispatch(showHideFilters(false)); // close window on mobile
                            moveUserToPageUp();
                            dispatch(updateCurrentPage(0));
                            dispatch(setIsFiltersActive(false));
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
                                    search: searchKeyword,
                                })
                            );
                            dispatch(
                                fetchFiltersOptionsForFilteredProducts({
                                    isFiltersActive: true,
                                    search: searchKeyword,
                                })
                            );
                            dispatch(setIsFiltersActive(true));
                            dispatch(updateFiltersBodyWithLocalFiltersState());
                            dispatch(updateCurrentPage(0));
                            moveUserToPageUp();
                            dispatch(showHideFilters(false)); // close window on mobile
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
