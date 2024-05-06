import { LazyMotion, m, domAnimation } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import promoImg1_webp from '../../../../assets/images/promo/promo-1.webp';
import promoImg2_webp from '../../../../assets/images/promo/promo-2.webp';
import promoImg1 from '../../../../assets/images/promo/promo-1_opt.png';
import promoImg2 from '../../../../assets/images/promo/promo-2_opt.png';
import 'swiper/css/pagination';
import 'swiper/css';
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
    return (
        <LazyMotion features={domAnimation} strict>
            <m.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: `-80px 0px` }}
                variants={variants}
                className="promo"
            >
                <div className="container container_pd-off">
                    <Swiper
                        className="promo__slider"
                        spaceBetween={32}
                        modules={[Pagination]}
                        grabCursor
                        speed={500}
                        pagination={{ clickable: false }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: '16px',
                            },
                            440: {
                                slidesPerView: 1,
                                spaceBetween: '16px',
                            },
                            550: {
                                slidesPerView: 1.3,
                                spaceBetween: '16px',
                            },
                            768: {
                                slidesPerView: 1.5,
                                spaceBetween: '24px',
                            },
                            1101: {
                                slidesPerView: 2,
                                spaceBetween: '32px',
                            },
                        }}
                    >
                        <SwiperSlide key="promo-item-1">
                            <div className="promo__add-link add-link">
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
                                {/* <span className="add-link__decorative">
                                    <span className="add-link__decorative-text">
                                        Детальніше
                                    </span>
                                </span> */}
                            </div>
                        </SwiperSlide>
                        <SwiperSlide key="promo-item-2">
                            <div className="promo__add-link add-link">
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
                                {/* <span className="add-link__decorative">
                                    <span className="add-link__decorative-text">
                                        Детальніше
                                    </span>
                                </span> */}
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </m.section>
        </LazyMotion>
    );
};

export default Promo;
