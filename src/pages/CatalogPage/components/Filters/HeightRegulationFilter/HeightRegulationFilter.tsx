import React, { useState } from 'react';
import CustomFilter from '../CustomFilter/CustomFilter';

type HeightRegulationFilterProps = {
    title: string;
};

const HeightRegulationFilter = ({ title }: HeightRegulationFilterProps) => {
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
                <CustomFilter filterTitle="Є регулювання" />
                <CustomFilter filterTitle="Немає регулювання" />
            </ul>
        </div>
    );
};

export default HeightRegulationFilter;
