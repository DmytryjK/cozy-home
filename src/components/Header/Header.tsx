import './Header.scss';
import { useState, MouseEvent } from 'react';
import searchIcon_header from '../../assets/icons/header/search-icon-header.svg';
import searchIcon from '../../assets/icons/header/search-icon.svg';
import profileIcon from '../../assets/icons/header/profile-icon.svg';
import favoriteIcon from '../../assets/icons/header/favorite-icon.svg';
import cartIcon from '../../assets/icons/header/card-icon.svg';
import logoIcon from '../../assets/icons/header/logo-icon.svg';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import SearchBlock from './SearchBlock/SearchBlock';
import BurgerMenu from './BurgerMenu/BurgerMenu';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [showBurgerMenu, setShowBurgerMenu] = useState<boolean>(false);

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

    const handleSearchShow = () => {
        const searchBlock = document.querySelector('.searchBlock');
        const counter = document.querySelector(
            '.header__mobile_icons_cart-counter'
        );
        const burgerMenu = document.querySelector('.burger-menu');
        const burgerBtn = document.querySelector('.menu-btn');
        document.body.style.overflow = 'hidden';
        searchBlock?.classList.add('searchBlock-active');
        counter?.classList.add('display-none');
        burgerBtn?.classList.remove('menu-btn__active');
        setShowSearch(true);
        setShowBurgerMenu(false);

        if (burgerMenu?.classList.contains('burger-menu-active')) {
            burgerMenu?.classList.remove('burger-menu-active');
        }
    };

    const handleSearchHide = () => {
        const searchBlock = document.querySelector('.searchBlock');
        const counter = document.querySelector(
            '.header__mobile_icons_cart-counter'
        );
        document.body.style.overflow = 'visible';
        counter?.classList.remove('display-none');
        searchBlock?.classList.remove('searchBlock-active');
        setShowSearch(false);
    };

    const handleShowBurgerMenu = () => {
        const burgerMenu = document.querySelector('.burger-menu');
        const burgerBtn = document.querySelector('.menu-btn');
        burgerBtn?.classList.add('menu-btn__active');
        burgerMenu?.classList.add('burger-menu-active');
        setShowBurgerMenu(true);
        if (!burgerMenu?.classList.contains('burger-menu-active')) {
            document.body.style.overflow = 'visible';
        } else {
            document.body.style.overflow = 'hidden';
        }
    };

    const handleHideBurgerMenu = () => {
        const burgerMenu = document.querySelector('.burger-menu');
        const burgerBtn = document.querySelector('.menu-btn');
        burgerBtn?.classList.remove('menu-btn__active');
        burgerMenu?.classList.remove('burger-menu-active');
        setShowBurgerMenu(false);
        if (!burgerMenu?.classList.contains('burger-menu-active')) {
            document.body.style.overflow = 'visible';
        } else {
            document.body.style.overflow = 'hidden';
        }
    };

    return (
        <div
            className="wrapper"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <div className="searchBlock">
                <SearchBlock handleSearchHide={handleSearchHide} />
            </div>
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
                            src={searchIcon_header}
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
                            0
                        </span>
                    </div>
                    <div>
                        <a href="/">
                            <img src={cartIcon} alt="Cart" />
                        </a>
                        <span className="header__icons_cart-counter">0</span>
                    </div>
                </div>
                <div className="header__mobile_icons">
                    <button
                        type="button"
                        className="header__mobile_icons_search_button"
                        onClick={handleSearchShow}
                    >
                        <img
                            src={searchIcon}
                            alt="Search"
                            className="header__mobile_icons_search_icon"
                        />
                    </button>
                    <div>
                        <a href="/">
                            <img src={cartIcon} alt="Cart" />
                        </a>
                        <span className="header__mobile_icons_cart-counter">
                            0
                        </span>
                    </div>
                    <BurgerMenu
                        handleShowBurgerMenu={handleShowBurgerMenu}
                        handleHideBurgerMenu={handleHideBurgerMenu}
                        showBurgerMenu={showBurgerMenu}
                    />
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
