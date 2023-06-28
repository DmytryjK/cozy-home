import './Header.scss';
import { useState } from 'react';
import searchIcon from '../../assets/icons/header/search-icon.svg';
import profileIcon from '../../assets/icons/header/profile-icon.svg';
import favoriteIcon from '../../assets/icons/header/favorite-icon.svg';
import cartIcon from '../../assets/icons/header/card-icon.svg';
import logoIcon from '../../assets/icons/header/logo-icon.svg';
import DropdownMenu from './DropdownMenu/DropdownMenu';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    return (
        <div className="wrapper" onMouseEnter={handleMouseLeave}>
            <header className="header">
                <div className="header__logo">
                    <a href="/">
                        <img src={logoIcon} alt="Store logo" />
                    </a>
                </div>
                <div className="header__nav">
                    <nav>
                        <ul className="header__nav_list">
                            <li
                                className="active"
                                onMouseEnter={handleMouseLeave}
                            >
                                <a href="/">Головна</a>
                            </li>
                            <li
                                className="li-dropdown"
                                onMouseEnter={handleMouseEnter}
                            >
                                <a href="/">Каталог</a>
                            </li>
                            <li onMouseEnter={handleMouseLeave}>
                                <a href="/">Доставка і оплата</a>
                            </li>
                            <li onMouseEnter={handleMouseLeave}>
                                <a href="/">Контакти</a>
                            </li>
                            <li onMouseEnter={handleMouseLeave}>
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
            {showDropdown && (
                <DropdownMenu handleMouseLeave={handleMouseLeave} />
            )}
            {/* <DropdownMenu handleMouseLeave={handleMouseLeave} /> */}
        </div>
    );
};

export default Header;
