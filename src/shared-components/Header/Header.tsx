import {
    useState,
    MouseEvent,
    useEffect,
    useCallback,
    memo,
    lazy,
    Suspense,
} from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCategoriesWithSubcategories } from '../../store/reducers/categoriesSlice';
import BurgerMenu from './BurgerMenu';
import CartIcon from './CartIcon/CartIcon';
import FavoritesIcon from './FavoritesIcon/FavoritesIcon';
import { DropdownAuth } from './Auth/Auth';
import userScrollWidth from '../../utils/userScrollWidth';
import headerSprite from '../../assets/icons/header/header-sprite.svg';
import TemporatyAdminNavPanel from './TemporatyAdminNavPanel/TemporatyAdminNavPanel';
import throttle from '../../utils/throttle';
import Search from './Search/Search';
import './Header.scss';

const DropdownShoppingCart = lazy(
    () => import('./DropdownShoppingCart/DropdownShoppingCart')
);
const DropdownMenu = lazy(() => import('./DropdownMenu'));

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
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isPreviewCartActive, setIsPreviewCartActive] =
        useState<boolean>(false);

    const [isAuthDropdownActive, setIsAuthDropdownActive] =
        useState<boolean>(false);

    const isPopUpForgottenPAsswordOpen = useAppSelector(
        (state) => state.modals.isPasswordForgotten
    );
    const jwtToken = useAppSelector((state) => state.auth.jwtToken);

    const dropdownLink = document.getElementsByClassName('link-dropdown');
    const dropdownMenu = document.getElementsByClassName('dropdown-menu');
    const dispatch = useAppDispatch();

    const navTabs: Tab[] = [
        {
            id: 1,
            title: 'Головна',
            style: 'header__nav_list_link',
            url: '/',
        },
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
            url: '/delivery',
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

    const lenis = useLenis(({ scroll }) => {});

    useEffect(() => {
        dispatch(fetchCategoriesWithSubcategories());
    }, []);

    useEffect(() => {
        setIsAuthDropdownActive(false);
    }, [jwtToken]);

    useEffect(() => {
        if (isSearchOpen) setIsBurgerOpen(false);
    }, [isSearchOpen]);

    useEffect(() => {
        const checkWindowSize = () => {
            if (window.innerWidth > 960) {
                setIsDesktop(true);
            } else {
                setIsDesktop(false);
            }
        };
        checkWindowSize();
        const throttleCheckWindowSize = throttle(checkWindowSize, 400);
        window.addEventListener('resize', throttleCheckWindowSize);
    }, []);

    useEffect(() => {
        if (
            isDropdownOpen ||
            isBurgerOpen ||
            isPreviewCartActive ||
            isAuthDropdownActive
        ) {
            setIsSearchOpen(false);
        }
    }, [
        isDropdownOpen,
        isBurgerOpen,
        isPreviewCartActive,
        isAuthDropdownActive,
    ]);

    const handleMouseOver = useCallback((event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
            dropdownLink[0]?.contains(target) ||
            dropdownMenu[0]?.contains(target)
        ) {
            setIsDropdownOpen(true);
        }
    }, []);

    const handleMouseOut = useCallback((event: MouseEvent) => {
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
    }, []);

    const handleCloseCartPreview = useCallback(
        throttle((event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                !target.matches('.header') &&
                !target.matches('.header__icons') &&
                !target.closest('.header-icons__cart') &&
                !target.closest('.cart-dropdown')
            ) {
                setIsPreviewCartActive(false);
            }
        }, 100),
        []
    );

    const handleCloseAuthDropdown = useCallback(
        throttle((event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                !target.matches('.header') &&
                !target.matches('.header__icons') &&
                !target.closest('.header__icons-profile') &&
                !target.closest('.auth-dropdown')
            ) {
                setIsAuthDropdownActive(false);
            }
        }, 100),
        []
    );

    const handleCloseSearch = useCallback((event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
            !target.closest('.header__search') &&
            !target.closest('.searchBlock ')
        ) {
            setIsSearchOpen(false);
        }
    }, []);

    return (
        <div
            className="wrapper"
            style={{
                right: isBurgerOpen ? `${userScrollWidth()}px` : '0',
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseMove={(event) => {
                handleCloseCartPreview(event);
                handleCloseAuthDropdown(event);
            }}
            onMouseLeave={() => {
                setIsPreviewCartActive(false);
            }}
            onClick={(event) => {
                handleCloseSearch(event);
                const target = event.target as HTMLElement;
                if (
                    !target.closest('.dropdown-active') &&
                    isPreviewCartActive
                ) {
                    setIsPreviewCartActive(false);
                }
            }}
        >
            <header className="header">
                <NavLink
                    to="/"
                    onClick={() => {
                        lenis?.scrollTo(0, { duration: 1.5 });
                    }}
                    className="header__logo"
                    aria-label="CozyHome"
                >
                    <svg className="header__logo_img">
                        <use href={`${headerSprite}#logo-icon`} />
                    </svg>
                </NavLink>
                <div className="header__nav">
                    <nav>
                        <ul className="header__nav_list">
                            {navTabs.map((tab) => (
                                <li key={tab.id} className={tab.style}>
                                    <NavLink
                                        to={tab.url}
                                        onClick={() => {
                                            if (tab.id === 2) {
                                                setIsDropdownOpen(false);
                                            }
                                        }}
                                    >
                                        {tab.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <Search
                    setIsOpen={setIsSearchOpen}
                    isOpen={isSearchOpen}
                    setIsMobileSearchOpen={setIsMobileSearchOpen}
                    isMobileSearchOpen={isMobileSearchOpen}
                />

                {jwtToken ? <TemporatyAdminNavPanel /> : ''}
                <div className="header__icons">
                    <NavLink
                        to={jwtToken ? '/cabinet' : '#'}
                        className={`header__icons-profile ${
                            jwtToken ? 'profile_active' : ''
                        }`}
                        aria-label="Open profile"
                        onMouseEnter={() =>
                            jwtToken
                                ? setIsAuthDropdownActive(false)
                                : setIsAuthDropdownActive(true)
                        }
                    >
                        <svg width="21" height="21">
                            <use href={`${headerSprite}#profile-icon`} />
                        </svg>
                    </NavLink>
                    <FavoritesIcon />
                    <button
                        type="button"
                        className="header__mobile_icons_search_button"
                        aria-label="Open search"
                        onClick={() => {
                            setIsMobileSearchOpen(true);
                        }}
                    >
                        <svg
                            className="header__mobile_icons_search_icon"
                            width="22"
                            height="22"
                        >
                            <use href={`${headerSprite}#search-icon-header`} />
                        </svg>
                    </button>
                    <CartIcon
                        setIsPreviewCartActive={setIsPreviewCartActive}
                        setIsBurgerOpen={setIsBurgerOpen}
                        isDesktop={isDesktop}
                    />
                    <BurgerMenu
                        isOpen={isBurgerOpen}
                        setIsOpen={setIsBurgerOpen}
                    />
                </div>
                <DropdownShoppingCart isActive={isPreviewCartActive} />
                <DropdownAuth
                    setIsInputFocused={setIsInputFocused}
                    isInputFocused={isInputFocused}
                    setIsAuthDropdownActive={setIsAuthDropdownActive}
                    isActive={
                        isAuthDropdownActive && !isPopUpForgottenPAsswordOpen
                    }
                />
            </header>
            <div>
                <Suspense fallback="Завантаження...">
                    <DropdownMenu
                        handleMouseOut={handleMouseOut}
                        isOpen={isDropdownOpen}
                    />
                </Suspense>
            </div>
        </div>
    );
};

export default memo(Header);
