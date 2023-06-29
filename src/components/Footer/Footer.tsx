import './Footer.scss';
import footerLogo from '../../assets/icons/header/logo-icon.svg';
import visaIcon from '../../assets/icons/footer/visa-icon.svg';
import mastercardIcon from '../../assets/icons/footer/mastercard-icon.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <div className="container">
                    <img
                        className="footer__logo"
                        src={footerLogo}
                        alt="CozyHome"
                    />
                    <div className="footer__nav_wrapper">
                        <div className="footer__list footer__list_order1">
                            <h2 className="footer__list_title">
                                Корисні Посилання
                            </h2>
                            <ul className="footer__list_category">
                                <li className="footer__list_item">
                                    <a href="/" className="footer__list_link">
                                        Поширені питання
                                    </a>
                                </li>
                                <li className="footer__list_item">
                                    <a href="/" className="footer__list_link">
                                        Гарантії та повернення
                                    </a>
                                </li>
                                <li className="footer__list_item">
                                    <a href="/" className="footer__list_link">
                                        Умови співпраці
                                    </a>
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
                                        м. Київ, вул. Лятошинського 4а
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
                                        href="https://web.telegram.org/a/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <svg
                                            className="footer__icons_image"
                                            width="30"
                                            height="30"
                                            viewBox="0 0 30 30"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                className="footer__list_icons_telegram_path"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M19.3217 20.1931V20.1918L19.3337 20.1631L21.333 10.0831V10.0511C21.333 9.79979 21.2397 9.58046 21.0383 9.44913C20.8617 9.33379 20.6583 9.32579 20.5157 9.33646C20.3829 9.34847 20.2518 9.37531 20.125 9.41646C20.0709 9.4339 20.0175 9.45347 19.965 9.47513L19.9563 9.47846L8.80966 13.8511L8.80632 13.8525C8.77243 13.864 8.73926 13.8776 8.70699 13.8931C8.62771 13.9287 8.55166 13.9711 8.47966 14.0198C8.33632 14.1185 8.06366 14.3505 8.10966 14.7185C8.14766 15.0238 8.35766 15.2171 8.49966 15.3178C8.58347 15.3765 8.67359 15.4257 8.76832 15.4645L8.78966 15.4738L8.79632 15.4758L8.80099 15.4778L10.7517 16.1345C10.745 16.2565 10.757 16.3811 10.7897 16.5045L11.7663 20.2105C11.8197 20.4125 11.935 20.5927 12.096 20.7258C12.257 20.859 12.4557 20.9383 12.6642 20.9527C12.8726 20.9671 13.0803 20.9159 13.2582 20.8062C13.436 20.6965 13.575 20.5339 13.6557 20.3411L15.181 18.7105L17.8003 20.7185L17.8377 20.7345C18.0757 20.8385 18.2977 20.8711 18.501 20.8438C18.7043 20.8158 18.8657 20.7305 18.987 20.6338C19.1273 20.52 19.2392 20.3751 19.3137 20.2105L19.319 20.1991L19.321 20.1951L19.3217 20.1931ZM11.7563 16.2498C11.7455 16.2087 11.7481 16.1652 11.7637 16.1256C11.7792 16.0861 11.807 16.0525 11.843 16.0298L18.457 11.8298C18.457 11.8298 18.8463 11.5931 18.8323 11.8298C18.8323 11.8298 18.9017 11.8711 18.693 12.0651C18.4957 12.2498 13.979 16.6105 13.5217 17.0518C13.4962 17.0765 13.4784 17.108 13.4703 17.1425L12.733 19.9558L11.7563 16.2491V16.2498Z"
                                                fill="#262626"
                                            />
                                            <circle
                                                cx="15"
                                                cy="15"
                                                r="14.5"
                                                stroke="#262626"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li className="footer__icons_item">
                                    <a
                                        className="footer__icons_link"
                                        href="https://www.instagram.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <svg
                                            className="footer__icons_image"
                                            width="30"
                                            height="30"
                                            viewBox="0 0 30 30"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="15"
                                                cy="15"
                                                r="14.5"
                                                stroke="#262626"
                                            />
                                            <path
                                                d="M15.6854 8.33383C16.1719 8.33196 16.6584 8.33685 17.1447 8.34849L17.2741 8.35316C17.4234 8.35849 17.5707 8.36516 17.7487 8.37316C18.4581 8.40649 18.9421 8.51849 19.3667 8.68316C19.8067 8.85249 20.1774 9.08183 20.5481 9.45249C20.887 9.78557 21.1493 10.1885 21.3167 10.6332C21.4814 11.0578 21.5934 11.5425 21.6267 12.2518C21.6347 12.4292 21.6414 12.5772 21.6467 12.7265L21.6507 12.8558C21.6626 13.342 21.6677 13.8282 21.6661 14.3145L21.6667 14.8118V15.6852C21.6684 16.1717 21.6633 16.6581 21.6514 17.1445L21.6474 17.2738C21.6421 17.4232 21.6354 17.5705 21.6274 17.7485C21.5941 18.4578 21.4807 18.9418 21.3167 19.3665C21.1498 19.8117 20.8875 20.2149 20.5481 20.5478C20.2147 20.8867 19.8116 21.149 19.3667 21.3165C18.9421 21.4812 18.4581 21.5932 17.7487 21.6265C17.5707 21.6345 17.4234 21.6412 17.2741 21.6465L17.1447 21.6505C16.6584 21.6623 16.1719 21.6675 15.6854 21.6658L15.1881 21.6665H14.3154C13.8289 21.6681 13.3424 21.663 12.8561 21.6512L12.7267 21.6472C12.5685 21.6414 12.4102 21.6348 12.2521 21.6272C11.5427 21.5938 11.0587 21.4805 10.6334 21.3165C10.1885 21.1494 9.78555 20.887 9.45273 20.5478C9.11342 20.2147 8.85088 19.8115 8.68339 19.3665C8.51873 18.9418 8.40673 18.4578 8.37339 17.7485C8.36597 17.5903 8.3593 17.4321 8.35339 17.2738L8.35006 17.1445C8.33777 16.6582 8.33221 16.1717 8.33339 15.6852V14.3145C8.33153 13.8282 8.33642 13.342 8.34806 12.8558L8.35273 12.7265C8.35806 12.5772 8.36473 12.4292 8.37273 12.2518C8.40606 11.5418 8.51806 11.0585 8.68273 10.6332C8.85031 10.1882 9.11337 9.78546 9.45339 9.45316C9.78599 9.11366 10.1887 8.85088 10.6334 8.68316C11.0587 8.51849 11.5421 8.40649 12.2521 8.37316L12.7267 8.35316L12.8561 8.34983C13.3422 8.33754 13.8284 8.33199 14.3147 8.33316L15.6854 8.33383ZM15.0001 11.6672C14.5584 11.6609 14.1199 11.7425 13.71 11.9072C13.3002 12.0719 12.9272 12.3164 12.6126 12.6265C12.2981 12.9366 12.0483 13.3062 11.8779 13.7137C11.7074 14.1212 11.6196 14.5585 11.6196 15.0002C11.6196 15.4419 11.7074 15.8792 11.8779 16.2867C12.0483 16.6941 12.2981 17.0637 12.6126 17.3738C12.9272 17.6839 13.3002 17.9284 13.71 18.0931C14.1199 18.2578 14.5584 18.3394 15.0001 18.3332C15.8841 18.3332 16.732 17.982 17.3571 17.3569C17.9822 16.7317 18.3334 15.8839 18.3334 14.9998C18.3334 14.1158 17.9822 13.2679 17.3571 12.6428C16.732 12.0177 15.8841 11.6672 15.0001 11.6672ZM15.0001 13.0005C15.2657 12.9956 15.5297 13.0437 15.7766 13.142C16.0235 13.2402 16.2483 13.3867 16.4379 13.5729C16.6275 13.759 16.7782 13.981 16.881 14.2261C16.9839 14.4711 17.0369 14.7341 17.0369 14.9998C17.0369 15.2655 16.984 15.5286 16.8813 15.7736C16.7785 16.0187 16.628 16.2408 16.4384 16.427C16.2488 16.6132 16.0241 16.7597 15.7772 16.8581C15.5304 16.9565 15.2664 17.0046 15.0007 16.9998C14.4703 16.9998 13.9616 16.7891 13.5865 16.414C13.2114 16.039 13.0007 15.5303 13.0007 14.9998C13.0007 14.4694 13.2114 13.9607 13.5865 13.5856C13.9616 13.2105 14.4703 12.9998 15.0007 12.9998L15.0001 13.0005ZM18.5001 10.6672C18.285 10.6758 18.0816 10.7673 17.9325 10.9225C17.7833 11.0777 17.7001 11.2846 17.7001 11.4998C17.7001 11.7151 17.7833 11.922 17.9325 12.0772C18.0816 12.2324 18.285 12.3239 18.5001 12.3325C18.7211 12.3325 18.933 12.2447 19.0893 12.0884C19.2456 11.9321 19.3334 11.7202 19.3334 11.4992C19.3334 11.2781 19.2456 11.0662 19.0893 10.9099C18.933 10.7536 18.7211 10.6658 18.5001 10.6658V10.6672Z"
                                                fill="#262626"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li className="footer__icons_item">
                                    <a
                                        className="footer__icons_link"
                                        href="https://www.facebook.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <svg
                                            className="footer__icons_image"
                                            width="30"
                                            height="30"
                                            viewBox="0 0 30 30"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="15"
                                                cy="15"
                                                r="14.5"
                                                stroke="#262626"
                                            />
                                            <path
                                                d="M13.1315 21.3337H15.7982V15.9937H18.2008L18.4648 13.3403H15.7982V12.0003C15.7982 11.8235 15.8684 11.6539 15.9934 11.5289C16.1185 11.4039 16.288 11.3337 16.4648 11.3337H18.4648V8.66699H16.4648C15.5808 8.66699 14.7329 9.01818 14.1078 9.6433C13.4827 10.2684 13.1315 11.1163 13.1315 12.0003V13.3403H11.7982L11.5342 15.9937H13.1315V21.3337Z"
                                                fill="#262626"
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
};

export default Footer;
