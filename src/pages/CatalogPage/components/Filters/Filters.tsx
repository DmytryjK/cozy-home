import ColorFilter from './ColorFilter/ColorFilter';
import './Filters.scss';

const Filters = () => {
    return (
        <div className="container">
            <div className="filters">
                <ColorFilter />
            </div>
        </div>
    );
};

export default Filters;
