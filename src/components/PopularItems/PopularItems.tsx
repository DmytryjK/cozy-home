import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper';
import nextId from 'react-id-generator';
import useFetch from '../../hooks/useFetch';
import ProductCard from '../ProductCard/ProductCard';
import Loader from '../Loader/Loader';
import { Product } from '../../types/types';
import './PopularItems.scss';
import 'swiper/css';
import 'swiper/css/grid';

const PopularItems = () => {
    const [activeCategory, setActiveCategory] = useState<string>('Всі товари');
    const [products, setProducts] = useState<Product[]>([]);
    const { data, loading, errorFetch } = useFetch('product/popular');

    useEffect(() => {
        setProducts(data);
    }, [data]);

    const categories: string[] = [
        'Дивани',
        'Крісла',
        'Столи',
        'Шафи',
        'Комоди',
        'Декор',
    ];
    const handleChangeTab = (e: React.MouseEvent<HTMLButtonElement>) => {
        const currentCategory = e.currentTarget.getAttribute('data-value');
        if (currentCategory) setActiveCategory(currentCategory);
    };

    const renderedProducts = () => {
        let renderResult;
        if (activeCategory === 'Всі товари') {
            renderResult = products.map((product, productIndex) => {
                return productIndex < 8 ? (
                    <SwiperSlide key={nextId('card-of-category')}>
                        <li className="popular-items__products-item">
                            <ProductCard product={product} />
                        </li>
                    </SwiperSlide>
                ) : null;
            });
        } else {
            renderResult = categories?.map((category) => {
                let temporary;
                if (category === activeCategory) {
                    const categoryItemsForRender: Product[] = [];
                    temporary = products.map((product, productIndex) => {
                        let result;
                        if (product.category === category) {
                            categoryItemsForRender.push(product);
                        }
                        if (productIndex === products.length - 1) {
                            const renderedItems = categoryItemsForRender.map(
                                (item) => {
                                    return (
                                        <SwiperSlide
                                            key={nextId('card-of-category')}
                                        >
                                            <li className="popular-items__products-item">
                                                <ProductCard product={item} />
                                            </li>
                                        </SwiperSlide>
                                    );
                                }
                            );
                            result =
                                renderedItems.length > 0 ? renderedItems : null;
                        }
                        return result;
                    });
                }
                return temporary;
            });
        }
        return renderResult;
    };

    const renderedCategories = () => {
        let renderResult: string[] = [];
        if (Object.keys(categories).length !== 0) {
            renderResult.push(
                'Всі товари',
                ...categories.map((category) => category)
            );
        } else {
            renderResult = [''];
        }
        return renderResult;
    };

    return (
        <section className="popular-items">
            <div className="container">
                <h2 className="popular-items__title">Популярні товари</h2>
                <nav className="popular-items__nav">
                    <ul className="popular-items__nav-list">
                        {renderedCategories().map((category) => {
                            return (
                                <li
                                    key={nextId('category-nav')}
                                    className="popular-items__nav-item"
                                >
                                    <button
                                        className={
                                            activeCategory === category
                                                ? 'popular-items__nav-btn active'
                                                : 'popular-items__nav-btn'
                                        }
                                        type="button"
                                        data-value={category}
                                        onClick={handleChangeTab}
                                    >
                                        {category}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            <div className="container container_pd-right-off">
                <ul
                    key={nextId('category-block')}
                    className="popular-items__products active"
                >
                    <Swiper
                        className="popular-items__slider"
                        modules={[Grid]}
                        grid={{
                            rows: 2,
                        }}
                        spaceBetween={0}
                        breakpoints={{
                            0: {
                                slidesPerView: 'auto',
                                grid: {
                                    rows: 1,
                                },
                            },
                            340: {
                                width: 320,
                                slidesPerView: 1,
                                grid: {
                                    rows: 1,
                                },
                            },
                            640: {
                                width: 640,
                                slidesPerView: 2,
                                grid: {
                                    rows: 1,
                                },
                            },
                            1024: {
                                width: 1024,
                                slidesPerView: 3,
                                grid: {
                                    rows: 1,
                                },
                            },
                            1352: {
                                width: 1344,
                                slidesPerView: 4,
                                grid: {
                                    rows: 2,
                                },
                            },
                        }}
                    >
                        {loading ? <Loader /> : renderedProducts()}
                    </Swiper>
                </ul>
            </div>
        </section>
    );
};

export default PopularItems;
