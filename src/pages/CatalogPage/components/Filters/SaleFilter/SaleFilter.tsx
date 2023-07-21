import React, { useState } from 'react';
import CustomFilter from '../CustomFilter/CustomFilter';

type SaleFilterProps = {
    title: string;
};

const SaleFilter = ({ title }: SaleFilterProps) => {
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
                <CustomFilter filterTitle="Акції" />
                <CustomFilter filterTitle="Усі товари" />
            </ul>
        </div>
    );
};

export default SaleFilter;
