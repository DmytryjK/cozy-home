import { useEffect } from 'react';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import service1 from '../../../assets/images/about-us/service1.png';
import service2 from '../../../assets/images/about-us/service2.png';
import service3 from '../../../assets/images/about-us/service3.png';
import service4 from '../../../assets/images/about-us/service4.png';
import './OurServices.scss';

const OurServices = ({ offset }: { offset: string }) => {
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();

    const variants1 = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: 'easeOut' },
        },
        hidden: { opacity: 0, y: 50 },
    };

    const inViewOptions = {
        rootMargin: `-${offset} 0px`,
        triggerOnce: true,
    };

    const [ref1, inView1] = useInView(inViewOptions);
    const [ref2, inView2] = useInView(inViewOptions);
    const [ref3, inView3] = useInView(inViewOptions);

    useEffect(() => {
        if (inView1) {
            controls1.start('visible');
        }
        if (inView2) {
            controls2.start('visible');
        }
        if (inView3) {
            controls3.start('visible');
        }
    }, [controls1, inView1, inView2, inView3]);
    return (
        <section className="our-services">
            <div className="container">
                <div className="our-services__content">
                    <motion.h2
                        ref={ref1}
                        initial="hidden"
                        variants={variants1}
                        animate={controls1}
                        className="our-services__title about-title"
                    >
                        Наші послуги
                    </motion.h2>
                    <motion.p
                        ref={ref2}
                        initial="hidden"
                        variants={variants1}
                        animate={controls2}
                        className="our-services__descr about-descr"
                    >
                        Ми пропонуємо широкий вибір меблів для кожного смаку і
                        бюджету. Меблі у стилі loft - це наша сильна сторона. Ми
                        виготовляємо:
                    </motion.p>
                    <motion.ul
                        ref={ref3}
                        initial="hidden"
                        variants={variants1}
                        animate={controls3}
                        className="our-services__list"
                    >
                        <li className="our-services__item">
                            <div className="our-services__item-top">
                                <img
                                    className="our-services__item-photo"
                                    src={service1}
                                    width={640}
                                    height={320}
                                    loading="lazy"
                                    alt=""
                                />
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
                                <img
                                    className="our-services__item-photo"
                                    src={service2}
                                    width={640}
                                    height={320}
                                    loading="lazy"
                                    alt=""
                                />
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
                                <img
                                    className="our-services__item-photo"
                                    src={service3}
                                    width={640}
                                    height={320}
                                    loading="lazy"
                                    alt=""
                                />
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
                                <img
                                    className="our-services__item-photo"
                                    src={service4}
                                    width={640}
                                    height={320}
                                    loading="lazy"
                                    alt=""
                                />
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
