type CustomFilterProps = {
    filterTitle: string;
};

const CustomFilter = ({ filterTitle }: CustomFilterProps) => {
    return (
        <li className="filter__item">
            <label className="filter__label">
                <input className="filter__input" type="checkbox" />
                <span className="filter__input_custom-input">
                    <span className="filter__input_custom-input_default" />
                    <span className="filter__input_custom-input_checked" />
                </span>
                <span className="filter__label-title">{filterTitle}</span>
            </label>
        </li>
    );
};

export default CustomFilter;
