import ColorFilter from './ColorFilter/ColorFilter';
import './Filters.scss';
import RangeFilter from './RangeFilter/RangeFilter';

const Filters = () => {
    return (
        <div className="container">
            <div className="filters">
                <ColorFilter />
                <RangeFilter minValue={20} maxValue={50} title="Ціна (грн)" />
            </div>
        </div>
    );
};

export default Filters;
