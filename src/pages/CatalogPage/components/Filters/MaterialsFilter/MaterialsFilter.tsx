import { useState } from 'react';
import '../CheckboxStyles.scss';
import CustomFilter from '../CustomFilter/CustomFilter';

type FilterProps = {
    title: string;
};

const MaterialsFilter = ({ title }: FilterProps) => {
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
                <CustomFilter filterTitle="Текстиль (6)" />
                <CustomFilter filterTitle="Метал (88)" />
                <CustomFilter filterTitle="Дерево (158)" />
                <CustomFilter filterTitle="Шкіра (294)" />
                <CustomFilter filterTitle="Комбінований (25)" />
            </ul>
        </div>
    );
};

export default MaterialsFilter;
