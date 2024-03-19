import footerSprites from '../../../assets/icons/footer/footer-sprite.svg';
import './Social.scss';

const Social = () => {
    return (
        <section className="social">
            <div className="container">
                <h2 className="contacts__title_h2">Ми в соціальних мережах</h2>
                <ul className="social__list">
                    <li className="social__item">
                        <a
                            className="social__item-link"
                            href="https://www.instagram.com/"
                            target="blank"
                        >
                            <div className="social__item-icon-wrapper">
                                <svg
                                    className="social__item-icon"
                                    width="16"
                                    height="16"
                                >
                                    <use
                                        href={`${footerSprites}#instagram-icon`}
                                    />
                                </svg>
                            </div>
                            <h3 className="social__item-title">Instagram</h3>
                        </a>
                    </li>
                    <li className="social__item">
                        <a
                            className="social__item-link"
                            href="https://web.telegram.org/a/"
                            target="blank"
                        >
                            <div className="social__item-icon-wrapper">
                                <svg
                                    className="social__item-icon"
                                    width="16"
                                    height="16"
                                >
                                    <use
                                        href={`${footerSprites}#telegram-icon`}
                                    />
                                </svg>
                            </div>
                            <h3 className="social__item-title">Telegram</h3>
                        </a>
                    </li>
                    <li className="social__item">
                        <a
                            className="social__item-link"
                            href="https://www.facebook.com/"
                            target="blank"
                        >
                            <div className="social__item-icon-wrapper">
                                <svg
                                    className="social__item-icon"
                                    width="16"
                                    height="16"
                                >
                                    <use
                                        href={`${footerSprites}#facebook-icon`}
                                    />
                                </svg>
                            </div>
                            <h3 className="social__item-title">Facebook</h3>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Social;
