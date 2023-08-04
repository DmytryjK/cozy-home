import { useState } from 'react';
import nextId from 'react-id-generator';
import '../CheckboxStyles.scss';

type Options = {
    countOfProducts: number;
    id: string;
    name: string;
};

type FilterProps = {
    filterTitle: string;
    options: Options[];
};

const CheckboxesFilter = (props: FilterProps) => {
    const [isActive, setIsActive] = useState<boolean>(true);
    const { filterTitle, options } = props;
    return (
        <div className={`filter ${isActive ? 'active' : ''}`}>
            <button
                className="filter__button"
                type="button"
                onClick={() => setIsActive(!isActive)}
            >
                {filterTitle}
            </button>
            <ul className="filter__list">
                {options.map((option) => {
                    const { id, name, countOfProducts } = option;
                    return (
                        <li
                            className="filter__item"
                            key={nextId('checkboxes-filterf')}
                        >
                            <label className="filter__label">
                                <input
                                    className="filter__input"
                                    type="checkbox"
                                    value={id}
                                />
                                <span className="filter__input_custom-input">
                                    <span className="filter__input_custom-input_default" />
                                    <span className="filter__input_custom-input_checked" />
                                </span>
                                <span className="filter__label-title">
                                    {`${name} (${countOfProducts})`}
                                </span>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CheckboxesFilter;
