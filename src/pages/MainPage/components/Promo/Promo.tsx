import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import nextId from 'react-id-generator';
import LazyLoad from 'react-lazy-load';
import promoImg1_webp from '../../../../assets/images/promo/promo-1.webp';
import promoImg2_webp from '../../../../assets/images/promo/promo-2.webp';
import promoImg1 from '../../../../assets/images/promo/promo-1_opt.png';
import promoImg2 from '../../../../assets/images/promo/promo-2_opt.png';
import 'swiper/css/pagination';
import './Promo.scss';

const Promo = () => {
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                ease: 'easeOut',
                duration: 0.5,
                delay: 0,
            },
        },
    };
    const controls = useAnimation();
    const [ref2, inView2] = useInView({
        triggerOnce: true,
        rootMargin: '-80px',
    });

    useEffect(() => {
        if (inView2) {
            controls.start('visible');
        }
    }, [inView2]);
    return (
        <motion.section
            ref={ref2}
            initial="hidden"
            animate={controls}
            variants={variants}
            className="promo"
        >
            <div className="container container_pd-off">
                <Swiper
                    className="promo__slider"
                    spaceBetween={32}
                    modules={[Pagination]}
                    pagination={{ clickable: false }}
                    breakpoints={{
                        0: {
                            slidesPerView: 'auto',
                            spaceBetween: '16px',
                        },
                        360: {
                            slidesPerView: 1,
                            spaceBetween: '16px',
                        },
                        550: {
                            slidesPerView: 'auto',
                            spaceBetween: '16px',
                        },
                        768: {
                            slidesPerView: 'auto',
                            spaceBetween: '24px',
                        },
                        1101: {
                            slidesPerView: 2,
                            spaceBetween: '32px',
                        },
                    }}
                >
                    <SwiperSlide key={nextId('promo-item')}>
                        <a className="promo__add-link add-link" href="/">
                            <picture>
                                <source
                                    className="add-link__bg-img"
                                    type="image/webp"
                                    srcSet={promoImg1_webp}
                                />
                                <img
                                    className="add-link__bg-img"
                                    src={promoImg1}
                                    alt="Vintage Loft Heritage Collection"
                                />
                            </picture>
                            <h2 className="add-link__title">
                                Vintage Loft Heritage Collection
                            </h2>
                            <span className="add-link__decorative">
                                <span className="add-link__decorative-text">
                                    Детальніше
                                </span>
                            </span>
                        </a>
                    </SwiperSlide>
                    <SwiperSlide key={nextId('card-of-newItems')}>
                        <a className="promo__add-link add-link" href="/">
                            <picture>
                                <source
                                    className="add-link__bg-img"
                                    type="image/webp"
                                    srcSet={promoImg2_webp}
                                />
                                <img
                                    className="add-link__bg-img"
                                    src={promoImg2}
                                    alt="Vintage Loft Heritage Collection"
                                />
                            </picture>
                            <h2 className="add-link__title">
                                Urban Industrial Living
                            </h2>
                            <span className="add-link__decorative">
                                <span className="add-link__decorative-text">
                                    Детальніше
                                </span>
                            </span>
                        </a>
                    </SwiperSlide>
                </Swiper>
            </div>
        </motion.section>
    );
};

export default Promo;
