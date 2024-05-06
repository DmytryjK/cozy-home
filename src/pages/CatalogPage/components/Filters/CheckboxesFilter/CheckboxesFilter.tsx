import { useState, useEffect, ChangeEvent } from 'react';
import nextId from 'react-id-generator';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { updateLocalFiltersState } from '../../../../../store/reducers/catalogFilterSlice';
import '../CheckboxStyles.scss';

type Options = {
    countOfProducts: number;
    id: string;
    name: string;
};

type FilterProps = {
    filterTitle: string;
    options?: Options[] | null;
    maxLoadOptions?: string[] | null;
    valueName: string;
};

const CheckboxesFilter = (props: FilterProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [checkboxesIds, setCheckboxesIds] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const {
        filterTitle,
        options = null,
        maxLoadOptions = null,
        valueName,
    } = props;
    const currentValueFromStore = useAppSelector(
        (state) => state.catalogFilters.filtersBody[valueName]
    );

    useEffect(() => {
        if (!currentValueFromStore) return;
        setIsActive(false);
        setCheckboxesIds(currentValueFromStore as string[]);
    }, [currentValueFromStore]);

    useEffect(() => {
        dispatch(
            updateLocalFiltersState({
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

    const renderFilter = () => {
        if (options && !maxLoadOptions) {
            return options.map((option) => {
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
            });
        }
        if (maxLoadOptions && !options) {
            return maxLoadOptions.map((option) => {
                return (
                    <li
                        className="filter__item"
                        key={nextId('checkboxes-filterf')}
                    >
                        <label className="filter__label">
                            <input
                                className="filter__input"
                                type="checkbox"
                                value={option}
                                checked={checkboxesIds.includes(option)}
                                onChange={handleInputChange}
                            />
                            <span className="filter__input_custom-input">
                                <span className="filter__input_custom-input_default" />
                                <span className="filter__input_custom-input_checked" />
                            </span>
                            <span className="filter__label-title">
                                {option}
                            </span>
                        </label>
                    </li>
                );
            });
        }
        return '';
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
            <ul className="filter__list">{renderFilter()}</ul>
        </div>
    );
};

CheckboxesFilter.defaultProps = {
    options: null,
    maxLoadOptions: null,
};

export default CheckboxesFilter;
