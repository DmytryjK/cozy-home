import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import nextId from 'react-id-generator';
import './ColorSelection.scss';

const ColorSelection = () => {
    const colorDtoList = [
        { id: '#262626', name: 'Чорний' },
        { id: '#545454', name: 'Сірий' },
        { id: '#C57100', name: 'Коричневий' },
    ];
    const [currentColor, setCurrentColor] = useState<{
        id: string;
        name: string;
    }>({ id: '#262626', name: 'Чорний' });
    const currentPath = useLocation().pathname;

    return (
        <div className="color-selection">
            <span className="color-selection__color-descr">
                Колір: <span>{currentColor.name}</span>
            </span>
            <ul className="color-selection__list">
                {colorDtoList.map((color) => {
                    const { id, name } = color;
                    return (
                        <li
                            className="color-selection__item"
                            key={nextId('product-color')}
                        >
                            <NavLink
                                className={`color-selection__link ${
                                    currentColor.id === id ? 'active-link' : ''
                                }`}
                                to={`${currentPath}${id}`}
                                style={{ backgroundColor: `${id}` }}
                                onClick={() =>
                                    setCurrentColor((prev) => {
                                        if (prev.id !== id) {
                                            return { id, name };
                                        }
                                        return prev;
                                    })
                                }
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ColorSelection;
