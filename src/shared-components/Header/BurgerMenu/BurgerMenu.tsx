import { NavLink } from 'react-router-dom';
import { useState, useEffect, MouseEvent } from 'react';
import userScrollWidth from '../../../utils/userScrollWidth';
import headerSprite from '../../../assets/icons/header/header-sprite.svg';
import renderServerData from '../../../helpers/renderServerData';
import { useAppSelector } from '../../../hooks/hooks';
import { SubCategoryType } from '../Header';
import { PopUpAuth } from '../Auth/Auth';
import transliterate from '../../../utils/transliterate';
import './BurgerMenu.scss';

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BurgerMenu = (props: Props) => {
    const { isOpen, setIsOpen } = props;
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const { error, loading, data } = useAppSelector(
        (state) => state.categories
    );
    const [isAuthShow, setIsAuthShow] = useState<boolean>(false);
    const jwtToken = useAppSelector((state) => state.auth.jwtToken);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (jwtToken) {
            setIsAuthShow(false);
        }
    }, [jwtToken]);

    useEffect(() => {
        document.body.style.paddingRight = isOpen
            ? `${userScrollWidth()}px`
            : '0';
        document.body.style.overflow = isOpen ? 'hidden' : 'visible';
    }, [isOpen]);

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (!jwtToken) {
            event.preventDefault();
        }
    };

    const renderedCategories = () => {
        return data.map((category) => {
            const { name, id } = category;
            const transliteratedCategoryName = transliterate(name);
            return (
                <ul
                    key={`burger-menu-category-${id}-${name}`}
                    className="burger-menu__list"
                >
                    <li>
                        <button
                            type="button"
                            onClick={() =>
                                setSelectedCategory(
                                    id === selectedCategory ? null : id
                                )
                            }
                            className="burger-menu__list_item"
                        >
                            <NavLink
                                to={`/catalog/${transliteratedCategoryName}&categoryId=${id}`}
                                className="burger-menu__list_item_title"
                                onClick={() => setIsOpen(false)}
                            >
                                {name}
                            </NavLink>
                            <svg
                                className={
                                    selectedCategory === id
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
                        </button>
                    </li>
                    {selectedCategory && (
                        <ul
                            className={
                                selectedCategory === id
                                    ? 'burger-menu__list_subItems burger-menu__list_subItems-active'
                                    : 'burger-menu__list_subItems'
                            }
                        >
                            {category.categoryDtos.map(
                                (subCategory: SubCategoryType) => {
                                    const subName = subCategory.name;
                                    const subId = subCategory.id;
                                    return (
                                        <NavLink
                                            to={`/catalog/${transliteratedCategoryName}&categoryId=${id}&subId=${subId}`}
                                            key={`burger-menu-subcategory-${subId}-${subName}`}
                                            className="burger-menu__list_subItems_subItem"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {subName}
                                        </NavLink>
                                    );
                                }
                            )}
                        </ul>
                    )}
                </ul>
            );
        });
    };

    return (
        <>
            <button
                type="button"
                aria-label="Burger button"
                onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
                className={`menu-btn ${isOpen ? 'menu-btn__active' : ''}`}
            >
                <span />
                <span />
                <span />
            </button>
            <div
                className={`burger-menu ${isOpen ? 'burger-menu-active' : ''}`}
            >
                <div
                    className="container"
                    data-lenis-prevent
                    data-lenis-prevent-wheel
                    data-lenis-prevent-touch
                >
                    <NavLink
                        to="/catalog"
                        className="burger-menu__all-items"
                        onClick={() => setIsOpen(false)}
                    >
                        Всі товари
                    </NavLink>

                    {renderServerData({
                        error,
                        loading,
                        content: renderedCategories,
                        isComponentActive: isOpen,
                    })}
                    <NavLink
                        to="/delivery"
                        className="burger-menu__list_item burger-menu__list"
                        onClick={() => setIsOpen(false)}
                    >
                        <p className="burger-menu__list_item_title">
                            Доставка і оплата
                        </p>
                    </NavLink>
                    <NavLink
                        to="/contacts"
                        className="burger-menu__list_item burger-menu__list"
                        onClick={() => setIsOpen(false)}
                    >
                        <p className="burger-menu__list_item_title">Контакти</p>
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="burger-menu__list_item burger-menu__list"
                        onClick={() => setIsOpen(false)}
                    >
                        <p className="burger-menu__list_item_title">Про нас</p>
                    </NavLink>
                </div>
                <div className="burger-menu__infoWrapper">
                    <div className="container">
                        {jwtToken ? (
                            <NavLink
                                to="/cabinet/favorites"
                                onClick={(event) => {
                                    setIsOpen(false);
                                    handleClick(event);
                                }}
                            >
                                <div className="burger-menu__infoWrapper_info bordered">
                                    <svg width="19" height="16">
                                        <use
                                            href={`${headerSprite}#favorite-icon`}
                                        />
                                    </svg>
                                    <div>Обране</div>
                                </div>
                            </NavLink>
                        ) : (
                            ''
                        )}
                        {jwtToken ? (
                            <NavLink
                                className="burger-menu__cabinet"
                                to="/cabinet"
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="burger-menu__infoWrapper_info">
                                    <svg
                                        className="burger-menu__profile-icon profile-icon_active"
                                        width="18"
                                        height="18"
                                    >
                                        <use
                                            href={`${headerSprite}#profile-icon`}
                                        />
                                    </svg>
                                    <div>Особистий кабінет</div>
                                </div>
                            </NavLink>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsAuthShow(true)}
                            >
                                <div className="burger-menu__infoWrapper_info">
                                    <svg
                                        className="burger-menu__profile-icon"
                                        width="18"
                                        height="18"
                                    >
                                        <use
                                            href={`${headerSprite}#profile-icon`}
                                        />
                                    </svg>
                                    <div>Вхід / Реєстрація</div>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <PopUpAuth
                isActive={isAuthShow}
                setIsActive={setIsAuthShow}
                setIsBurgerOpen={setIsOpen}
            />
        </>
    );
};
export default BurgerMenu;
