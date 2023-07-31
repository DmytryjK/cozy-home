import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
    resetFilters,
    showHideFilters,
} from '../../../../store/reducers/catalogFilterSlice';
import {
    fetchCatalogProductsByCategories,
    fetchCatalogProductsByFilters,
} from '../../../../store/reducers/catalogProductsSlice';
import userScrollWidth from '../../../../utils/userScrollWidth';
import ColectionFilter from './ColectionFilter/ColectionFilter';
import ColorFilter from './ColorFilter/ColorFilter';
import './Filters.scss';
import LoadWeightFilter from './LoadWeightFilter/LoadWeightFilter';
import MaterialsFilter from './MaterialsFilter/MaterialsFilter';
import RangeFilter from './RangeFilter/RangeFilter';
import BooleanFilter from './BooleanFilter/BooleanFilter';
import TypeOfProductFilter from './TypeOfProductFilter/TypeOfProductFilter';

const Filters = () => {
    const dispatch = useAppDispatch();
    const { isFiltersShowed } = useAppSelector((state) => state.catalogFilters);
    const { globalFiltersQuery, isFiltersActive } = useAppSelector(
        (state) => state.catalogFilters
    );
    const { id } = globalFiltersQuery;
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
                <ColorFilter />
                <MaterialsFilter title="Матеріали" />
                <TypeOfProductFilter title="Вид" />
                <LoadWeightFilter title="Навантаження (кг)" />
                <ColectionFilter title="Колекція" />
                <RangeFilter
                    minValue={20}
                    maxValue={60000}
                    rangeMinName="priceMin"
                    rangeMaxName="priceMax"
                    title="Ціна (грн)"
                />
                <BooleanFilter
                    title="Механізм трансформації"
                    firstValue="Розкладний"
                    secondValue="Не розкладний"
                />
                <BooleanFilter
                    title="Регулювання за висотою"
                    firstValue="Є регулювання"
                    secondValue="Немає регулювання"
                />
                <BooleanFilter
                    title="SALE"
                    firstValue="Акції"
                    secondValue="Усі товари"
                />
                {/* <RangeFilter minValue={36} maxValue={200} title="Ширина (см)" />
                <RangeFilter
                    minValue={36}
                    maxValue={200}
                    title="Довжина (см)"
                />
                <RangeFilter
                    minValue={1}
                    maxValue={10}
                    title="Кількість дверей (шт)"
                />
                <RangeFilter
                    minValue={36}
                    maxValue={200}
                    title="Довжина спального місця (см)"
                />
                <RangeFilter
                    minValue={36}
                    maxValue={200}
                    title="Ширина спального місця (см)"
                />
                <RangeFilter
                    minValue={1}
                    maxValue={10}
                    title="Кількість шухляд (шт)"
                /> */}
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
                        dispatch(
                            fetchCatalogProductsByFilters({
                                ...globalFiltersQuery,
                                id: '',
                                parentCategoryId: id,
                            })
                        );
                    }}
                >
                    застосувати
                </button>
            </div>
        </div>
    );
};

export default Filters;
