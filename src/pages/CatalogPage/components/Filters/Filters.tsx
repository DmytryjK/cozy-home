import { SetStateAction, useEffect, Dispatch } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
    fetchCatalogProductsByFilters,
    resetFilters,
} from '../../../../store/reducers/catalogFilterSlice';
import userScrollWidth from '../../../../utils/userScrollWidth';
import ColectionFilter from './ColectionFilter/ColectionFilter';
import ColorFilter from './ColorFilter/ColorFilter';
import './Filters.scss';
import HeightRegulationFilter from './HeightRegulationFilter/HeightRegulationFilter';
import LoadWeightFilter from './LoadWeightFilter/LoadWeightFilter';
import MaterialsFilter from './MaterialsFilter/MaterialsFilter';
import RangeFilter from './RangeFilter/RangeFilter';
import SaleFilter from './SaleFilter/SaleFilter';
import TransformationFilter from './TransformationFilter/TransformationFilter';
import TypeOfProductFilter from './TypeOfProductFilter/TypeOfProductFilter';

const Filters = ({
    showFilter,
    setShowFilter,
}: {
    showFilter: boolean;
    setShowFilter: Dispatch<SetStateAction<boolean>>;
}) => {
    const dispatch = useAppDispatch();
    const { globalFiltersQuery, isFiltersActive } = useAppSelector(
        (state) => state.catalogFilters
    );
    const { id } = globalFiltersQuery;

    useEffect(() => {
        const header = document.querySelector('.header') as HTMLElement;
        const headerCart = document.querySelector(
            '.header__mobile_icons_cart-counter'
        ) as HTMLElement;

        if (showFilter) {
            header.style.paddingRight = `${userScrollWidth() + 16}px`;
            headerCart.style.right = `${userScrollWidth() + 52}px`;
            document.body.style.paddingRight = `${userScrollWidth()}px`;
        } else {
            header.style.paddingRight = '16px';
            headerCart.style.right = '52px';
            document.body.style.paddingRight = '0';
        }
        document.body.style.overflow = showFilter ? 'hidden' : 'visible';
    }, [showFilter]);

    return (
        <div className={`filters-wrapper ${showFilter ? 'active' : ''}`}>
            <div className="filters">
                <div className="filters__navigation">
                    <h2 className="filters__title-mobile">Фільтри</h2>
                    <button
                        className="filters__close-filter"
                        type="button"
                        aria-label="закрити фільтри"
                        onClick={() => setShowFilter(!showFilter)}
                    />
                </div>
                <ColorFilter />
                <MaterialsFilter title="Матеріали" />
                <RangeFilter
                    minValue={20}
                    maxValue={12420}
                    rangeMinName="priceMin"
                    rangeMaxName="priceMax"
                    title="Ціна (грн)"
                />
                <TypeOfProductFilter title="Вид" />
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
                <TransformationFilter title="Механізм трансформації" />
                <HeightRegulationFilter title="Регулювання за висотою" />
                <LoadWeightFilter title="Навантаження (кг)" />
                <ColectionFilter title="Колекція" />
                <SaleFilter title="SALE" />
            </div>
            <div className="buttons">
                <button
                    type="button"
                    className="buttons__reject"
                    onClick={() => {
                        dispatch(resetFilters(false));
                        dispatch(
                            fetchCatalogProductsByFilters({
                                ...globalFiltersQuery,
                                extraEndpoint: 'catalog/category?',
                                parentCategoryId: '',
                            })
                        );
                    }}
                >
                    скасувати
                </button>
                <button
                    type="button"
                    className="buttons__submit"
                    onClick={() => {
                        dispatch(resetFilters(true));
                        dispatch(
                            fetchCatalogProductsByFilters({
                                ...globalFiltersQuery,
                                extraEndpoint: 'filter?',
                                parentCategoryId: id,
                                id: '',
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
