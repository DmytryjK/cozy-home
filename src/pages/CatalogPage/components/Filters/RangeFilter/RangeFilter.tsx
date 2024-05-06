import { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { updateLocalFiltersState } from '../../../../../store/reducers/catalogFilterSlice';
import 'rc-slider/assets/index.css';
import './RangeFilter.scss';

type Props = {
    minValue: number;
    maxValue: number;
    filterTitle: string;
    rangeMinName: string;
    rangeMaxName: string;
};

const RangeFilter = (props: Props) => {
    const { minValue, maxValue, filterTitle, rangeMinName, rangeMaxName } =
        props;
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [firstInputValue, setFirstInputValue] = useState<number | ''>(
        minValue
    );
    const [secondInputValue, setSecondInputValue] = useState<number | ''>(
        maxValue
    );
    const [values, setValues] = useState<number[]>([minValue, maxValue]);
    const filtersBody = useAppSelector(
        (state) => state.catalogFilters.filtersBody
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isActive && firstInputValue && secondInputValue) {
            dispatch(
                updateLocalFiltersState({
                    [rangeMinName]: firstInputValue,
                    [rangeMaxName]: secondInputValue,
                })
            );
        }
    }, [values, isActive]);

    useEffect(() => {
        if (!filtersBody[rangeMinName] || !filtersBody[rangeMaxName]) return;
        setFirstInputValue(filtersBody[rangeMinName] as number);
        setSecondInputValue(filtersBody[rangeMaxName] as number);
    }, [filtersBody]);

    useEffect(() => {
        if (!firstInputValue || !secondInputValue) return;
        setValues([firstInputValue, secondInputValue]);
    }, [firstInputValue, secondInputValue]);

    const handleMinInputCheck = () => {
        setIsActive(true);
        if (firstInputValue === '') {
            setValues([values[0], values[1]]);
            setFirstInputValue(values[0]);
        } else if (firstInputValue > values[1]) {
            setValues([values[1] - 1, values[1]]);
            setFirstInputValue(values[1] - 1);
        } else if (firstInputValue < minValue) {
            setValues([minValue, values[1]]);
            setFirstInputValue(minValue);
        } else {
            setFirstInputValue(Math.round(firstInputValue));
            setValues([Math.round(firstInputValue), values[1]]);
        }
    };

    const handleMaxInputCheck = () => {
        setIsActive(true);
        if (secondInputValue === '') {
            setValues([values[0], values[1]]);
            setSecondInputValue(values[1]);
        } else if (secondInputValue < values[0]) {
            setValues([values[0], values[0] + 1]);
            setSecondInputValue(values[0] + 1);
        } else if (secondInputValue > maxValue) {
            setValues([values[0], maxValue]);
            setSecondInputValue(maxValue);
        } else {
            setSecondInputValue(Math.round(secondInputValue));
            setValues([values[0], Math.round(secondInputValue)]);
        }
    };

    const handlerChangeRange = (e: number | number[]) => {
        setIsActive(true);
        if (Array.isArray(e)) {
            setFirstInputValue(e[0]);
            setSecondInputValue(e[1]);
            setValues(e);
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
            <div className="filter__list filter__list_range">
                <fieldset className="filter__range-inputs">
                    <label className="filter__range-label">
                        <span className="filter__range-title">від</span>
                        <input
                            className="filter__range-input"
                            type="number"
                            onBlur={handleMinInputCheck}
                            onKeyDown={(e) =>
                                e.code === 'Enter' && handleMinInputCheck()
                            }
                            onChange={(e) => {
                                setFirstInputValue(+e.target.value || '');
                            }}
                            value={firstInputValue}
                        />
                    </label>
                    <label className="filter__range-label">
                        <span className="filter__range-title">до</span>
                        <input
                            className="filter__range-input"
                            type="number"
                            onBlur={handleMaxInputCheck}
                            onKeyDown={(e) =>
                                e.code === 'Enter' && handleMaxInputCheck()
                            }
                            onChange={(e) =>
                                setSecondInputValue(+e.target.value || '')
                            }
                            value={secondInputValue}
                        />
                    </label>
                </fieldset>
                <div className="filter__range-slider">
                    <Slider
                        range
                        value={values}
                        step={1}
                        min={minValue}
                        max={maxValue}
                        onChange={handlerChangeRange}
                        allowCross={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default RangeFilter;
