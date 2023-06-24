import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import nextId from 'react-id-generator';
import promoImg1 from '../../assets/images/promo/promo-1.jpg';
import promoImg2 from '../../assets/images/promo/promo-2.jpg';
import 'swiper/css/pagination';
import './Promo.scss';

const Promo = () => {
    return (
        <section className="promo">
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
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: '32px',
                        },
                    }}
                >
                    <SwiperSlide key={nextId('promo-item')}>
                        <a className="promo__add-link add-link" href="/">
                            <h2 className="add-link__title">
                                Vintage Loft Heritage Collection
                            </h2>
                            <span className="add-link__decorative">
                                <span className="add-link__decorative-text">
                                    Детальніше
                                </span>
                            </span>
                            <img
                                className="add-link__bg-img"
                                src={promoImg1}
                                alt="Vintage Loft Heritage Collection"
                            />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide key={nextId('card-of-newItems')}>
                        <a className="promo__add-link add-link" href="/">
                            <h2 className="add-link__title">
                                Urban Industrial Living
                            </h2>
                            <span className="add-link__decorative">
                                <span className="add-link__decorative-text">
                                    Детальніше
                                </span>
                            </span>
                            <img
                                className="add-link__bg-img"
                                src={promoImg2}
                                alt="Vintage Loft Heritage Collection"
                            />
                        </a>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
};

export default Promo;
