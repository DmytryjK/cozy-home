import { useContext, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { UserActiveLinkContext } from '../../UserCabinet';
import listOfRoutes from '../../ListOfRoutes';
import { renderUserCabinetContent } from '../../CabinetContent/CabinetContent';
import { userLogOut } from '../../../../store/reducers/authSlice';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import './MobileNavigation.scss';

const MobileNavigation = () => {
    const { activeLink, setActiveLink } = useContext(UserActiveLinkContext);
    const dispatch = useAppDispatch();
    const { jwtToken } = useAppSelector((state) => state.auth);

    return (
        <nav className="nav-mobile">
            <ul className="nav-mobile__list">
                {listOfRoutes.map((link) => {
                    const { href, title } = link;
                    return (
                        <li
                            className="nav-mobile__item"
                            key={`${href}${title}-mobile`}
                        >
                            <NavLink
                                className={`nav-mobile__link ${
                                    activeLink?.href === href
                                        ? 'nav-mobile__link-active'
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
                                {title}
                                <span className="nav-mobile__link-decorative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10.1165 13.5094C10.2722 13.487 10.4166 13.416 10.5297 13.3068L16.7647 7.32117C16.9222 7.18826 17.0178 6.9962 17.0291 6.79058C17.0405 6.58477 16.9665 6.38349 16.8246 6.23406C16.6828 6.08462 16.4855 6.00042 16.2795 6.00111C16.0734 6.00181 15.8768 6.0874 15.7359 6.23788L10.0153 11.7327L4.29467 6.23788C4.15375 6.0874 3.95717 6.00181 3.75102 6.00111C3.54504 6.00042 3.34776 6.08462 3.20599 6.23406C3.06403 6.3835 2.9901 6.58478 3.0014 6.79058C3.01271 6.99621 3.10839 7.18827 3.26583 7.32117L9.50083 13.3068C9.66471 13.4642 9.89121 13.5388 10.1165 13.5093L10.1165 13.5094Z" />
                                    </svg>
                                </span>
                            </NavLink>
                            {href === activeLink?.href
                                ? renderUserCabinetContent(activeLink)
                                : ''}
                        </li>
                    );
                })}
            </ul>
            <button
                className="nav-mobile__close"
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

export default memo(MobileNavigation);
