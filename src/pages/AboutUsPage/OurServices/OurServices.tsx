import { motion } from 'framer-motion';
import LazyLoad from 'react-lazy-load';
import service1 from '../../../assets/images/about-us/service1.png';
import service2 from '../../../assets/images/about-us/service2.png';
import service3 from '../../../assets/images/about-us/service3.png';
import service4 from '../../../assets/images/about-us/service4.png';
import './OurServices.scss';

const OurServices = ({ offset }: { offset: string }) => {
    const variants1 = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: 'easeOut' },
        },
        hidden: { opacity: 0, y: 50 },
    };

    return (
        <section className="our-services">
            <div className="container">
                <div className="our-services__content">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: `-${offset} 0px` }}
                        variants={variants1}
                        className="our-services__title about-title"
                    >
                        Наші послуги
                    </motion.h2>
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: `-${offset} 0px` }}
                        variants={variants1}
                        className="our-services__descr about-descr"
                    >
                        Ми пропонуємо широкий вибір меблів для кожного смаку і
                        бюджету. Меблі у стилі loft - це наша сильна сторона. Ми
                        виготовляємо:
                    </motion.p>
                    <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: `-${offset} 0px` }}
                        variants={variants1}
                        className="our-services__list"
                    >
                        <li className="our-services__item">
                            <div className="our-services__item-top">
                                <LazyLoad>
                                    <img
                                        className="our-services__item-photo"
                                        src={service1}
                                        width="640px"
                                        height="320px"
                                        loading="lazy"
                                        alt=""
                                    />
                                </LazyLoad>
                            </div>
                            <div className="our-services__item-bottom">
                                <h3 className="our-services__item-title">
                                    Спальні меблі
                                </h3>
                                <p className="our-services__item-descr">
                                    Зручні ліжка, шафи, комоди і багато інших
                                    елементів для вашої спальні.
                                </p>
                            </div>
                        </li>
                        <li className="our-services__item">
                            <div className="our-services__item-top">
                                <LazyLoad>
                                    <img
                                        className="our-services__item-photo"
                                        src={service2}
                                        width="640px"
                                        height="320px"
                                        loading="lazy"
                                        alt=""
                                    />
                                </LazyLoad>
                            </div>
                            <div className="our-services__item-bottom">
                                <h3 className="our-services__item-title">
                                    Вітальні меблі
                                </h3>
                                <p className="our-services__item-descr">
                                    Софи, крісла, столи та тумби, які роблять
                                    вашу вітальню затишною та функціональною.
                                </p>
                            </div>
                        </li>
                        <li className="our-services__item">
                            <div className="our-services__item-top">
                                <LazyLoad>
                                    <img
                                        className="our-services__item-photo"
                                        src={service3}
                                        width="640px"
                                        height="320px"
                                        loading="lazy"
                                        alt=""
                                    />
                                </LazyLoad>
                            </div>
                            <div className="our-services__item-bottom">
                                <h3 className="our-services__item-title">
                                    Кухонні меблі
                                </h3>
                                <p className="our-services__item-descr">
                                    Кухонні гарнітури та столи, де ви можете
                                    готувати і влаштовувати смачні обіди.
                                </p>
                            </div>
                        </li>
                        <li className="our-services__item">
                            <div className="our-services__item-top">
                                <LazyLoad>
                                    <img
                                        className="our-services__item-photo"
                                        src={service4}
                                        width="640px"
                                        height="320px"
                                        loading="lazy"
                                        alt=""
                                    />
                                </LazyLoad>
                            </div>
                            <div className="our-services__item-bottom">
                                <h3 className="our-services__item-title">
                                    Дитячі меблі
                                </h3>
                                <p className="our-services__item-descr">
                                    Безпечні та стильні меблі для вашого малюка.
                                </p>
                            </div>
                        </li>
                    </motion.ul>
                </div>
            </div>
        </section>
    );
};

export default OurServices;
