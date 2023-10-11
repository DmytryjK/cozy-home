import { useState, MouseEvent, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCategoriesWithSubcategories } from '../../store/reducers/categoriesSlice';
import {
    addProductsInfoToCheckout,
    fetchProductCartInfo,
    resetCartData,
    setStatusRemoveCartItemBtn,
    updateCartBody,
} from '../../store/reducers/cartSlice';
import DropdownMenu from './DropdownMenu';
import SearchBlock from './SearchBlock';
import BurgerMenu from './BurgerMenu';
import CartIcon from './CartIcon/CartIcon';
import { DropdownAuth } from './Auth/Auth';
import DropdownShoppingCart from './DropdownShoppingCart/DropdownShoppingCart';
import userScrollWidth from '../../utils/userScrollWidth';
import headerSprite from '../../assets/icons/header/header-sprite.svg';
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
    const [isPreviewCartActive, setIsPreviewCartActive] =
        useState<boolean>(false);

    const [isAuthDropdownActive, setIsAuthDropdownActive] =
        useState<boolean>(false);

    const isDeletedItemButtonActive = useAppSelector(
        (state) => state.cart.isDeletedItemButtonActive
    );
    const cartBody = useAppSelector((state) => state.cart.cartBody);
    const cartData = useAppSelector((state) => state.cart.cartData);
    const productsInfoToCheckout = useAppSelector(
        (state) => state.cart.productsInfoToCheckout
    );
    const cartBodyLocal = JSON.parse(
        localStorage.getItem('cartBody') as string
    );

    const dropdownLink = document.getElementsByClassName('link-dropdown');
    const dropdownMenu = document.getElementsByClassName('dropdown-menu');
    const dispatch = useAppDispatch();

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
        dispatch(fetchCategoriesWithSubcategories());
    }, []);

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

    useEffect(() => {
        localStorage.setItem('cartBody', JSON.stringify(cartBody));
        if (cartBody.length === 0) {
            if (isDeletedItemButtonActive) {
                localStorage.setItem('checkoutInfo', JSON.stringify([]));
            }
            dispatch(resetCartData());
            dispatch(setStatusRemoveCartItemBtn(false));
            setIsPreviewCartActive(false);
        } else {
            if (isDeletedItemButtonActive) {
                dispatch(setStatusRemoveCartItemBtn(false));
                return;
            }
            dispatch(fetchProductCartInfo(cartBody));
        }
    }, [cartBody]);

    useEffect(() => {
        if (productsInfoToCheckout.length > 0) {
            localStorage.setItem(
                'checkoutInfo',
                JSON.stringify(productsInfoToCheckout)
            );
        }
    }, [productsInfoToCheckout]);

    useEffect(() => {
        if (!cartBodyLocal) return;
        if (cartBodyLocal.length > 0) {
            dispatch(updateCartBody(cartBodyLocal));
        }
    }, []);

    useEffect(() => {
        const productsLocalCheckout = localStorage.getItem('checkoutInfo')
            ? JSON.parse(localStorage.getItem('checkoutInfo') as string)
            : [];
        const checkoutProducts = cartData.map((item) => {
            const {
                name,
                skuCode,
                colorHex,
                price,
                priceWithDiscount,
                colorName,
            } = item;
            let localItemQuantity = 1;
            if (
                productsLocalCheckout.some((localItem: any) => {
                    if (
                        localItem.skuCode === skuCode &&
                        localItem.colorHex === colorHex &&
                        localItem.quantityToCheckout > 1
                    ) {
                        localItemQuantity = localItem.quantityToCheckout;
                        return true;
                    }
                    return undefined;
                })
            ) {
                return {
                    productName: name,
                    skuCode,
                    colorHex,
                    colorName,
                    price: (priceWithDiscount || price) * localItemQuantity,
                    quantityToCheckout: localItemQuantity,
                };
            }
            return {
                productName: name,
                skuCode,
                colorHex,
                colorName,
                price: priceWithDiscount || price,
                quantityToCheckout: 1,
            };
        });
        dispatch(addProductsInfoToCheckout(checkoutProducts));
    }, [cartData]);

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

    const handleCloseCartPreview = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
            !target.matches('.header') &&
            !target.matches('.header__icons') &&
            !target.closest('.header-icons__cart') &&
            !target.closest('.cart-dropdown')
        ) {
            setIsPreviewCartActive(false);
        }
    };

    const handleCloseAuthDropdown = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
            !target.matches('.header') &&
            !target.matches('.header__icons') &&
            !target.closest('.header-icons__profile') &&
            !target.closest('.auth-dropdown')
        ) {
            setIsAuthDropdownActive(false);
        }
    };

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
                setIsAuthDropdownActive(false);
            }}
        >
            <SearchBlock setIsOpen={setIsSearchOpen} isOpen={isSearchOpen} />
            <header className={isScrolled ? 'header header-active' : 'header'}>
                <a href="/" className="header__logo" aria-label="CozyHome">
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
                    <a
                        href="/"
                        className="header-icons__profile"
                        aria-label="Open profile"
                        onClick={(e) => e.preventDefault()}
                        onMouseEnter={() => setIsAuthDropdownActive(true)}
                    >
                        <svg width="21" height="21">
                            <use href={`${headerSprite}#profile-icon`} />
                        </svg>
                    </a>
                    <a href="/" aria-label="Open favorite">
                        <svg width="21" height="21">
                            <use href={`${headerSprite}#favorite-icon`} />
                        </svg>
                        <span className="header__icons_favorite-counter">
                            0
                        </span>
                    </a>
                    <CartIcon
                        setIsPreviewCartActive={setIsPreviewCartActive}
                        setIsBurgerOpen={setIsBurgerOpen}
                    />
                </div>
                <div className="header__mobile_icons">
                    <button
                        type="button"
                        className="header__mobile_icons_search_button"
                        aria-label="Open search"
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
                    <CartIcon
                        setIsPreviewCartActive={setIsPreviewCartActive}
                        setIsBurgerOpen={setIsBurgerOpen}
                    />
                    <BurgerMenu
                        isOpen={isBurgerOpen}
                        setIsOpen={setIsBurgerOpen}
                        isScrolled={isScrolled}
                    />
                </div>
                <DropdownShoppingCart isActive={isPreviewCartActive} />

                <DropdownAuth isActive={isAuthDropdownActive} />
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
