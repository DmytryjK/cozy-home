import { useState } from 'react';
import './ColorFilter.scss';

const ColorFilter = () => {
    const [isActive, setIsActive] = useState<boolean>(true);
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
                        <input className="filter__input" type="checkbox" />
                        <span className="filter__input-custom">
                            <span className="filter__input-default" />
                            <span className="filter__input-checked" />
                        </span>
                        <span className="filter__label-title">Чорний</span>
                    </label>
                </li>
                <li className="filter__item filter__item_color grey">
                    <label className="filter__label">
                        <input className="filter__input" type="checkbox" />
                        <span className="filter__input-custom">
                            <span className="filter__input-default" />
                            <span className="filter__input-checked" />
                        </span>
                        <span className="filter__label-title">Сірий</span>
                    </label>
                </li>
                <li className="filter__item filter__item_color orange">
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
