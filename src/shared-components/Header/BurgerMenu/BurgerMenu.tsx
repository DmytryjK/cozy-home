import { useState, useEffect } from 'react';
import burgerMenuDataItems from './BurgerMenuDataItems';
import userScrollWidth from '../../../utils/userScrollWidth';
import './BurgerMenu.scss';
import headerSprite from '../../../assets/icons/header/header-sprite.svg';

type Props = {
    isScrolled: boolean;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BurgerMenu = (props: Props) => {
    const { isScrolled, isOpen, setIsOpen } = props;
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        null
    );
    const { menuItems } = burgerMenuDataItems();

    useEffect(() => {
        document.body.style.paddingRight = isOpen
            ? `${userScrollWidth()}px`
            : '0';
        document.body.style.overflow = isOpen ? 'hidden' : 'visible';
    }, [isOpen]);

    return (
        <>
            <button
                type="button"
                onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
                className={`menu-btn ${isOpen ? 'menu-btn__active' : ''}`}
            >
                <span />
                <span />
                <span />
            </button>
            <div
                className={`burger-menu ${isOpen ? 'burger-menu-active' : ''} ${
                    isScrolled ? 'burger-menu-scrolled' : ''
                }`}
            >
                <div className="container">
                    <a href="/" className="burger-menu__all-items">
                        Всі товари
                    </a>
                    {menuItems.map((item) => (
                        <ul key={item.id} className="burger-menu__list">
                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedCategory(
                                        item.id === selectedCategory
                                            ? null
                                            : item.id
                                    )
                                }
                            >
                                <li className="burger-menu__list_item">
                                    <p className="burger-menu__list_item_title">
                                        <a href="/">{item.title}</a>
                                    </p>
                                    <svg
                                        className={
                                            selectedCategory === item.id
                                                ? 'burger-menu__list_item_arrow active'
                                                : 'burger-menu__list_item_arrow'
                                        }
                                        width="15"
                                        height="8"
                                    >
                                        <use
                                            href={`${headerSprite}#burger-menu-arrow`}
                                        />
                                    </svg>
                                </li>
                            </button>
                            {selectedCategory && (
                                <ul
                                    className={
                                        selectedCategory === item.id
                                            ? 'burger-menu__list_subItems burger-menu__list_subItems-active'
                                            : 'burger-menu__list_subItems'
                                    }
                                >
                                    {menuItems
                                        .find(
                                            (menuItem) =>
                                                menuItem.id === selectedCategory
                                        )
                                        ?.subItem.map((subItem) => (
                                            <a href="/" key={subItem.id}>
                                                <li className="burger-menu__list_subItems_subItem">
                                                    {subItem.title}
                                                </li>
                                            </a>
                                        ))}
                                </ul>
                            )}
                        </ul>
                    ))}
                    <a
                        href="/"
                        className="burger-menu__list_item burger-menu__list"
                    >
                        <p className="burger-menu__list_item_title">
                            Доставка і оплата
                        </p>
                    </a>
                    <a href="/" className="burger-menu__list_item">
                        <p className="burger-menu__list_item_title">Про нас</p>
                    </a>
                </div>
                <div className="burger-menu__infoWrapper">
                    <div className="container">
                        <a href="/">
                            <div className="burger-menu__infoWrapper_info bordered">
                                <svg width="19" height="16">
                                    <use
                                        href={`${headerSprite}#favorite-icon`}
                                    />
                                </svg>
                                <div>Обране</div>
                            </div>
                        </a>
                        <a href="/">
                            <div className="burger-menu__infoWrapper_info">
                                <svg width="18" height="18">
                                    <use
                                        href={`${headerSprite}#profile-icon`}
                                    />
                                </svg>
                                <div>Вхід / Реєстрація</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
export default BurgerMenu;
