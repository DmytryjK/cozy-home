import { motion } from 'framer-motion';
import guarentee1 from '../../../assets/icons/about-us/guarentee1.svg';
import guarentee2 from '../../../assets/icons/about-us/guarentee2.svg';
import guarentee3 from '../../../assets/icons/about-us/guarentee3.svg';
import './OurGuarantees.scss';

const OurGuarantees = ({ offset }: { offset: string }) => {
    const variants1 = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: 'easeOut' },
        },
        hidden: { opacity: 0, y: 50 },
    };

    return (
        <section className="our-guarantees">
            <div className="container">
                <div className="our-guarantees__content">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: `-${offset} 0px` }}
                        variants={variants1}
                        className="our-guarantees__title about-title"
                    >
                        Наші гарантії
                    </motion.h2>
                    <ul className="our-guarantees__list">
                        <motion.li
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: `-${offset} 0px` }}
                            variants={variants1}
                            className="our-guarantees__item"
                        >
                            <div className="our-guarantees__item-icon-wrapper">
                                <img
                                    className="our-guarantees__item-icon"
                                    src={guarentee1}
                                    alt=""
                                />
                            </div>
                            <h3 className="our-guarantees__item-title">
                                Якість і гарантія
                            </h3>
                            <p className="our-guarantees__item-text">
                                На всі наші меблі надається гарантія. Ми віримо
                                у якість наших виробів.
                            </p>
                        </motion.li>
                        <motion.li
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: `-${offset} 0px` }}
                            variants={variants1}
                            className="our-guarantees__item"
                        >
                            <div className="our-guarantees__item-icon-wrapper">
                                <img
                                    className="our-guarantees__item-icon"
                                    src={guarentee2}
                                    alt=""
                                />
                            </div>
                            <h3 className="our-guarantees__item-title">
                                Зручна доставка
                            </h3>
                            <p className="our-guarantees__item-text">
                                Ми забезпечуємо швидку і надійну доставку вашого
                                замовлення прямо до вашого дому. БЕЗКОШТОВНО!
                            </p>
                        </motion.li>
                        <motion.li
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: `-${offset} 0px` }}
                            variants={variants1}
                            className="our-guarantees__item"
                        >
                            <div className="our-guarantees__item-icon-wrapper">
                                <img
                                    className="our-guarantees__item-icon"
                                    src={guarentee3}
                                    alt=""
                                />
                            </div>
                            <h3 className="our-guarantees__item-title">
                                Професійний підхід
                            </h3>
                            <p className="our-guarantees__item-text">
                                Наша команда завжди готова надати професійну
                                консультацію і допомогу у виборі меблів.
                            </p>
                        </motion.li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default OurGuarantees;
