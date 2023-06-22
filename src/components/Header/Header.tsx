import './Header.scss';
import searchIcon from '../../assets/icons/header/search-icon.svg';
import profileIcon from '../../assets/icons/header/profile-icon.svg';
import favoriteIcon from '../../assets/icons/header/favorite-icon.svg';
import cardIcon from '../../assets/icons/header/card-icon.svg';
import logoIcon from '../../assets/icons/header/logo-icon.svg';

const Header = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="header__logo">
                    <a href="/">
                        <img src={logoIcon} alt="Store logo" />
                    </a>
                </div>
                <div className="header__nav">
                    <nav>
                        <ul className="header__nav_list">
                            <a href="/">
                                <li className="active">Головна</li>
                            </a>
                            <a href="/">
                                <li>Каталог</li>
                            </a>
                            <a href="/">
                                <li>Доставка і оплата</li>
                            </a>
                            <a href="/">
                                <li>Контакти</li>
                            </a>
                            <a href="/">
                                <li>Про нас</li>
                            </a>
                        </ul>
                    </nav>
                </div>
                <div className="header__search">
                    <label>
                        <img
                            src={searchIcon}
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
                    <img src={profileIcon} alt="Profile" />
                    <div>
                        <img src={favoriteIcon} alt="Favorite" />
                        <span className="header__icons_favorite-counter">
                            10
                        </span>
                    </div>
                    <div>
                        <img src={cardIcon} alt="Card" />
                        <span className="header__icons_card-counter">20</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
