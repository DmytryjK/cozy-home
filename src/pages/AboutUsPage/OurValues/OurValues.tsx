import { useRef } from 'react';
import { motion } from 'framer-motion';
import nextId from 'react-id-generator';
import LazyLoad from 'react-lazy-load';
import ourValues from '../../../assets/images/about-us/our-values.png';
import qualityIcon from '../../../assets/icons/about-us/quality.svg';
import comfortIcon from '../../../assets/icons/about-us/comfort.svg';
import designIcon from '../../../assets/icons/about-us/design.svg';
import innovationsIcon from '../../../assets/icons/about-us/innovations.svg';
import './OurValues.scss';

const OurValues = ({ offset }: { offset: string }) => {
    const ulRef = useRef(null);
    const variants1 = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: 'easeOut', delay: 0 },
        },
        hidden: { opacity: 0, y: 50 },
    };

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
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: `-${offset} 0px` }}
                        variants={variants1}
                        className="our-values__title about-title"
                    >
                        Наші цінності
                    </motion.h2>
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: `-${offset} 0px` }}
                        variants={variants1}
                        className="our-values__descr about-descr"
                    >
                        Наші цінності визначають те, як ми працюємо та які
                        продукти ми створюємо, відділяючи нас від конкурентів та
                        надаючи нашим клієнтам унікальну якість і досвід.
                    </motion.p>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: `-${offset} 0px` }}
                        variants={variants1}
                        className="our-values__photo-wrapper"
                    >
                        <LazyLoad>
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
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: `-${offset} 0px`,
                            root: ulRef,
                        }}
                        variants={variants1}
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
