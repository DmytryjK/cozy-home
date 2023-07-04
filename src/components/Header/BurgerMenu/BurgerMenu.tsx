import './BurgerMenu.scss';
import { useState } from 'react';
import downWardArrow from '../../../assets/icons/header/burger-menu-arrow.svg';
import favoriteIcon from '../../../assets/icons/header/favorite-icon.svg';
import profileIcon from '../../../assets/icons/header/profile-icon.svg';

type Props = {
    handleShowBurgerMenu: () => void;
    handleHideBurgerMenu: () => void;
    showBurgerMenu: boolean;
};

const BurgerMenu = (props: Props) => {
    const { handleShowBurgerMenu, handleHideBurgerMenu, showBurgerMenu } =
        props;

    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        null
    );

    const [showSubMenu, setShowSubMenu] = useState<boolean>(false);

    const menuItems = [
        {
            id: 1,
            title: 'Крісла',
            subItem: [
                {
                    id: 1.1,
                    title: 'М’які крісла',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 1.2,
                    title: 'Крісла-качалки',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 1.3,
                    title: 'Підвісні крісла',
                    style: 'burger-menu__list_subItems',
                },
            ],
        },
        {
            id: 2,
            title: 'Дивани',
            subItem: [
                {
                    id: 2.1,
                    title: 'Прямі дивани',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 2.2,
                    title: 'Кутові дивани',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 2.3,
                    title: 'Модульні дивани',
                    style: 'burger-menu__list_subItems',
                },
            ],
        },
        {
            id: 3,
            title: 'Столи',
            subItem: [
                {
                    id: 3.1,
                    title: 'Обідні столи',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 3.2,
                    title: 'Компютерні столи',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 3.3,
                    title: 'Кавові столики',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 3.4,
                    title: 'Туалетні столи',
                    style: 'burger-menu__list_subItems',
                },
            ],
        },
        {
            id: 4,
            title: 'Стільці',
            subItem: [
                {
                    id: 4.1,
                    title: 'Барні стільці',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 4.2,
                    title: "Дерев'яні лавки",
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 4.3,
                    title: 'Банкетки',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 4.4,
                    title: 'Стільці з ротангу',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 4.5,
                    title: "Дерев'яні стільці",
                    style: 'burger-menu__list_subItems',
                },
            ],
        },
        {
            id: 5,
            title: 'Шафи',
            subItem: [
                {
                    id: 5.1,
                    title: 'Гардеробні шафи',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 5.2,
                    title: 'Шафи-купе',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 5.3,
                    title: 'Шафи для кухні',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 5.4,
                    title: 'Книжкові шафи',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 5.5,
                    title: 'Вбудовані шафи',
                    style: 'burger-menu__list_subItems',
                },
            ],
        },
        {
            id: 6,
            title: 'Комоди',
            subItem: [
                {
                    id: 6.1,
                    title: 'Комоди з дверцятами',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 6.2,
                    title: 'Пеленальні комоди',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 6.3,
                    title: 'Комоди з 2-3 шухлядами',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 6.4,
                    title: 'Комоди з 4 шухлядами та більше',
                    style: 'burger-menu__list_subItems',
                },
            ],
        },
        {
            id: 7,
            title: 'Ліжка',
            subItem: [
                {
                    id: 7.1,
                    title: 'Односпальні ліжка',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 7.2,
                    title: 'Двоспальні ліжка',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 7.3,
                    title: 'Дитячі ліжка',
                    style: 'burger-menu__list_subItems',
                },
            ],
        },
        {
            id: 8,
            title: 'Декор',
            subItem: [
                {
                    id: 8.1,
                    title: 'Подушки та покривала',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 8.2,
                    title: 'Картини та постери',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 8.4,
                    title: 'Дзеркала',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 8.5,
                    title: 'Свічки та світильники',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 8.6,
                    title: 'Горщики та вази',
                    style: 'burger-menu__list_subItems',
                },
                {
                    id: 8.7,
                    title: 'Текстильні елементи',
                    style: 'burger-menu__list_subItems',
                },
            ],
        },
    ];

    const handleShowSubMenu = (id: number) => {
        setSelectedCategory(id);
        if (id === selectedCategory) {
            setSelectedCategory(null);
        }
    };

    const handleHideSubMenu = () => {
        setSelectedCategory(null);
    };

    return (
        <>
            <button
                type="button"
                onClick={
                    showBurgerMenu ? handleHideBurgerMenu : handleShowBurgerMenu
                }
                className="menu-btn"
            >
                <span />
                <span />
                <span />
            </button>
            <div className="burger-menu">
                <div className="container">
                    <a href="/">
                        <div className="burger-menu__all-items">
                            <div className="burger-menu__all-items_info">
                                Всі товари
                            </div>
                        </div>
                    </a>
                    {menuItems.map((item) => (
                        <ul key={item.id} className="burger-menu__list">
                            <button
                                type="button"
                                onClick={
                                    showSubMenu === true
                                        ? handleHideSubMenu
                                        : () => handleShowSubMenu(item.id)
                                }
                            >
                                <li className="burger-menu__list_item">
                                    <p className="burger-menu__list_item_title">
                                        <a href="/">{item.title}</a>
                                    </p>
                                    <img
                                        src={downWardArrow}
                                        alt="See more"
                                        className={
                                            selectedCategory === item.id
                                                ? 'burger-menu__list_item_arrow active'
                                                : 'burger-menu__list_item_arrow'
                                        }
                                    />
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
                                <img src={favoriteIcon} alt="Favorite" />
                                <div>Обране</div>
                            </div>
                        </a>
                        <a href="/">
                            <div className="burger-menu__infoWrapper_info">
                                <img src={profileIcon} alt="Profile" />
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
