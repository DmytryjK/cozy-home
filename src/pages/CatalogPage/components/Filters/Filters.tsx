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

const Filters = () => {
    return (
        <div className="filters-wrapper">
            <div className="filters">
                <ColorFilter />
                <MaterialsFilter title="Матеріали" />
                <RangeFilter minValue={20} maxValue={50} title="Ціна (грн)" />
                <TypeOfProductFilter title="Вид" />
                <RangeFilter minValue={36} maxValue={200} title="Ширина (см)" />
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
                    title="Ширина  спального місця (см)"
                />
                <RangeFilter
                    minValue={1}
                    maxValue={10}
                    title="Кількість шухляд (шт)"
                />
                <TransformationFilter title="Механізм трансформації" />
                <HeightRegulationFilter title="Регулювання за висотою" />
                <LoadWeightFilter title="Навантаження (кг)" />
                <ColectionFilter title="Колекція" />
                <SaleFilter title="SALE" />
            </div>
            <div className="buttons">
                <button type="button" className="buttons__reject">
                    скасувати
                </button>
                <button type="button" className="buttons__submit">
                    застосувати
                </button>
            </div>
        </div>
    );
};

export default Filters;
