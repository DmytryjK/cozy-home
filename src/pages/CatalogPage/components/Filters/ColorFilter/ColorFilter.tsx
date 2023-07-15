import { useState } from 'react';
import './ColorFilter.scss';

const ColorFilter = () => {
    const [isActive, setIsActive] = useState<boolean>(true);
    return (
        <div className={`color-filter ${isActive ? 'active' : ''}`}>
            <button
                className="color-filter__button"
                type="button"
                onClick={() => setIsActive(!isActive)}
            >
                Колір
            </button>
            <ul className="color-filter__list">
                <li className="color-filter__item black">
                    <label className="filter__label">
                        <input className="filter__input" type="checkbox" />
                        <span className="filter__input-custom">
                            <span className="filter__input-default" />
                            <span className="filter__input-checked" />
                        </span>
                        <span className="filter__label-title">Чорний</span>
                    </label>
                </li>
                <li className="color-filter__item grey">
                    <label className="filter__label">
                        <input className="filter__input" type="checkbox" />
                        <span className="filter__input-custom">
                            <span className="filter__input-default" />
                            <span className="filter__input-checked" />
                        </span>
                        <span className="filter__label-title">Сірий</span>
                    </label>
                </li>
                <li className="color-filter__item orange">
                    <label className="filter__label">
                        <input className="filter__input" type="checkbox" />
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
