import { useEffect, FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import nextId from 'react-id-generator';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { fetchNewItemsAllProducts } from '../../../../store/newItemsSlice';
import ProductCard from '../../../../shared-components/ProductCard/ProductCard';
import renderServerData from '../../../../helpers/renderServerData';
import './NewItems.scss';

const NewItems: FC = () => {
    const { products, loading, error } = useAppSelector(
        (state) => state.newItems
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchNewItemsAllProducts());
    }, [dispatch]);

    const items = () => {
        const content = [];
        for (let i = 0; i < Math.min(products.length, 4); i += 1) {
            content.push(
                <SwiperSlide key={nextId('card-of-newItems')}>
                    <li className="new-items__card">
                        <ProductCard product={products[i]} />
                    </li>
                </SwiperSlide>
            );
        }
        return content;
    };

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
                        slidesPerView={4}
                        breakpoints={{
                            0: {
                                slidesPerView: 'auto',
                            },
                            340: {
                                slidesPerView: 1.12,
                                spaceBetween: 16,
                            },
                            400: {
                                slidesPerView: 1.2,
                                spaceBetween: 24,
                            },
                            424: {
                                slidesPerView: 1.3,
                                spaceBetween: 24,
                            },
                            546: {
                                slidesPerView: 1.7,
                                spaceBetween: 24,
                            },
                            700: {
                                slidesPerView: 2.2,
                                spaceBetween: 24,
                            },
                            810: {
                                slidesPerView: 2.5,
                                spaceBetween: 24,
                            },
                            1100: {
                                slidesPerView: 3.4,
                                spaceBetween: 32,
                            },
                            1294: {
                                slidesPerView: 4,
                                spaceBetween: 32,
                            },
                        }}
                    >
                        {renderServerData({
                            error,
                            loading,
                            content: items,
                        })}
                    </Swiper>
                </ul>
            </div>
        </section>
    );
};

export default NewItems;
