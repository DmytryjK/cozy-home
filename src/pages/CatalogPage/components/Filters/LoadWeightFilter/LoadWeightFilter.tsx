import React, { useState } from 'react';
import CustomFilter from '../CustomFilter/CustomFilter';

type LoadWeightFilterProps = {
    title: string;
};

const LoadWeightFilter = ({ title }: LoadWeightFilterProps) => {
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
                <CustomFilter filterTitle="до 100 кг" />
                <CustomFilter filterTitle="150-200 кг" />
                <CustomFilter filterTitle="200-300 кг " />
            </ul>
        </div>
    );
};

export default LoadWeightFilter;
