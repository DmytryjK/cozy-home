import React, { useState } from 'react';
import CustomFilter from '../CustomFilter/CustomFilter';
import '../CheckboxStyles.scss';

type TransformationFilterProps = {
    title: string;
};

const TransformationFilter = ({ title }: TransformationFilterProps) => {
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
                <CustomFilter filterTitle="Розкладний" />
                <CustomFilter filterTitle="Не розкладний" />
            </ul>
        </div>
    );
};

export default TransformationFilter;
