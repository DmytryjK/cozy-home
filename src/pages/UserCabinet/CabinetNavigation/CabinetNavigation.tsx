import { useContext, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { UserActiveLinkContext } from '../UserCabinet';
import listOfRoutes from '../ListOfRoutes';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { userLogOut } from '../../../store/reducers/authSlice';
import './CabinetNavigation.scss';

const CabinetNavigation = () => {
    const { activeLink, setActiveLink } = useContext(UserActiveLinkContext);
    const dispatch = useAppDispatch();
    const { jwtToken } = useAppSelector((state) => state.auth);

    return (
        <nav className="cabinet-navigation">
            <ul className="cabinet-navigation__list">
                {listOfRoutes.map((link) => {
                    const { title, href } = link;
                    return (
                        <li
                            className="cabinet-navigation__item"
                            key={`${href}${title}-desktop`}
                        >
                            <NavLink
                                className={`cabinet-navigation__link ${
                                    activeLink?.href === href
                                        ? 'cabinet-navigation__link-active'
                                        : ''
                                }`}
                                to={href}
                                onClick={() => setActiveLink({ title, href })}
                            >
                                {link.title}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <button
                className="cabinet-navigation__close"
                type="button"
                onClick={() => {
                    dispatch(userLogOut(jwtToken));
                }}
            >
                Вихід
            </button>
        </nav>
    );
};

export default memo(CabinetNavigation);
