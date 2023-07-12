import { useState, MouseEvent, useEffect } from 'react';
import headerSprite from '../../assets/icons/header/header-sprite.svg';
import DropdownMenu from './DropdownMenu';
import SearchBlock from './SearchBlock';
import BurgerMenu from './BurgerMenu';
import './Header.scss';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [showBurgerMenu, setShowBurgerMenu] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const dropdownLink = document.getElementsByClassName('link-dropdown');
    const dropdownMenu = document.getElementsByClassName('dropdown-menu');

    useEffect(() => {
        if (showSearch) setShowBurgerMenu(false);
    }, [showSearch]);

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
            setShowDropdown(true);
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
            setShowDropdown(false);
        }
    };

    return (
        <div
            className="wrapper"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <SearchBlock
                setShowSearch={setShowSearch}
                showSearch={showSearch}
            />
            <header
                className={isScrolled ? 'header header-active' : 'header'}
                style={{ paddingRight: showBurgerMenu ? '26px' : '16px' }}
            >
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
                                className={`li-dropdown ${
                                    showDropdown ? 'li-dropdown-active' : ''
                                }`}
                            >
                                <a className="link-dropdown" href="/">
                                    Каталог
                                </a>
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
                        onClick={() => setShowSearch(true)}
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
                                showSearch ? 'display-none' : ''
                            }`}
                            style={{ right: showBurgerMenu ? '62px' : '52px' }}
                        >
                            0
                        </span>
                    </div>
                    <BurgerMenu
                        showBurgerMenu={showBurgerMenu}
                        setShowBurgerMenu={setShowBurgerMenu}
                        isScrolled={isScrolled}
                    />
                </div>
            </header>
            <div>
                <DropdownMenu
                    handleMouseOut={handleMouseOut}
                    showDropdown={showDropdown}
                />
            </div>
        </div>
    );
};
export default Header;
