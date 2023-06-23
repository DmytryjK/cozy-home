import { Swiper, SwiperSlide } from 'swiper/react';
import nextId from 'react-id-generator';
import ProductCard from '../ProductCard/ProductCard';
import './NewItems.scss';

const NewItems = () => {
    return (
        <section className="new-items">
            <div className="container">
                <div className="new-items__top">
                    <h2 className="new-items__title">Новинки</h2>
                    <a className="new-items__see-all" href="/">
                        Дивитись всі
                    </a>
                </div>
            </div>
            <div className="container container_pd-right-off">
                <ul className="new-items__cards">
                    <Swiper
                        className="new-items__slider"
                        spaceBetween={32}
                        breakpoints={{
                            340: {
                                width: 304,
                                slidesPerView: 1,
                                spaceBetween: '24px',
                            },
                            640: {
                                width: 710,
                                slidesPerView: 2,
                            },
                            1024: {
                                width: 985,
                                slidesPerView: 3,
                            },
                            1352: {
                                width: 1310,
                                slidesPerView: 4,
                            },
                        }}
                    >
                        <SwiperSlide key={nextId('card-of-newItems')}>
                            <li className="new-items__card">
                                <ProductCard />
                            </li>
                        </SwiperSlide>
                        <SwiperSlide key={nextId('card-of-newItems')}>
                            <li className="new-items__card">
                                <ProductCard />
                            </li>
                        </SwiperSlide>
                        <SwiperSlide key={nextId('card-of-newItems')}>
                            <li className="new-items__card">
                                <ProductCard />
                            </li>
                        </SwiperSlide>
                        <SwiperSlide key={nextId('card-of-newItems')}>
                            <li className="new-items__card">
                                <ProductCard />
                            </li>
                        </SwiperSlide>
                    </Swiper>
                </ul>
            </div>
        </section>
    );
};

export default NewItems;
