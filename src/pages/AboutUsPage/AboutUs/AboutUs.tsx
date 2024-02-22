import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Odometer from 'react-odometerjs';
import { useInView } from 'react-intersection-observer';
import './AboutUs.scss';

const AboutUs = ({ offset }: { offset: string }) => {
    const controls1 = useAnimation();
    const controls2 = useAnimation();

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

    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [value3, setValue3] = useState(0);
    useEffect(() => {
        let timeoutId: any = null;
        if (inView1 || inView2) {
            timeoutId = setTimeout(() => {
                setValue1(2011);
                setValue2(320);
                setValue3(10000);
            }, 100);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [inView1, inView2]);

    useEffect(() => {
        if (inView1) {
            controls1.start('visible');
        }
        if (inView2) {
            controls2.start('visible');
        }
    }, [controls1, inView1, inView2]);
    return (
        <section className="about-us">
            <div className="container">
                <div className="about-us__content">
                    <motion.h1
                        ref={ref1}
                        initial="hidden"
                        variants={variants1}
                        animate={controls1}
                        className="about-us__title"
                    >
                        Ласкаво просимо до нашої компанії! Ми - команда
                        фахівців, що займається виготовленням та продажем
                        високоякісних меблів для вашої оселі. Наша місія -
                        створювати найкращі рішення для вашого комфорту та
                        стилю.
                    </motion.h1>
                    <motion.ul
                        ref={ref2}
                        initial="hidden"
                        variants={variants1}
                        animate={controls2}
                        className="about-us__statistics"
                    >
                        <li className="about-us__statistics-item">
                            <Odometer
                                className="about-us__statistics-text"
                                value={value1}
                                format="dddd"
                            />
                            <h2 className="about-us__statistics-title">
                                Ми відкрились
                            </h2>
                        </li>
                        <li className="about-us__statistics-item">
                            <div className="about-us__statistics-text-wrapper">
                                <Odometer
                                    className="about-us__statistics-text"
                                    value={value2}
                                    format="ddd"
                                />
                                <p className="about-us__statistics-text">+</p>
                            </div>

                            <h2 className="about-us__statistics-title">
                                Виконаних замовлень
                            </h2>
                        </li>
                        <li className="about-us__statistics-item">
                            <Odometer
                                className="about-us__statistics-text"
                                value={value3}
                                format="dd ddd"
                            />
                            <h2 className="about-us__statistics-title">
                                Виготовлених меблів
                            </h2>
                        </li>
                    </motion.ul>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
