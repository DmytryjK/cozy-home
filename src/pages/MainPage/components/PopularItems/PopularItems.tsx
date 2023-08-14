import { useEffect, useState, FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper';
import nextId from 'react-id-generator';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
    fetchPopularItemsAllProducts,
    fetchPopularItemsAllСategories,
    fetchPopularItemsProductsByСategories,
} from '../../../../store/reducers/popularItemsSlice';
import ProductCard from '../../../../shared-components/ProductCard/ProductCard';
import renderServerData from '../../../../helpers/renderServerData';
import './PopularItems.scss';
import 'swiper/css';
import 'swiper/css/grid';
import { ProductCategory } from './types';

type ActiveCategory = {
    name: string;
    id: string;
};

const PopularItems: FC = () => {
    const [activeCategory, setActiveCategory] = useState<ActiveCategory>({
        name: 'Всі товари',
        id: '',
    });
    const dispatch = useAppDispatch();
    const { products, categories, loading, error } = useAppSelector(
        (state) => state.popularItems
    );
    const countOfProducts = '8';
    const status = '1'; // popular

    useEffect(() => {
        dispatch(fetchPopularItemsAllProducts());
        dispatch(fetchPopularItemsAllСategories());
    }, [dispatch]);

    useEffect(() => {
        let promise: any;
        if (activeCategory.id === '') {
            promise = dispatch(fetchPopularItemsAllProducts());
        } else {
            promise = dispatch(
                fetchPopularItemsProductsByСategories({
                    status,
                    categoryId: activeCategory.id,
                    countOfProducts,
                })
            );
        }

        return () => {
            promise.abort();
        };
    }, [activeCategory]);

    const handleChangeTab = (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        const currentCategory = e.currentTarget.getAttribute('data-value');
        if (!currentCategory) return;
        setActiveCategory({
            name: currentCategory,
            id,
        });
    };

    const renderedCategories = () => {
        const renderResult: ProductCategory[] = [
            { id: '', name: 'Всі товари' },
        ];
        if (Object.keys(categories).length !== 0) {
            renderResult.push(...categories);
        }
        return renderResult;
    };

    const items = () => {
        const content = [];
        for (let i = 0; i < Math.min(products.length, 8); i += 1) {
            content.push(
                <SwiperSlide key={nextId('card-all-categories')}>
                    <div className="popular-items__products-item">
                        <ProductCard product={products[i]} />
                    </div>
                </SwiperSlide>
            );
        }
        return content;
    };

    return (
        <section className="popular-items">
            <div className="container">
                <h2 className="popular-items__title">Популярні товари</h2>
                <nav className="popular-items__nav">
                    <ul className="popular-items__nav-list">
                        {renderedCategories().map((category) => {
                            const { name, id } = category;
                            return (
                                <li
                                    key={nextId('category-nav')}
                                    className="popular-items__nav-item"
                                >
                                    <button
                                        className={
                                            activeCategory.name === name
                                                ? 'popular-items__nav-btn active'
                                                : 'popular-items__nav-btn'
                                        }
                                        type="button"
                                        data-value={name}
                                        onClick={(e) => handleChangeTab(e, id)}
                                    >
                                        {name}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            <div className="container container_pd-right-off">
                <div
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
                                spaceBetween: 32,
                                grid: {
                                    rows: 1,
                                },
                            },
                            340: {
                                slidesPerView: 1.12,
                                spaceBetween: 16,
                                grid: {
                                    rows: 1,
                                },
                            },
                            400: {
                                slidesPerView: 1.2,
                                spaceBetween: 24,
                                grid: {
                                    rows: 1,
                                },
                            },
                            424: {
                                slidesPerView: 1.3,
                                spaceBetween: 24,
                                grid: {
                                    rows: 1,
                                },
                            },
                            546: {
                                slidesPerView: 1.7,
                                spaceBetween: 24,
                                grid: {
                                    rows: 1,
                                },
                            },
                            700: {
                                slidesPerView: 2.2,
                                spaceBetween: 24,
                                grid: {
                                    rows: 1,
                                },
                            },
                            810: {
                                slidesPerView: 2.5,
                                spaceBetween: 24,
                                grid: {
                                    rows: 1,
                                },
                            },
                            1100: {
                                slidesPerView: 3.4,
                                spaceBetween: 32,
                                grid: {
                                    rows: 1,
                                },
                            },
                            1294: {
                                slidesPerView: 4,
                                spaceBetween: 32,
                                grid: {
                                    rows: 2,
                                },
                            },
                        }}
                    >
                        {renderServerData({
                            error,
                            loading,
                            content: items,
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default PopularItems;
