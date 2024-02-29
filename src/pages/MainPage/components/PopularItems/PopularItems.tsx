import { useEffect, useState, FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper';
import nextId from 'react-id-generator';
import { JsxElement } from 'typescript';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
    fetchPopularItemsAllProducts,
    fetchPopularItemsAllСategories,
    fetchPopularItemsProductsByСategories,
} from '../../../../store/reducers/popularItemsSlice';
import ProductCard from '../../../../shared-components/ProductCard/ProductCard';
import renderServerData from '../../../../helpers/renderServerData';
import NavigationListOfCategories from '../../../../shared-components/NavigationListOfCategories/NavigationListOfCategories';
import Skeleton from '../../../../shared-components/ProductCard/Skeleton/Skeleton';
import { NavigationCategory } from '../../../../types/types';
import './PopularItems.scss';
import 'swiper/css';
import 'swiper/css/grid';

const PopularItems: FC = () => {
    const skeletonKeys = [...Array(8)].map((_, index) =>
        nextId(`skeleton-card-popular`)
    );
    const [activeCategory, setActiveCategory] = useState<NavigationCategory>({
        name: 'Всі товари',
        id: '',
    });
    const [isCategoryClicked, setIsCategoryClicked] = useState(false);
    const dispatch = useAppDispatch();
    const { products, categories, loading, error } = useAppSelector(
        (state) => state.popularItems
    );
    const countOfProducts = '8';
    const status = '1'; // popular

    useEffect(() => {
        if (products.length === 0 && categories.length === 0) {
            dispatch(fetchPopularItemsAllСategories());
        }
    }, [dispatch]);

    useEffect(() => {
        if (activeCategory.id === '' && products.length === 0) {
            dispatch(fetchPopularItemsAllProducts());
        } else if (isCategoryClicked) {
            if (activeCategory.id) {
                dispatch(
                    fetchPopularItemsProductsByСategories({
                        status,
                        categoryId: activeCategory.id,
                        countOfProducts,
                    })
                );
            } else {
                dispatch(fetchPopularItemsAllProducts());
            }
            setIsCategoryClicked(false);
        }
    }, [activeCategory]);

    const items = () => {
        const content = [];
        for (let i = 0; i < Math.min(products.length, 8); i += 1) {
            content.push(
                <SwiperSlide
                    key={`popular-items-slider-${products[i].skuCode}`}
                >
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
                <NavigationListOfCategories
                    categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    setIsCategoryClicked={setIsCategoryClicked}
                />
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
                            customLoader: skeletonKeys.map((key) => {
                                return (
                                    <SwiperSlide key={key}>
                                        <Skeleton />
                                    </SwiperSlide>
                                );
                            }),
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default PopularItems;
