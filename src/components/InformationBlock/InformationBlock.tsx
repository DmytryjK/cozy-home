import './InformationBlock.scss';
import sevenIcon from '../../assets/icons/information/seven-icon.svg';
import fourteenIcon from '../../assets/icons/information/fourteen-icon.svg';
import zeroIcon from '../../assets/icons/information/zero-icon.svg';
import fiveIcon from '../../assets/icons/information/five-icon.svg';

const InformationBlock = () => {
    return (
        <section className="information">
            <div className="container">
                <div className="information__content">
                    <h2 className="information__content_title">Чому саме ми</h2>
                    <p className="information__content_text">
                        Ми гарантуємо вам стильні рішення, які підкреслять вашу
                        індивідуальність та створять чудовий простір для
                        відпочинку та натхнення.
                    </p>
                </div>
                <div className="flex">
                    <div className="information__content_pros">
                        <div className="information__content_pros_info">
                            <img
                                src={sevenIcon}
                                alt="Seven"
                                className="information__content_pros_info_img"
                            />
                            <h3 className="information__content_pros_info_title">
                                Років
                            </h3>
                        </div>
                        <p className="information__content_pros_description">
                            на ринку України. Досвід яким ми пишаємося.
                        </p>
                    </div>
                    <div className="information__content_pros">
                        <div className="information__content_pros_info">
                            <img
                                src={fourteenIcon}
                                alt="Fourteen"
                                className="information__content_pros_info_img"
                            />
                            <h3 className="information__content_pros_info_title">
                                Днів
                            </h3>
                        </div>
                        <p className="information__content_pros_description">
                            з дати замовлення і воно вже у вас в квартирі.
                            Швидке виготовлення та доставка
                        </p>
                    </div>
                    <div className="information__content_pros">
                        <div className="information__content_pros_info">
                            <img
                                src={zeroIcon}
                                alt="Zero"
                                className="information__content_pros_info_img"
                            />
                            <h3 className="information__content_pros_info_title">
                                Гривень
                            </h3>
                        </div>
                        <p className="information__content_pros_description">
                            за доставку. Безкоштовно доставимо вам товар до
                            дверей квартири
                        </p>
                    </div>
                    <div className="information__content_pros">
                        <div className="information__content_pros_info">
                            <img
                                src={fiveIcon}
                                alt="Five"
                                className="information__content_pros_info_img"
                            />
                            <h3 className="information__content_pros_info_title">
                                Дизайнерів
                            </h3>
                        </div>
                        <p className="information__content_pros_description">
                            які надають безкоштовну консультацію по вашому
                            інтер'єру та допоможуть з вибором
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InformationBlock;
