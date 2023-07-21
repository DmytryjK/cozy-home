import React, { useState } from 'react';
import CustomFilter from '../CustomFilter/CustomFilter';
import '../CheckboxStyles.scss';

type FilterProps = {
    title: string;
};

const TypeOfProductFilter = ({ title }: FilterProps) => {
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
                <CustomFilter filterTitle="Прямі дивани" />
                <CustomFilter filterTitle="Кутові дивани" />
                <CustomFilter filterTitle="М’які крісла" />
                <CustomFilter filterTitle="Підвісні крісла " />
                <CustomFilter filterTitle="Крісла-качалки" />
                <CustomFilter filterTitle="Комоди з дверцятами" />
                <CustomFilter filterTitle="Пеленальні комоди" />
            </ul>
        </div>
    );
};

export default TypeOfProductFilter;
