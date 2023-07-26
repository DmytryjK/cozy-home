import { useState, useEffect, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { updateGlobalFiltersQuery } from '../../../../../store/reducers/catalogFilterSlice';
import './ColorFilter.scss';

const ColorFilter = () => {
    const [isActive, setIsActive] = useState<boolean>(true);
    const [colorsId, setColorsId] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            updateGlobalFiltersQuery({
                colorsIds: colorsId,
            })
        );
    }, [colorsId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        <div className={`filter ${isActive ? 'active' : ''}`}>
            <button
                className="filter__button"
                type="button"
                onClick={() => setIsActive(!isActive)}
            >
                Колір
            </button>
            <ul className="filter__list">
                <li className="filter__item filter__item_color black">
                    <label className="filter__label">
                        <input
                            className="filter__input"
                            type="checkbox"
                            value="64c02249a433c341db700bfa"
                            onChange={handleInputChange}
                        />
                        <span className="filter__input-custom">
                            <span className="filter__input-default" />
                            <span className="filter__input-checked" />
                        </span>
                        <span className="filter__label-title">Чорний</span>
                    </label>
                </li>
                <li className="filter__item filter__item_color grey">
                    <label className="filter__label">
                        <input
                            className="filter__input"
                            type="checkbox"
                            value="64c02248a433c341db700bf9"
                            onChange={handleInputChange}
                        />
                        <span className="filter__input-custom">
                            <span className="filter__input-default" />
                            <span className="filter__input-checked" />
                        </span>
                        <span className="filter__label-title">Сірий</span>
                    </label>
                </li>
                <li className="filter__item filter__item_color orange">
                    <label className="filter__label">
                        <input
                            className="filter__input"
                            type="checkbox"
                            value="64c02249a433c341db700bfb"
                            onChange={handleInputChange}
                        />
                        <span className="filter__input-custom">
                            <span className="filter__input-default" />
                            <span className="filter__input-checked" />
                        </span>
                        <span className="filter__label-title">Коричневий</span>
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default ColorFilter;
