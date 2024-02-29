import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import visaIcon from '../../assets/icons/footer/visa-icon.svg';
import mastercardIcon from '../../assets/icons/footer/mastercard-icon.svg';
import footerSprites from '../../assets/icons/footer/footer-sprite.svg';
import './Footer.scss';

const Footer = forwardRef<HTMLDivElement>(function Footer(props, ref) {
    return (
        <footer className="footer" ref={ref}>
            <div className="footer__wrapper">
                <div className="container">
                    <NavLink to="/" aria-label="CozyHome">
                        <svg className="footer__logo">
                            <use href={`${footerSprites}#footer-logo`} />
                        </svg>
                    </NavLink>
                    <div className="footer__nav_wrapper">
                        <div className="footer__list footer__list_order1">
                            <h2 className="footer__list_title">
                                Корисні Посилання
                            </h2>
                            <ul className="footer__list_category">
                                <li className="footer__list_item">
                                    <NavLink
                                        to="/"
                                        className="footer__list_link"
                                    >
                                        Поширені питання
                                    </NavLink>
                                </li>
                                <li className="footer__list_item">
                                    <NavLink
                                        to="/"
                                        className="footer__list_link"
                                    >
                                        Гарантії та повернення
                                    </NavLink>
                                </li>
                                <li className="footer__list_item">
                                    <NavLink
                                        to="/"
                                        className="footer__list_link"
                                    >
                                        Умови співпраці
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__list footer__list_order3">
                            <h2 className="footer__list_title">
                                Наші магазини
                            </h2>
                            <ul className="footer__list_category">
                                <li className="footer__list_item">
                                    <a
                                        className="footer__list_link"
                                        href="http://surl.li/inizg"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        м.Львів, вул. Богдана <br />{' '}
                                        Хмельницького 10
                                    </a>
                                </li>
                                <li className="footer__list_item">
                                    <a
                                        className="footer__list_link"
                                        href="http://surl.li/inizl"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        м.Київ, вул. Лятошинського 4а
                                    </a>
                                </li>
                                <li className="footer__list_item">
                                    <a
                                        className="footer__list_link"
                                        href="http://surl.li/inizu"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        м.Харків, вул. Перемоги 2б
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__list footer__list_order4">
                            <h2 className="footer__list_title footer__list_title_schedule">
                                Графік роботи
                            </h2>
                            <ul className="footer__list_category">
                                <li className="footer__list_worktime">
                                    10:00 - 20:00 пн-нд
                                </li>
                            </ul>
                        </div>
                        <div className="footer__list footer__list_order2">
                            <h2 className="footer__list_title">Контакти</h2>
                            <ul className="footer__list_category">
                                <li className="footer__list_item">
                                    <a
                                        className="footer__list_link"
                                        href="tel:380937241094"
                                    >
                                        +380937241094
                                    </a>
                                </li>
                                <li className="footer__list_item">
                                    <a
                                        className="footer__list_link"
                                        href="tel:380677508096"
                                    >
                                        +380677508096
                                    </a>
                                </li>
                                <li className="footer__list_item">
                                    <a
                                        className="footer__list_link"
                                        href="tel:3808002021114"
                                    >
                                        +3808002021114
                                    </a>
                                </li>
                                <li className="footer__list_item">
                                    <a
                                        className="footer__list_link"
                                        href="mailto:cozy.home@gmail.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        cozy.home@gmail.com
                                    </a>
                                </li>
                            </ul>
                            <ul className="footer__icons_list">
                                <li className="footer__icons_item">
                                    <a
                                        className="footer__icons_link"
                                        aria-label="Visit Telegram"
                                        href="https://web.telegram.org/a/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <svg
                                            className="footer__icons_image"
                                            width="16"
                                            height="16"
                                        >
                                            <use
                                                href={`${footerSprites}#telegram-icon`}
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li className="footer__icons_item">
                                    <a
                                        className="footer__icons_link"
                                        aria-label="Visit Instagram"
                                        href="https://www.instagram.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <svg
                                            className="footer__icons_image"
                                            width="16"
                                            height="16"
                                        >
                                            <use
                                                href={`${footerSprites}#instagram-icon`}
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li className="footer__icons_item">
                                    <a
                                        className="footer__icons_link"
                                        aria-label="Visit Facebook"
                                        href="https://www.facebook.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <svg
                                            className="footer__icons_image"
                                            width="16"
                                            height="16"
                                        >
                                            <use
                                                href={`${footerSprites}#facebook-icon`}
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="footer__terms-policy">
                    <div className="footer__terms-policy_text">
                        <span className="footer__terms-policy_text_year">
                            © COZY HOME 2023
                        </span>
                        <a href="/" className="footer__terms-policy_text_link">
                            <p className="footer__terms-policy_text_terms">
                                Всі права захищені
                            </p>
                        </a>
                        <span className="footer__terms-policy_text_slash">
                            |
                        </span>
                        <a href="/" className="footer__terms-policy_text_link">
                            <p className="footer__terms-policy_text_policy">
                                Політика конфіденційності
                            </p>
                        </a>
                    </div>
                    <div className="footer__terms-policy_icons">
                        <img width="41" height="14" src={visaIcon} alt="Visa" />
                        <img
                            width="24"
                            height="19"
                            src={mastercardIcon}
                            alt="Mastercard"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
});

export default Footer;
