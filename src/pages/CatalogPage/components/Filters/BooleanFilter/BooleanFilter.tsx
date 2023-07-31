import React, { useState } from 'react';
import CustomFilter from '../CustomFilter/CustomFilter';
import '../CheckboxStyles.scss';

type TransformationFilterProps = {
    title: string;
    firstValue: string;
    secondValue: string;
};

const TransformationFilter = ({
    title,
    firstValue,
    secondValue,
}: TransformationFilterProps) => {
    const [isActive, setIsActive] = useState<boolean>(true);
    return (
        <div className={`filter ${isActive ? 'active' : ''}`}>
            <button
                className="filter__button"
                type="button"
                onClick={() => setIsActive(!isActive)}
            >
                {title}
            </button>
            <ul className="filter__list">
                <li className="filter__item">
                    <label className="filter__label">
                        <input
                            className="filter__input"
                            type="radio"
                            name={title}
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
                            name={title}
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
