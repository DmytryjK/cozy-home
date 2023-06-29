import './Header.scss';
import { useState, MouseEvent } from 'react';
import searchIcon from '../../assets/icons/header/search-icon.svg';
import profileIcon from '../../assets/icons/header/profile-icon.svg';
import favoriteIcon from '../../assets/icons/header/favorite-icon.svg';
import cartIcon from '../../assets/icons/header/card-icon.svg';
import logoIcon from '../../assets/icons/header/logo-icon.svg';
import DropdownMenu from './DropdownMenu/DropdownMenu';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleMouseOver = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const liDropdown = document.querySelector('.li-dropdown');
        const dropdownMenu = document.querySelector('.dropdown-menu');

        if (liDropdown?.contains(target) || dropdownMenu?.contains(target)) {
            dropdownMenu?.classList.add('dropdown-menu-active');
            setShowDropdown(true);
        }
    };

    const handleMouseOut = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const liDropdown = document.querySelector('.li-dropdown');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (
            !(liDropdown?.contains(target) || dropdownMenu?.contains(target)) ||
            event.type === 'mouseleave'
        ) {
            dropdownMenu?.classList.remove('dropdown-menu-active');
            setShowDropdown(false);
        }
    };

    return (
        <div
            className="wrapper"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <header className="header">
                <div className="header__logo">
                    <a href="/">
                        <img src={logoIcon} alt="Store logo" />
                    </a>
                </div>
                <div className="header__nav">
                    <nav>
                        <ul className="header__nav_list">
                            <li className="active">
                                <a href="/">Головна</a>
                            </li>
                            <li
                                className={
                                    showDropdown
                                        ? 'li-dropdown li-dropdown-active'
                                        : 'li-dropdown'
                                }
                            >
                                <a href="/">Каталог</a>
                            </li>
                            <li>
                                <a href="/">Доставка і оплата</a>
                            </li>
                            <li>
                                <a href="/">Контакти</a>
                            </li>
                            <li>
                                <a href="/">Про нас</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="header__search">
                    <label>
                        <img
                            src={searchIcon}
                            alt="Search"
                            className="header__search_icon"
                        />
                        <input
                            type="text"
                            placeholder="Пошук"
                            className="header__search_input"
                        />
                    </label>
                </div>
                <div className="header__icons">
                    <a href="/">
                        <img src={profileIcon} alt="Profile" />
                    </a>
                    <div>
                        <a href="/">
                            <img src={favoriteIcon} alt="Favorite" />
                        </a>
                        <span className="header__icons_favorite-counter">
                            10
                        </span>
                    </div>
                    <div>
                        <a href="/">
                            <img src={cartIcon} alt="Cart" />
                        </a>
                        <span className="header__icons_cart-counter">20</span>
                    </div>
                </div>
            </header>
            <div>
                <DropdownMenu
                    handleMouseOut={handleMouseOut}
                    className="dropdown-menu"
                />
            </div>
        </div>
    );
};

export default Header;
