import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper';
import nextId from 'react-id-generator';
import ProductCard from '../ProductCard/ProductCard';
import './PopularItems.scss';
import 'swiper/css';
import 'swiper/css/grid';

const PopularItems = () => {
    const [activeCategory, setActiveCategory] = useState<string>('Всі товари');
    interface Product {
        prodName: string;
        category_id: number;
    }
    interface Categories {
        id: number;
        name: string;
    }
    const products: Product[] = [
        { prodName: 'test', category_id: 1 },
        { prodName: 'test', category_id: 1 },
        { prodName: 'test', category_id: 2 },
        { prodName: 'test', category_id: 3 },
        { prodName: 'test', category_id: 4 },
        { prodName: 'test', category_id: 5 },
        { prodName: 'test', category_id: 6 },
        { prodName: 'test', category_id: 1 },
        { prodName: 'test', category_id: 3 },
        { prodName: 'test', category_id: 2 },
        { prodName: 'test', category_id: 5 },
    ];
    const categories: Categories[] = [
        { id: 1, name: 'Дивани' },
        { id: 2, name: 'Крісла' },
        { id: 3, name: 'Столи' },
        { id: 4, name: 'Шафи' },
        { id: 5, name: 'Комоди' },
        { id: 6, name: 'Декор' },
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
                            <ProductCard />
                        </li>
                    </SwiperSlide>
                ) : null;
            });
        } else {
            renderResult = categories?.map((category) => {
                let temporary;
                if (category.name === activeCategory) {
                    const categoryItemsForRender: Product[] = [];
                    temporary = products.map((product, productIndex) => {
                        let result;
                        if (product.category_id === category.id) {
                            categoryItemsForRender.push(product);
                        }
                        if (productIndex === products.length - 1) {
                            const renderedItems = categoryItemsForRender.map(
                                () => {
                                    return (
                                        <SwiperSlide
                                            key={nextId('card-of-category')}
                                        >
                                            <li className="popular-items__products-item">
                                                <ProductCard />
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
                ...categories.map((category) => category.name)
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
                        {renderedProducts()}
                    </Swiper>
                </ul>
            </div>
        </section>
    );
};

export default PopularItems;
