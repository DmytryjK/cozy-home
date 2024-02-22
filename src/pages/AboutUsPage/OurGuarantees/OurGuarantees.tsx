import { useEffect } from 'react';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import guarentee1 from '../../../assets/icons/about-us/guarentee1.svg';
import guarentee2 from '../../../assets/icons/about-us/guarentee2.svg';
import guarentee3 from '../../../assets/icons/about-us/guarentee3.svg';
import './OurGuarantees.scss';

const OurGuarantees = ({ offset }: { offset: string }) => {
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();
    const controls4 = useAnimation();

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
    const [ref4, inView4] = useInView(inViewOptions);

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
        if (inView4) {
            controls4.start('visible');
        }
    }, [controls1, inView1, inView2, inView3, inView4]);
    return (
        <section className="our-guarantees">
            <div className="container">
                <div className="our-guarantees__content">
                    <motion.h2
                        ref={ref1}
                        initial="hidden"
                        variants={variants1}
                        animate={controls1}
                        className="our-guarantees__title about-title"
                    >
                        Наші гарантії
                    </motion.h2>
                    <ul className="our-guarantees__list">
                        <motion.li
                            ref={ref2}
                            initial="hidden"
                            variants={variants1}
                            animate={controls2}
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
                            ref={ref3}
                            initial="hidden"
                            variants={variants1}
                            animate={controls3}
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
                            ref={ref4}
                            initial="hidden"
                            variants={variants1}
                            animate={controls4}
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
