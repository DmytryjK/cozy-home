import { useState, useEffect, ChangeEvent } from 'react';
import nextId from 'react-id-generator';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { updateLocalFiltersState } from '../../../../../store/reducers/catalogFilterSlice';
import './ColorFilter.scss';

type Colors = {
    countOfProducts: number;
    id: string;
    name: string;
};

type Props = {
    filterTitle: string;
    colors: Colors[] | any;
};

const ColorFilter = (props: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [colorsId, setColorsId] = useState<string[]>([]);
    const { filterTitle, colors } = props;
    const currentValueFromStore = useAppSelector(
        (state) => state.catalogFilters.filtersBody.colors
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            updateLocalFiltersState({
                colors: colorsId,
            })
        );
    }, [isActive, colorsId]);

    useEffect(() => {
        if (!currentValueFromStore) return;
        setIsActive(false);
        setColorsId(currentValueFromStore);
    }, [currentValueFromStore]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsActive(true);
        const { target } = e;
        const colorId = target.value;

        if (target.checked) {
            setColorsId((prev) => [...prev, colorId]);
        } else {
            setColorsId((prev) => {
                return prev.filter((item) => item !== colorId);
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
                {colors.map((color: Colors) => {
                    const hex = color.id;
                    const colorName = color.name;
                    return (
                        <li
                            className="filter__item filter__item_color"
                            key={nextId('filter-color')}
                        >
                            <label className="filter__label">
                                <input
                                    className="filter__input filter__input_color"
                                    type="checkbox"
                                    checked={colorsId.includes(hex)}
                                    value={hex}
                                    onChange={handleInputChange}
                                />
                                <span className="filter__input-custom">
                                    <span
                                        className="filter__input-default"
                                        style={{ backgroundColor: `${hex}` }}
                                    />
                                    <span className="filter__input-checked" />
                                </span>
                                <span className="filter__label-title">
                                    {colorName}
                                </span>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ColorFilter;
