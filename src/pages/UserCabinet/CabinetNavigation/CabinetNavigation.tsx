import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import nextId from 'react-id-generator';
import { UserActiveLinkContext } from '../UserCabinet';

import listOfRoutes from '../ListOfRoutes';
import './CabinetNavigation.scss';

const CabinetNavigation = () => {
    const navigate = useNavigate();
    const { activeLink, setActiveLink } = useContext(UserActiveLinkContext);

    useEffect(() => {
        if (!activeLink?.href) {
            navigate('/cabinet');
        }
    }, [activeLink]);

    return (
        <nav className="cabinet-navigation">
            <ul className="cabinet-navigation__list">
                {listOfRoutes.map((link) => {
                    const { title, href } = link;
                    return (
                        <li
                            className="cabinet-navigation__item"
                            key={nextId(`${title}-`)}
                        >
                            <NavLink
                                className={`cabinet-navigation__link ${
                                    activeLink?.href === href
                                        ? 'cabinet-navigation__link-active'
                                        : ''
                                }`}
                                to={href}
                                onClick={() => {
                                    setActiveLink((prev) => {
                                        if (!prev || prev.href !== href) {
                                            return {
                                                title,
                                                href,
                                            };
                                        }
                                        return {
                                            title: '',
                                            href: '',
                                        };
                                    });
                                }}
                            >
                                {link.title}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <NavLink className="cabinet-navigation__close" to="/">
                Вихід
            </NavLink>
        </nav>
    );
};

export default CabinetNavigation;
