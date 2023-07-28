import { useState, MouseEvent, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import headerSprite from '../../assets/icons/header/header-sprite.svg';
import DropdownMenu from './DropdownMenu';
import SearchBlock from './SearchBlock';
import BurgerMenu from './BurgerMenu';
import userScrollWidth from '../../utils/userScrollWidth';
import './Header.scss';

export type SubCategoryType = {
    id: string;
    name: string;
};

interface Tab {
    id: number;
    title: string;
    style: string;
    url: string;
}

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    const dropdownLink = document.getElementsByClassName('link-dropdown');
    const dropdownMenu = document.getElementsByClassName('dropdown-menu');

    const navTabs: Tab[] = [
        { id: 1, title: 'Головна', style: 'header__nav_list_link', url: '/' },
        {
            id: 2,
            title: 'Каталог',
            style: `header__nav_list_link link-dropdown ${
                isDropdownOpen ? 'li-dropdown-active' : ''
            }`,
            url: '/catalog',
        },
        {
            id: 3,
            title: 'Доставка і оплата',
            style: 'header__nav_list_link',
            url: '/payment',
        },
        {
            id: 4,
            title: 'Контакти',
            style: 'header__nav_list_link',
            url: '/contacts',
        },
        {
            id: 5,
            title: 'Про нас',
            style: 'header__nav_list_link',
            url: '/about',
        },
    ];

    useEffect(() => {
        if (isSearchOpen) setIsBurgerOpen(false);
    }, [isSearchOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos =
                window.pageYOffset || document.documentElement.scrollTop;
            if (currentScrollPos < 60) {
                setIsScrolled(false);
            } else if (currentScrollPos > 60) {
                setIsScrolled(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseOver = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
            dropdownLink[0]?.contains(target) ||
            dropdownMenu[0]?.contains(target)
        ) {
            setIsDropdownOpen(true);
        }
    };

    const handleMouseOut = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
            !(
                dropdownLink[0]?.contains(target) ||
                dropdownMenu[0]?.contains(target)
            ) ||
            event.type === 'mouseleave'
        ) {
            setIsDropdownOpen(false);
        }
    };

    return (
        <div
            className="wrapper"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <SearchBlock setIsOpen={setIsSearchOpen} isOpen={isSearchOpen} />
            <header
                className={isScrolled ? 'header header-active' : 'header'}
                style={{
                    paddingRight: isBurgerOpen
                        ? `${16 + userScrollWidth()}px`
                        : '16px',
                }}
            >
                <a href="/" className="header__logo">
                    <svg className="header__logo_img">
                        <use href={`${headerSprite}#logo-icon`} />
                    </svg>
                </a>
                <div className="header__nav">
                    <nav>
                        <ul className="header__nav_list">
                            {navTabs.map((tab) => (
                                <li key={tab.id} className={tab.style}>
                                    <NavLink to={tab.url}>{tab.title}</NavLink>
                                </li>
                            ))}
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
                        onClick={() => setIsSearchOpen(true)}
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
                        <span
                            className={`header__mobile_icons_cart-counter ${
                                isSearchOpen ? 'display-none' : ''
                            }`}
                            style={{
                                right: isBurgerOpen
                                    ? `${52 + userScrollWidth()}px`
                                    : '52px',
                            }}
                        >
                            0
                        </span>
                    </div>
                    <BurgerMenu
                        isOpen={isBurgerOpen}
                        setIsOpen={setIsBurgerOpen}
                        isScrolled={isScrolled}
                    />
                </div>
            </header>
            <div>
                <DropdownMenu
                    handleMouseOut={handleMouseOut}
                    isOpen={isDropdownOpen}
                />
            </div>
        </div>
    );
};

export default Header;
