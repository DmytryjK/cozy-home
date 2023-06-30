import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import nextId from 'react-id-generator';
import ProductCard from '../ProductCard/ProductCard';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useFetch from '../../hooks/useFetch';
import { Product } from '../../types/types';
import './NewItems.scss';

const NewItems = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { data, loading, errorFetch } = useFetch('product/new');

    useEffect(() => {
        setProducts(data);
    }, [data]);

    const renderedItems = () => {
        return products?.map((product, index) => {
            if (index > 3) return null;
            return (
                <SwiperSlide key={nextId('card-of-newItems')}>
                    <li className="new-items__card">
                        <ProductCard product={product} />
                    </li>
                </SwiperSlide>
            );
        });
    };

    const renderedContent = () => {
        let resTemporary;
        if (errorFetch) {
            resTemporary = <ErrorMessage />;
        } else if (loading && !errorFetch) {
            resTemporary = <Loader />;
        } else if (!loading && !errorFetch) {
            resTemporary = renderedItems();
        }
        return resTemporary;
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
                        spaceBetween={0}
                        breakpoints={{
                            340: {
                                width: 320,
                                slidesPerView: 1,
                            },
                            640: {
                                width: 640,
                                slidesPerView: 2,
                            },
                            1024: {
                                width: 1024,
                                slidesPerView: 3,
                            },
                            1352: {
                                width: 1344,
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {renderedContent()}
                    </Swiper>
                </ul>
            </div>
        </section>
    );
};

export default NewItems;
