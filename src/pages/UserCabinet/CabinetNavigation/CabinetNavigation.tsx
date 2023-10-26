import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import nextId from 'react-id-generator';
import { LinkType } from '../UserCabinet';
import './CabinetNavigation.scss';

const CabinetNavigation = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const listOfLinks = [
        {
            title: 'Контактна інформація',
            href: '/cabinet/contacts',
        },
        {
            title: 'Список бажань',
            href: '/cabinet/favorites',
        },
    ];
    const [activeLink, setActiveLink] = useState<LinkType>(listOfLinks[0]);

    useEffect(() => {
        if (pathname === '/cabinet') {
            const name = listOfLinks[0].href;
            navigate(`${name}`);
        }
    }, []);

    return (
        <nav className="cabinet-navigation">
            <ul className="cabinet-navigation__list">
                {listOfLinks.map((link) => {
                    const { title, href } = link;
                    return (
                        <li
                            className="cabinet-navigation__item"
                            key={nextId(`${title}-`)}
                        >
                            <NavLink
                                className="cabinet-navigation__link"
                                to={href}
                                onClick={() =>
                                    setActiveLink({
                                        title,
                                        href,
                                    })
                                }
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
