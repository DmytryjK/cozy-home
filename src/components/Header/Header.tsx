import './Header.scss';
import { useState, MouseEvent, useEffect } from 'react';
import headerSprite from '../../assets/icons/header/header-sprite.svg';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import SearchBlock from './SearchBlock/SearchBlock';
import BurgerMenu from './BurgerMenu/BurgerMenu';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [showBurgerMenu, setShowBurgerMenu] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState(false);

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

    useEffect(() => {
        let prevScrollPos =
            window.pageYOffset || document.documentElement.scrollTop;
        const handleScroll = () => {
            const currentScrollPos =
                window.pageYOffset || document.documentElement.scrollTop;
            if (currentScrollPos < prevScrollPos) {
                setIsScrolled(false);
            } else {
                setIsScrolled(true);
            }
            prevScrollPos = currentScrollPos;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="wrapper"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <div className="searchBlock">
                <SearchBlock handleSearchHide={handleSearchHide} />
            </div>
            <header className={isScrolled ? 'header header-active' : 'header'}>
                <a href="/" className="header__logo">
                    <svg className="header__logo_img">
                        <use href={`${headerSprite}#logo-icon`} />
                    </svg>
                </a>
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
                        <svg
                            className="header__search_icon"
                            width="27"
                            height="27"
                        >
                            <use href={`${headerSprite}#search-icon-header`} />
                        </svg>
                        <input
                            type="text"
                            placeholder="Пошук"
                            className="header__search_input"
                        />
                    </label>
                </div>
                <div className="header__icons">
                    <a href="/">
                        <svg width="21" height="21">
                            <use href={`${headerSprite}#profile-icon`} />
                        </svg>
                    </a>
                    <a href="/">
                        <svg width="21" height="21">
                            <use href={`${headerSprite}#favorite-icon`} />
                        </svg>
                        <span className="header__icons_favorite-counter">
                            0
                        </span>
                    </a>
                    <a href="/">
                        <svg width="21" height="21">
                            <use href={`${headerSprite}#card-icon`} />
                        </svg>
                        <span className="header__icons_cart-counter">0</span>
                    </a>
                </div>
                <div className="header__mobile_icons">
                    <button
                        type="button"
                        className="header__mobile_icons_search_button"
                        onClick={handleSearchShow}
                    >
                        <svg
                            className="header__mobile_icons_search_icon"
                            width="22"
                            height="22"
                        >
                            <use href={`${headerSprite}#search-icon-header`} />
                        </svg>
                    </button>
                    <div>
                        <a href="/">
                            <svg width="21" height="21">
                                <use href={`${headerSprite}#card-icon`} />
                            </svg>
                        </a>
                        <span className="header__mobile_icons_cart-counter">
                            0
                        </span>
                    </div>
                    <BurgerMenu
                        handleShowBurgerMenu={handleShowBurgerMenu}
                        handleHideBurgerMenu={handleHideBurgerMenu}
                        showBurgerMenu={showBurgerMenu}
                        isScrolled={isScrolled}
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
