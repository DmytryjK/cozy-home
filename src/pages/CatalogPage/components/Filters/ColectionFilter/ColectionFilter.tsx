import React, { useState } from 'react';
import CustomFilter from '../CustomFilter/CustomFilter';

type ColectionFilterProps = {
    title: string;
};

const ColectionFilter = ({ title }: ColectionFilterProps) => {
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
                <CustomFilter filterTitle="Future" />
                <CustomFilter filterTitle="Tenderness" />
                <CustomFilter filterTitle="Freedom" />
                <CustomFilter filterTitle="Think" />
                <CustomFilter filterTitle="Soft" />
            </ul>
        </div>
    );
};

export default ColectionFilter;
