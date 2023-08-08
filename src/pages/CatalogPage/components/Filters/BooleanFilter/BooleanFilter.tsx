import { useState, useEffect } from 'react';
import { updateLocalFiltersState } from '../../../../../store/reducers/catalogFilterSlice';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import '../CheckboxStyles.scss';

type TransformationFilterProps = {
    firstOption: { optionTitle: string; boolean: boolean };
    secondOption: { optionTitle: string; boolean: boolean };
    filterTitle: string;
    valueName: string;
};

const TransformationFilter = ({
    filterTitle,
    firstOption,
    secondOption,
    valueName,
}: TransformationFilterProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<string | null>(null);
    const [buleanValue, setBuleanValue] = useState<boolean | null>(null);
    const firstOptionTitle = firstOption.optionTitle;
    const secondOptionTitle = secondOption.optionTitle;
    const currentValueFromStore = useAppSelector(
        (state) => state.catalogFilters.filtersBody[valueName]
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (
            currentValueFromStore === null ||
            currentValueFromStore === undefined
        )
            return;
        setIsActive(false);
        if (currentValueFromStore) {
            setCurrentValue(firstOptionTitle);
        } else {
            setCurrentValue(secondOptionTitle);
        }
    }, [currentValueFromStore]);

    useEffect(() => {
        if (currentValue === null) {
            setBuleanValue(null);
        } else if (currentValue === firstOptionTitle) {
            setBuleanValue(firstOption.boolean);
        } else {
            setBuleanValue(secondOption.boolean);
        }
    }, [currentValue, isActive]);

    useEffect(() => {
        if (!isActive) return;
        dispatch(
            updateLocalFiltersState({
                [valueName]: buleanValue,
            })
        );
    }, [buleanValue]);

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
                <li className="filter__item">
                    <label className="filter__label">
                        <input
                            className="filter__input"
                            type="radio"
                            value={firstOptionTitle}
                            checked={currentValue === firstOptionTitle}
                            onChange={(e) => {}}
                            onClick={() => {
                                setIsActive(true);
                                setCurrentValue((prev) =>
                                    prev === firstOptionTitle
                                        ? null
                                        : firstOptionTitle
                                );
                            }}
                            name={filterTitle}
                        />
                        <span className="filter__input_custom-input">
                            <span className="filter__input_custom-input_default" />
                            <span className="filter__input_custom-input_checked" />
                        </span>
                        <span className="filter__label-title">
                            {firstOptionTitle}
                        </span>
                    </label>
                </li>
                <li className="filter__item">
                    <label className="filter__label">
                        <input
                            className="filter__input"
                            type="radio"
                            value={secondOptionTitle}
                            checked={currentValue === secondOptionTitle}
                            onChange={(e) => {}}
                            onClick={() => {
                                setIsActive(true);
                                setCurrentValue((prev) =>
                                    prev === secondOptionTitle
                                        ? null
                                        : secondOptionTitle
                                );
                            }}
                            name={filterTitle}
                        />
                        <span className="filter__input_custom-input">
                            <span className="filter__input_custom-input_default" />
                            <span className="filter__input_custom-input_checked" />
                        </span>
                        <span className="filter__label-title">
                            {secondOptionTitle}
                        </span>
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default TransformationFilter;
