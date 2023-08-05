import { useState, useEffect, ChangeEvent } from 'react';
import nextId from 'react-id-generator';
import { useAppDispatch } from '../../../../../hooks/hooks';
import { updateGlobalFiltersQuery } from '../../../../../store/reducers/catalogFilterSlice';
import '../CheckboxStyles.scss';

type Options = {
    countOfProducts: number;
    id: string;
    name: string;
};

type FilterProps = {
    filterTitle: string;
    options: Options[];
    valueName: string;
};

const CheckboxesFilter = (props: FilterProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [checkboxesIds, setCheckboxesIds] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const { filterTitle, options, valueName } = props;

    useEffect(() => {
        if (!isActive) return;
        dispatch(
            updateGlobalFiltersQuery({
                [valueName]: [...checkboxesIds],
            })
        );
    }, [isActive, checkboxesIds]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsActive(true);
        const { target } = e;
        const currentOptionId = e.target.value;
        if (target.checked) {
            setCheckboxesIds((prev) => [...prev, currentOptionId]);
        } else {
            setCheckboxesIds((prev) => {
                return prev.filter((prevId) => prevId !== currentOptionId);
            });
        }
    };

    return (
        <div className={`filter ${isOpen ? 'active' : ''}`}>
            <button
                className="filter__button"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
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
                                    checked={checkboxesIds.includes(id)}
                                    onChange={handleInputChange}
                                />
                                <span className="filter__input_custom-input">
                                    <span className="filter__input_custom-input_default" />
                                    <span className="filter__input_custom-input_checked" />
                                </span>
                                <span className="filter__label-title">
                                    {`${name}`}{' '}
                                    {countOfProducts !== 0
                                        ? `(${countOfProducts})`
                                        : ''}
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
