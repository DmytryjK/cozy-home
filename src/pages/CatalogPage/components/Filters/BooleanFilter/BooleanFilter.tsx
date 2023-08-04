import { useState } from 'react';
import '../CheckboxStyles.scss';

type TransformationFilterProps = {
    filterTitle: string;
    firstValue: string;
    secondValue: string;
};

const TransformationFilter = ({
    filterTitle,
    firstValue,
    secondValue,
}: TransformationFilterProps) => {
    const [isActive, setIsActive] = useState<boolean>(true);
    const [currentValue, setCurrentValue] = useState<string | null>(null);

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
                <li className="filter__item">
                    <label className="filter__label">
                        <input
                            className="filter__input"
                            type="radio"
                            value={firstValue}
                            checked={currentValue === firstValue}
                            onChange={(e) => {}}
                            onClick={() =>
                                setCurrentValue((prev) =>
                                    prev === firstValue ? null : firstValue
                                )
                            }
                            name={filterTitle}
                        />
                        <span className="filter__input_custom-input">
                            <span className="filter__input_custom-input_default" />
                            <span className="filter__input_custom-input_checked" />
                        </span>
                        <span className="filter__label-title">
                            {firstValue}
                        </span>
                    </label>
                </li>
                <li className="filter__item">
                    <label className="filter__label">
                        <input
                            className="filter__input"
                            type="radio"
                            value={secondValue}
                            checked={currentValue === secondValue}
                            onChange={(e) => {}}
                            onClick={() =>
                                setCurrentValue((prev) =>
                                    prev === secondValue ? null : secondValue
                                )
                            }
                            name={filterTitle}
                        />
                        <span className="filter__input_custom-input">
                            <span className="filter__input_custom-input_default" />
                            <span className="filter__input_custom-input_checked" />
                        </span>
                        <span className="filter__label-title">
                            {secondValue}
                        </span>
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default TransformationFilter;
