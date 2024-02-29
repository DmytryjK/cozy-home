import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import nextId from 'react-id-generator';
import LazyLoad from 'react-lazy-load';
import ourValues from '../../../assets/images/about-us/our-values.png';
import qualityIcon from '../../../assets/icons/about-us/quality.svg';
import comfortIcon from '../../../assets/icons/about-us/comfort.svg';
import designIcon from '../../../assets/icons/about-us/design.svg';
import innovationsIcon from '../../../assets/icons/about-us/innovations.svg';
import './OurValues.scss';

const OurValues = ({ offset }: { offset: string }) => {
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();
    const controls4 = useAnimation();

    const variants1 = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: 'easeOut', delay: 0 },
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

    const textForListItems = [
        {
            imgSrc: qualityIcon,
            title: 'Якість',
            descr: 'Ми завжди прагнемо до найвищого стандарту якості у виготовленні наших меблів. Кожен детально працюємо, щоб забезпечити тривалість і надійність наших виробів.',
        },
        {
            imgSrc: comfortIcon,
            title: 'Зручність',
            descr: 'Ми розуміємо, як важливо, щоб меблі були зручними та практичними. Наші вироби розроблені з урахуванням вашого комфорту та потреб.',
        },
        {
            imgSrc: designIcon,
            title: 'Дизайн',
            descr: 'Наші дизайнери постійно вдосконалюються та створюють сучасні та стильні рішення, щоб ваша домівка виглядала неперевершено.',
        },
        {
            imgSrc: innovationsIcon,
            title: 'Інновація',
            descr: 'Ми постійно шукаємо нові способи покращення наших виробів і процесів, завдяки чому можемо пропонувати інноваційні рішення для вашого дому.',
        },
    ];

    const listItems = () => {
        return textForListItems.map((item, index) => {
            const { imgSrc, title, descr } = item;
            return (
                <li key={`values-${nextId()}`} className="our-values__item">
                    <div className="our-values__item-icon-wrapper">
                        <img
                            className="our-values__item-icon"
                            src={imgSrc}
                            alt=""
                        />
                    </div>
                    <div className="our-values__item-inner-text">
                        <h3 className="our-values__item-title">{title}</h3>
                        <p className="our-values__item-text">{descr}</p>
                    </div>
                </li>
            );
        });
    };

    return (
        <section className="our-values">
            <div className="container">
                <div className="our-values__content">
                    <motion.h2
                        ref={ref1}
                        initial="hidden"
                        variants={variants1}
                        animate={controls1}
                        className="our-values__title about-title"
                    >
                        Наші цінності
                    </motion.h2>
                    <motion.p
                        ref={ref2}
                        initial="hidden"
                        variants={variants1}
                        animate={controls2}
                        className="our-values__descr about-descr"
                    >
                        Наші цінності визначають те, як ми працюємо та які
                        продукти ми створюємо, відділяючи нас від конкурентів та
                        надаючи нашим клієнтам унікальну якість і досвід.
                    </motion.p>
                    <motion.div
                        ref={ref3}
                        initial="hidden"
                        variants={variants1}
                        animate={controls3}
                        className="our-values__photo-wrapper"
                    >
                        <LazyLoad height={400}>
                            <img
                                className="our-values__photo"
                                src={ourValues}
                                alt="two people show their hands on different colors textile"
                                loading="lazy"
                                width="1000px"
                                height="400px"
                            />
                        </LazyLoad>
                    </motion.div>
                    <motion.ul
                        ref={ref4}
                        initial="hidden"
                        variants={variants1}
                        animate={controls4}
                        className="our-values__list"
                    >
                        {listItems()}
                    </motion.ul>
                </div>
            </div>
        </section>
    );
};

export default OurValues;
