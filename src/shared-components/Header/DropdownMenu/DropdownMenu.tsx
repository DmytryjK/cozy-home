import { MouseEvent } from 'react';
import './DropdownMenu.scss';
import '../Header.scss';

type Props = {
    handleMouseOut: (event: MouseEvent) => void;
    isOpen: boolean;
};

const DropdownMenu = (props: Props) => {
    const { isOpen, handleMouseOut } = props;

    return (
        <div
            className={`dropdown-menu ${isOpen ? 'dropdown-menu-active' : ''}`}
            onMouseLeave={handleMouseOut}
        >
            <div className="container">
                <ul className="dropdown-menu__list">
                    <li className="dropdown-menu__list_title">
                        <a href={`/catalog/${'Крісла'}`}>Крісла</a>
                    </li>
                    <ul className="dropdown-menu__list_items">
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">М’які крісла</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Крісла-качалки</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Підвісні крісла</a>
                        </li>
                    </ul>
                </ul>
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                <ul className="dropdown-menu__list">
                    <li className="dropdown-menu__list_title">
                        <a href={`/catalog/${'Дивани'}`}>Дивани</a>
                    </li>
                    <ul className="dropdown-menu__list_items">
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Прямі дивани</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Кутові дивани</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Модульні дивани</a>
                        </li>
                    </ul>
                </ul>
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                <ul className="dropdown-menu__list">
                    <li className="dropdown-menu__list_title">
                        <a href={`/catalog/${'Столи'}`}>Столи</a>
                    </li>
                    <ul className="dropdown-menu__list_items">
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Обідні столи</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Компютерні столи</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Кавові столики</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Туалетні столи</a>
                        </li>
                    </ul>
                </ul>
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                <ul className="dropdown-menu__list">
                    <li className="dropdown-menu__list_title">
                        <a href={`/catalog/${'Стільці'}`}>Стільці</a>
                    </li>
                    <ul className="dropdown-menu__list_items">
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Барні стільці</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Дерев'яні лавки</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Банкетки</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Стільці з ротангу</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Дерев'яні стільці</a>
                        </li>
                    </ul>
                </ul>
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                <ul className="dropdown-menu__list">
                    <li className="dropdown-menu__list_title">
                        <a href={`/catalog/${'Шафи'}`}>Шафи</a>
                    </li>
                    <ul className="dropdown-menu__list_items">
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Гардеробні шафи</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Шафи-купе</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Шафи для кухні</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Книжкові шафи</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Вбудовані шафи</a>
                        </li>
                    </ul>
                </ul>
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                <ul className="dropdown-menu__list">
                    <li className="dropdown-menu__list_title">
                        <a href={`/catalog/${'Комоди'}`}>Комоди</a>
                    </li>
                    <ul className="dropdown-menu__list_items">
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Комоди з дверцятами</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Пеленальні комоди</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Комоди з 2-3 шухлядами</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Комоди з 4 шухлядами та більше</a>
                        </li>
                    </ul>
                </ul>
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                <ul className="dropdown-menu__list">
                    <li className="dropdown-menu__list_title">
                        <a href={`/catalog/${'Ліжка'}`}>Ліжка</a>
                    </li>
                    <ul className="dropdown-menu__list_items">
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Односпальні ліжка</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Двоспальні ліжка</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Дитячі ліжка</a>
                        </li>
                    </ul>
                </ul>
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                <ul className="dropdown-menu__list">
                    <li className="dropdown-menu__list_title">
                        <a href={`/catalog/${'Декор'}`}>Декор</a>
                    </li>
                    <ul className="dropdown-menu__list_items">
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Подушки та покривала</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Картини та постери</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Дзеркала</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Свічки та світильники</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Горщики та вази</a>
                        </li>
                        <li className="dropdown-menu__list_items_item">
                            <a href="/">Текстильні елементи</a>
                        </li>
                    </ul>
                </ul>
            </div>
        </div>
    );
};

export default DropdownMenu;
