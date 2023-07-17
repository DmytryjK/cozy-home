import ColorFilter from './ColorFilter/ColorFilter';
import './Filters.scss';
import RangeFilter from './RangeFilter/RangeFilter';

const Filters = () => {
    return (
        <div className="filters">
            <ColorFilter />
            <RangeFilter minValue={20} maxValue={50} title="Ціна (грн)" />
            <RangeFilter minValue={36} maxValue={200} title="Ширина (см)" />
            <RangeFilter minValue={36} maxValue={200} title="Довжина (см)" />
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
        </div>
    );
};

export default Filters;
